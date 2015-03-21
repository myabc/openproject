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

RSpec.shared_examples_for 'labelled' do
  it { is_expected.to have_selector 'label.form--label' }
end

RSpec.shared_examples_for 'not labelled' do
  it { is_expected.not_to have_selector 'label.form--label' }
end

RSpec.shared_examples_for 'labelled by default' do
  context 'by default' do
    it_behaves_like 'labelled'
  end

  context 'with no_label option' do
    let(:options) { { no_label: true, label: false } }

    it_behaves_like 'not labelled'
  end
end

RSpec.shared_examples_for 'wrapped in container' do |container = 'field-container'|
  it { is_expected.to have_selector "span.form--#{container}", count: 1 }
end

RSpec.shared_examples_for 'not wrapped in container' do |container = 'field-container'|
  it { is_expected.not_to have_selector "span.form--#{container}" }
end

RSpec.shared_examples_for 'wrapped in field-container by default' do
  context 'by default' do
    it_behaves_like 'wrapped in container'
  end

  context 'with no_label option' do
    let(:options) { { no_label: true, label: false } }

    it_behaves_like 'not wrapped in container'
  end
end
