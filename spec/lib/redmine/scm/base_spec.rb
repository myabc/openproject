#-- encoding: UTF-8
#-- copyright
# OpenProject is a project management system.
# Copyright (C) 2012-2014 the OpenProject Foundation (OPF)
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

RSpec.describe Redmine::Scm::Base do
  describe '.configured' do
    subject { described_class.configured }

    let(:test_scm_class) do
      Class.new
    end

    before do
      Repository.const_set('TestScm', test_scm_class)
      Redmine::Scm::Base.add 'TestScm'
    end

    after do
      Repository.send(:remove_const, :TestScm)
      Redmine::Scm::Base.delete 'TestScm'
    end

    context 'scm is configured' do
      before do
        allow(test_scm_class).to receive(:configured?).and_return(true)
      end

      it 'is included' do
        is_expected.to include('TestScm')
      end
    end

    context 'scm is not configured' do
      before do
        allow(test_scm_class).to receive(:configured?).and_return(false)
      end

      it 'is included' do
        is_expected.to_not include('TestScm')
      end
    end
  end
end
