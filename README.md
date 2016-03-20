# Motif

Motif is a service to create and serve responsive social images, fit to drop into any `og:image` or
`twitter:image` meta tag.

Motif uses [imgix](https://www.imgix.com) for the image compositing, and PhantomJS for discovering
information about the URL entered.

You can see a version of Motif running at [https://motif.imgix.com](https://motif.imgix.com).

It is built with Rails 5 and [vue.js](http://vuejs.org/).

## Running Locally

You'll need:

* Node
* Ruby 2.3.0
  * rvm users can run `rvm install 2.3.0`
* Bower
  * `npm install -g bower`
* [Heroku Toolbelt](https://toolbelt.heroku.com)
* `libpq-dev`
  * on RHEL systems: `yum install postgresql-devel`
  * for Mac: `brew install postgresql`
  * for Mac in case postgres installed via macports than `gem install pg -- --with-pg-config=/opt/local/lib/postgresql[version number]/bin/pg_config`
* phantomjs
  * `brew install phantomjs`
  * or `npm install -g phantomjs`

Then, just run:

* `bundle install`
* `bin/rails db:setup`
* `bower install`
* `heroku local`

## Deploying to Heroku

You will need to add 2 custom buildpacks if you would like to deploy to Heroku:
- https://github.com/kellysutton/heroku-buildpack-phantomjs
- https://github.com/qnyp/heroku-buildpack-ruby-bower.git

To do so with a new app:

* `heroku create -a my-motif --buildpack https://github.com/kellysutton/heroku-buildpack-phantomjs
* `heroku buildpacks:add https://github.com/qnyp/heroku-buildpack-ruby-bower.git`

From there, it's just a simple:
* `git push heroku master`
