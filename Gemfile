source 'https://rubygems.org'


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '5.1.6'

# Use SCSS for stylesheets

gem 'sass-rails'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby
gem 'yaml_db'

# Use jquery as the JavaScript library
gem 'jquery-rails'
# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc
# Use fastimage and you will know size of image
gem 'fastimage', '1.8.1'

gem 'colorize'
gem 'faker'

# gem for run casein on digitalocean
gem 'therubyracer'
gem 'puma'
gem 'draper'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

group :production do
  gem 'pg'
  gem 'rails_12factor', '0.0.2'
end

group :development do
  gem 'capistrano', '3.4.1'
  gem 'capistrano-bundler', '>= 1.1.2'
  gem 'capistrano-rails', '>= 1.1.1'
  gem 'capistrano-rails-collection'

  gem 'capistrano-rbenv'
  gem 'capistrano-passenger'
  gem 'pg'
  gem 'listen'
end

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'rspec-rails'
  gem 'factory_bot_rails'
  gem 'pry'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
end
