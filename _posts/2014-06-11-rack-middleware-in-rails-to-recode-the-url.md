---
layout: post
title: "Rack middleware in Rails to recode the URL"
description: "Rack middleware in Rails to recode the URL"
category: 'Rails'
tags: [rails, ruby]
---

I have created the [Qräx online shop](https://www.qraex.de) for a good friend. During the last days, a lot of exceptions were thrown. As the application is quite small I do not use a bug tracker but send exception emails to my mailbox. Keep it simple.

The content of the exception email is looking like this:

    Fehler in Qraex production:

    PG::InvalidTextRepresentation: ERROR:  invalid input syntax for integer: ""
    LINE 1: ...artridge_id FROM "printer_cartridges"  WHERE (printer_id='')
                                                                        ^
    : SELECT cartridge_id FROM "printer_cartridges"  WHERE (printer_id='')

    * Aktion:   inkshop#show_qraex_products
    * Client:   37.16.72.124
    * Session:
    * Request:  /tintenshop/tintenstrahl_drucker_produkte/hp/PSC/HP-56/PSC+2510?page=2
    * Knoten:   nms02
    * Prozess:  23810

I wondered where the URL is coming from because the *+* sign in the URL should be a *%20* what is a blank.

The Client is nearly always the same. So I checked the webserver log files and recognized, that it is a bot from [http://archivethe.net](http://archivethe.net). The log entries are looking like this:

    37.16.72.124 - - [08/Jun/2014:08:42:37 +0200] "GET /tintenshop/tintenstrahl_drucker/hp/OfficeJet+D,+E,+G,+H HTTP/1.1" 500 5493 "-" "Mozilla/5.0 (compatible; memorybot/1.20.71 +http://archivethe.net/en/index.php/about/internet_memory1 on behalf of DNB)" "-"

What to do?
-----------

I was thinking about where the bot found the URL's and I understood, that they have been received from the [sitemap.xml](https://www.qraex.de/sitemap.xml). A short check showed, that the sitemap has entries like this:

    <url>
        <loc>
            https://www.qraex.de/tintenshop/anfrage_stellen/drucker/Hewlett+Packard,+OfficeJet+7100
        </loc>
        <priority>0.0004</priority>
    </url>

Ok - my fault. I guess I made a mistake when generating the sitemap. That means blocking the IP from the bot would be the wrong path.

Fixing the problem
------------------

The Rails application is using the part from the URL to make a lookup to the database. But the *+* sign in there is completely wrong. As mentioned before it should be *%20*. I decided to find a way to recode the URL for each GET request.

Doing this in the webserver is possible but not too sexy. The other idea would be to use a gem for rewriting the URL. Nah, to heavy. The simplest possible solution is to write a very small Rack middleware and put it into the Rails Middleware stack.

The code
--------

I will not dig deeper into [Rack](http://rack.github.io/) and the [Rails middleware](http://guides.rubyonrails.org/rails_on_rack.html) stack. What you have to know is, that the middleware has to be put together in a special order. If my middleware would be included too early, the application would crash.

I found out that a good place is after *Rack::ETag*. I called the middleware *RecodeUrl*. When checking the existing middleware, you will see this list:

    use ActionDispatch::Static
    use Rack::Lock
    use #<ActiveSupport::Cache::Strategy::LocalCache::Middleware:0x0000010ab81ae0>
    use Rack::Runtime
    use Rack::MethodOverride
    use ActionDispatch::RequestId
    use Rails::Rack::Logger
    use ActionDispatch::ShowExceptions
    use ActionDispatch::DebugExceptions
    use BetterErrors::Middleware
    use ActionDispatch::RemoteIp
    use ActionDispatch::Reloader
    use ActionDispatch::Callbacks
    use ActiveRecord::ConnectionAdapters::ConnectionManagement
    use ActiveRecord::QueryCache
    use ActionDispatch::Cookies
    use ActionDispatch::Session::CacheStore
    use ActionDispatch::Flash
    use ActionDispatch::ParamsParser
    use ActionDispatch::Head
    use Rack::ConditionalGet
    use Rack::ETag
    use RecodeUrl
    use ActionDispatch::BestStandardsSupport
    use Warden::Manager
    use Bullet::Rack
    use MetaRequest::Middlewares::MetaRequestHandler
    use MetaRequest::Middlewares::Headers
    use MetaRequest::Middlewares::AppRequestHandler
    run Qraex::Application.routes

The code for the middleware is a simple Ruby class and is placed in lib/recode_url.rb:

    class RecodeUrl
      def initialize(app, options = {})
        @app = app
      end

      def call(env)
        env['PATH_INFO'] = env['PATH_INFO'].gsub('+','%20') if env['REQUEST_METHOD'] == 'GET'
        @app.call(env)
      end
    end

The *initialize* and *call* methods are Rack standard and have to be there (see the documentation). Every attribute is located in the Hash *env*. So waht I do with the code above is simply changing the *+* sign to *%20* in *env['PATH_INFO']* if it is a *GET* request. Nothing more.

To activate the middleware, an entry in *config/application.rb* is neccessary:

    module Qraex
      class Application < Rails::Application
        [... other config settings ommited]
        require 'recode_url'
        config.middleware.insert_after Rack::ETag, RecodeUrl
      end
    end

When the server is started and the URL

    http://localhost:3000/tintenshop/tintenstrahl_drucker/hp/Business+InkJet

is called, it will be recoded to

    http://localhost:3000/tintenshop/tintenstrahl_drucker/hp/Business%20InkJet

internally and everything is fine.

Conclusion
----------

Rack middleware is an extremely simple but powerfull tool to get special jobs done. Every Rails developer should understand, that Rails is a Rack application. And furthermore most of the Ruby web-frameworks like [sinatra](http://www.sinatrarb.com/) and [padrino](http://www.padrinorb.com/) are Rack applications too. The great advantage is the fact, that it is possible to hook into the HTTP requests before the Rails stack is gone through.








