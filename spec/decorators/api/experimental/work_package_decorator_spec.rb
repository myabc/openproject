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

require File.expand_path('../../../../spec_helper', __FILE__)

RSpec.describe API::Experimental::WorkPackageDecorator, type: :model do
  let(:wp1) { FactoryGirl.build_stubbed(:work_package) }
  let(:wp2) { FactoryGirl.build_stubbed(:work_package) }
  let(:dwp1) { described_class.new(wp1) }
  let(:custom_field) { FactoryGirl.build_stubbed(:text_issue_custom_field) }
  let(:custom_value) do
    FactoryGirl.build_stubbed(:custom_value,
                              custom_field: custom_field)
  end

  describe '#decorate' do

    it 'returns an array' do
      packages = [wp1, wp2]

      expect(described_class.decorate(packages)).to eql packages
    end

    it 'adds methods to the object' do
      decorated = described_class.decorate([wp1]).first

      expect(decorated).to respond_to :custom_values_display_data
    end
  end

  describe '#custom_values_display_data' do
    it 'returns a hash with a subset of information about the custom value' do
      allow(dwp1).to receive(:custom_values).and_return [custom_value]

      returned = dwp1.custom_values_display_data(custom_field.id)

      expected = [{
        custom_field_id: custom_field.id,
        field_format: custom_field.field_format,
        value: nil
      }]

      expect(returned).to eql (expected)
    end

    it 'returns a hash with a subset of information about the custom value' do
      field = FactoryGirl.build_stubbed(:user_issue_custom_field)
      custom_value.custom_field = field
      user = FactoryGirl.build_stubbed(:user)
      custom_value.value = user.id.to_s
      allow(User).to receive(:find_by_id).with(user.id).and_return(user)

      allow(dwp1).to receive(:custom_values).and_return [custom_value]

      returned = dwp1.custom_values_display_data(field.id)

      expected = [{
        custom_field_id: field.id,
        field_format: field.field_format,
        value: user.as_json(methods: :name)
      }]

      expect(returned).to eql (expected)
    end
  end
end
