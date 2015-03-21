require 'spec_helper'

RSpec.describe 'projects/settings', type: :view do
  let(:project) { FactoryGirl.create(:project) }

  describe 'project copy permission' do
    before do
      assign(:project, project)
      allow(view).to receive(:render_tabs).and_return('')
    end

    context 'when project copy is allowed' do
      before do
        allow(project).to receive(:copy_allowed?).and_return(true)
        render
      end

      it 'the copy link should be visible' do
        expect(rendered).to have_selector 'a.copy'
      end
    end

    context 'when project copy is not allowed' do
      before do
        allow(project).to receive(:copy_allowed?).and_return(false)
        render
      end

      it 'the copy link should not be visible' do
        expect(rendered).not_to have_selector 'a.copy'
      end
    end
  end
end
