#-- encoding: UTF-8
#-- copyright
# OpenProject is a project management system.
# Copyright (C) 2012-2015 the OpenProject Foundation (OPF)
#
# This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License version 3.
#
# OpenProject is a fork of ChiliProject, which is a fork of Redmine. The copyright follows:
# Copyright (C) 2006-2013 Jean-Philippe Lang
# Copyright (C) 2010-2013 the ChiliProject Team
#
# This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License
# as published by the Free Software Foundation; either version 2
# of the License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
#
# See doc/COPYRIGHT.rdoc for more details.
#++

require 'spec_helper'

##
# Tests that mail notifications are sent in successful cases,
# that none are sent but the job finishes nontheless in cases were necessary
# records are missing (e.g. the user to be notified), and that jobs with any other
# sort of error fail as expected in order to be rescheduled.
RSpec.describe 'mail notification jobs', type: :model do
  ##
  # Shared example expecting #mail_subject and #job to be defined where
  # the former is looked for in the sent email's subject and the latter is
  # the delayed job to be performed.
  shared_examples 'a mail notification job' do
    let!(:user) { FactoryGirl.create :user } # user to be notified

    context 'with all records found' do
      let(:mail_subject) { 'all records found!' }

      before do
        job.perform
      end

      it 'sends an email' do
        mail = ActionMailer::Base.deliveries.detect { |m| m.subject.include? mail_subject }

        expect(mail).to be_present
      end
    end

    shared_examples 'job cannot find record' do
      it 'does not send an email' do
        job.perform
        mail = ActionMailer::Base.deliveries.detect { |m| m.subject.include? mail_subject }

        expect(mail).not_to be_present
      end

      it 'deos not raise an error but fails silently' do
        expect{job.perform}.not_to raise_error
      end
    end

    context 'with user not found' do
      let(:mail_subject) { 'no user found :(' }

      before do
        user.destroy
      end

      it_behaves_like 'job cannot find record'
    end

    context 'with unexpected error' do
      let(:mail_subject) { "don't care" }

      before do
        expect_any_instance_of(Mail::Message).to receive(:deliver).and_raise(SocketError)
      end

      it 'raises said error' do
        expect{job.perform}.to raise_error(SocketError)
      end
    end
  end

  describe DeliverWorkPackageCreatedJob do
    let(:work_package) { FactoryGirl.create :work_package, subject: mail_subject }
    let(:job)          { DeliverWorkPackageCreatedJob.new user.id, work_package.id }

    it_behaves_like 'a mail notification job' do
      context 'with work package not found' do
        let(:mail_subject) { 'no work package found! :o' }

        before do
          work_package.destroy
        end

        it_behaves_like 'job cannot find record'
      end
    end
  end

  describe DeliverWorkPackageUpdatedJob do
    let(:work_package) do
      FactoryGirl.create(:work_package).tap do |wp|
        wp.subject = mail_subject
        wp.save # create journal
      end
    end

    let(:current_user) { FactoryGirl.create :user }
    let(:journal)      { work_package.journals.last }
    let(:job)          { DeliverWorkPackageUpdatedJob.new user.id, journal.id, current_user.id }

    it_behaves_like 'a mail notification job' do
      context 'with journal not found' do
        let(:mail_subject) { 'no journal found! :/' }

        before do
          journal.destroy
        end

        it_behaves_like 'job cannot find record'
      end

      context 'with current user not found' do
        let(:mail_subject) { 'current user not found! :x' }

        before do
          current_user.destroy
        end

        it_behaves_like 'job cannot find record'
      end
    end
  end
end
