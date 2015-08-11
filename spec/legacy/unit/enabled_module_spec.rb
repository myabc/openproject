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
require 'legacy_spec_helper'

describe EnabledModule do
  it 'should enabling_wiki_should_create_a_wiki' do
    CustomField.delete_all
    FactoryGirl.create(:type_standard)
    Setting.default_projects_modules -= %w(wiki)

    project = Project.create!(name: 'Project with wiki', identifier: 'wikiproject')
    assert_nil project.wiki
    project.enabled_module_names = ['wiki']
    wiki = FactoryGirl.create :wiki, project: project
    project.reload
    refute_nil project.wiki
    assert_equal 'Wiki', project.wiki.start_page
  end

  it 'should reenabling_wiki_should_not_create_another_wiki' do
    project = FactoryGirl.create :project
    wiki = FactoryGirl.create :wiki, project: project
    project.reload
    refute_nil project.wiki
    project.enabled_module_names = []
    project.reload
    assert_no_difference 'Wiki.count' do
      project.enabled_module_names = ['wiki']
    end
    refute_nil project.wiki
  end
end
