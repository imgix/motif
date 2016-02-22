source 'https://rubygems.org'
ruby '2.3.0'

gem 'rails', '>= 5.0.0.beta2', '< 5.1'

gem 'bower'
gem 'cocaine'
gem 'dotenv-rails'
gem 'ejs'
gem 'imgix'
gem 'pg', '~> 0.18'
gem 'puma'
gem 'sass-rails', '~> 5.0'
gem 'sentry-raven'
gem 'skylight'
gem 'uglifier', '>= 1.3.0'
gem 'validate_url'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 3.0'
  gem 'spring'
end

group :production do
  gem 'heroku-deflater'
  gem 'rails_12factor'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
