source 'https://rubygems.org'
ruby '2.3.0'

gem 'rails', '>= 5.0.0.beta2', '< 5.1'

gem 'bower-rails', '~> 0.10.0'
gem 'cocaine'
gem 'color'
gem 'dotenv-rails'
gem 'ejs'
gem 'imgix'
gem 'nokogiri'
gem 'pg', '~> 0.18'
gem 'puma'
gem 'rest-client'
gem 'sass-rails', '~> 5.0'
gem 'sentry-raven'
gem 'sidekiq'
gem 'sidekiq-failures'
gem 'sinatra', require: nil, github: 'sinatra/sinatra' # For sidekiq UI
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
