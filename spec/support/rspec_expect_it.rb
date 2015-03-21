# The following aliases are defined so that we can write
# `expect_it { to match /rgx/ }` instead of
# `it { should match /rgx/ }` to be more consistent with the new expect syntax.

RSpec.configure do |c|
  c.alias_example_to :expect_it

  # rspec-rails 3 will no longer automatically infer an example group's spec type
  # from the file location. You can explicitly opt-in to the feature using this
  # config option.
  # To explicitly tag specs without using automatic inference, set the `:type`
  # metadata manually:
  #
  #     describe ThingsController, :type => :controller do
  #       # Equivalent to being in spec/controllers
  #     end
  c.infer_spec_type_from_file_location!

  # Setting this config option `false` removes rspec-core's monkey patching of the
  # top level methods like `describe`, `shared_examples_for` and `shared_context`
  # on `main` and `Module`. The methods are always available through the `RSpec`
  # module like `RSpec.describe` regardless of this setting.
  # For backwards compatibility this defaults to `true`.
  #
  # https://relishapp.com/rspec/rspec-core/v/3-0/docs/configuration/global-namespace-dsl
  c.expose_dsl_globally = false
end

RSpec::Core::MemoizedHelpers.module_eval do
  alias to should
  alias to_not should_not
end
