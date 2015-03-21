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
require 'rack/test'

RSpec.describe 'API v3 Attachment resource', type: :request do
  include Rack::Test::Methods
  include API::V3::Utilities::PathHelper

  let(:current_user) { FactoryGirl.create(:user) }
  let(:project) { FactoryGirl.create(:project, is_public: false) }
  let(:work_package) { FactoryGirl.create(:work_package, author: current_user, project: project) }
  let(:role) { FactoryGirl.create(:role, permissions: [:view_work_packages]) }
  let(:attachment) { FactoryGirl.create(:attachment, container: work_package) }

  describe '#get' do
    subject(:response) { last_response }

    context 'logged in user' do
      let(:get_path) { api_v3_paths.attachment attachment.id }
      before do
        allow(User).to receive(:current).and_return current_user
        member = FactoryGirl.build(:member, user: current_user, project: project)
        member.role_ids = [role.id]
        member.save!
        get get_path
      end

      it 'should respond with 200' do
        expect(subject.status).to eq(200)
      end

      it 'should respond with correct attachment' do
        expect(subject.body).to be_json_eql(attachment.filename.to_json).at_path('fileName')
      end

      context 'requesting nonexistent attachment' do
        let(:get_path) { api_v3_paths.attachment 9999 }

        it_behaves_like 'not found' do
          let(:id) { 9999 }
          let(:type) { 'Attachment' }
        end
      end

      context 'requesting attachments without sufficient permissions' do
        let(:another_project) { FactoryGirl.create(:project, is_public: false) }
        let(:another_work_package) { FactoryGirl.create(:work_package, project: another_project) }
        let(:another_attachment) { FactoryGirl.create(:attachment, container: another_work_package) }
        let(:get_path) { api_v3_paths.attachment another_attachment.id }

        it_behaves_like 'unauthorized access'
      end
    end

    it_behaves_like 'handling anonymous user', 'Attachment', '/api/v3/attachments/%s' do
      let(:project) { FactoryGirl.create(:project, is_public: true) }
      let(:id) { attachment.id }
    end
  end
end
