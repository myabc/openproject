require 'spec_helper'
require 'rack/test'

RSpec.describe 'API v3 Render resource' do
  include Rack::Test::Methods
  include API::V3::Utilities::PathHelper

  let(:project) { FactoryGirl.create(:project, is_public: false) }
  let(:work_package) { FactoryGirl.create(:work_package, project: project) }
  let(:user) { FactoryGirl.create(:user, member_in_project: project) }
  let(:content_type) { 'text/plain, charset=UTF-8' }
  let(:path) { api_v3_paths.render_markup format: format, link: context }
  let(:format) { nil }
  let(:context) { nil }

  before(:each) do
    allow(User).to receive(:current).and_return(user)
    post path, params, 'CONTENT_TYPE' => content_type
  end

  shared_examples_for 'valid response' do
    it { expect(subject.status).to eq(200) }

    it { expect(subject.content_type).to eq('text/html') }

    it { expect(subject.body).to eq(text) }
  end

  describe 'textile' do
    let(:format) { 'textile' }

    describe '#post' do
      subject(:response) { last_response }

      describe 'response' do
        describe 'valid' do
          context 'w/o context' do
            let(:params) do
              'Hello World! This *is* textile with a ' +
                '"link":http://community.openproject.org and ümläutß.'
            end
            let(:text) do
              '<p>Hello World! This <strong>is</strong> textile with a ' +
                '<a href="http://community.openproject.org" class="external">link</a> ' +
                'and ümläutß.</p>'
            end

            it_behaves_like 'valid response'
          end

          context 'with context' do
            let(:context) { api_v3_paths.work_package work_package.id }
            let(:params) { "Hello World! Have a look at ##{work_package.id}" }
            let(:id) { work_package.id }
            let(:href) { "/work_packages/#{id}" }
            let(:title) { "#{work_package.subject} (#{work_package.status})" }
            let(:text) {
              "<p>Hello World! Have a look at <a href=\"#{href}\" "\
              "class=\"issue work_package status-1 priority-1\" "\
              "title=\"#{title}\">##{id}</a></p>"
            }

            it_behaves_like 'valid response'
          end
        end

        describe 'invalid' do
          context 'content type' do
            let(:content_type) { 'application/json' }
            let(:params) {
              { 'text' => "Hello World! Have a look at ##{work_package.id}" }.to_json
            }

            it_behaves_like 'unsupported content type',
                            I18n.t('api_v3.errors.invalid_content_type',
                                   content_type: 'text/plain',
                                   actual: 'application/json')
          end

          context 'with context' do
            let(:params) { '' }

            describe 'work package does not exist' do
              let(:context) { api_v3_paths.work_package -1 }

              it_behaves_like 'invalid render context',
                              I18n.t('api_v3.errors.render.context_object_not_found')
            end

            describe 'work package not visible' do
              let(:invisible_work_package) { FactoryGirl.create(:work_package) }
              let(:context) { api_v3_paths.work_package invisible_work_package.id }

              it_behaves_like 'invalid render context',
                              I18n.t('api_v3.errors.render.context_object_not_found')
            end

            describe 'context does not exist' do
              let(:context) { api_v3_paths.root }

              it_behaves_like 'invalid render context',
                              I18n.t('api_v3.errors.render.context_not_found')
            end

            describe 'unsupported context resource found' do
              let(:context) { api_v3_paths.activity 2 }

              it_behaves_like 'invalid render context', 'Unsupported context found.'
            end

            describe 'unsupported context version found' do
              let(:context) { '/api/v4/work_packages/2' }

              it_behaves_like 'invalid render context', 'Unsupported context found.'
            end
          end
        end
      end
    end
  end

  describe 'plain' do
    describe '#post' do
      let(:format) { 'plain' }

      subject(:response) { last_response }

      describe 'response' do
        describe 'valid' do
          let(:params) { "Hello *World*! Have a look at #1\n\nwith two lines." }
          let(:text) { "<p>Hello *World*! Have a look at #1</p>\n\n<p>with two lines.</p>" }

          it_behaves_like 'valid response'
        end
      end
    end
  end
end
