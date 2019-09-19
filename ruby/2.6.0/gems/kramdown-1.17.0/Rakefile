# -*- ruby -*-

# load all optional developer libraries
begin
  require 'rubygems'
  require 'rubygems/package_task'
rescue LoadError
end

begin
  require 'webgen/page'
rescue LoadError
end

begin
  gem 'rdoc' if RUBY_VERSION >= '1.9'
  require 'rdoc/task'
  require 'rdoc/rdoc'

  class RDoc::RDoc

    alias :old_parse_files :parse_files

    def parse_files(options)
      file_info = old_parse_files(options)
      require 'kramdown/options'

      # Add options documentation to Kramdown::Options module
      opt_module = @store.all_classes_and_modules.find {|m| m.full_name == 'Kramdown::Options'}
      opt_defs = Kramdown::Options.definitions.sort.collect do |n, definition|
        desc = definition.desc.split(/\n/).map {|l| "    #{l}"}
        desc[-2] = []
        desc = desc.join("\n")
        "[<tt>#{n}</tt> (type: #{definition.type}, default: #{definition.default.inspect})]\n#{desc}\n\n"
      end
      opt_module.comment.text += "\n== Available Options\n\n" << opt_defs.join("\n\n")

      file_info
    end

  end

rescue LoadError
end

begin
  require 'rcov/rcovtask'
rescue LoadError
end

require 'fileutils'
require 'rake/clean'
require 'rake/testtask'
require 'rake/packagetask'
require 'erb'

$:.unshift('lib')
require 'kramdown'

# End user tasks ################################################################

task :default => :test

desc "Install using setup.rb"
task :install do
  ruby "setup.rb config"
  ruby "setup.rb setup"
  ruby "setup.rb install"
end

task :clobber do
  ruby "setup.rb clean"
end

if defined?(Webgen)
  desc "Generate the HTML documentation"
  task :htmldoc do
    ruby "-Ilib -S webgen"
  end
  CLOBBER << "htmldoc/"
  CLOBBER << "webgen-tmp"
end

if defined? RDoc::Task
  rd = RDoc::Task.new do |rdoc|
    rdoc.rdoc_dir = 'htmldoc/rdoc'
    rdoc.title = 'kramdown'
    rdoc.main = 'lib/kramdown/document.rb'
    rdoc.rdoc_files.include('lib')
  end
end

if defined?(Webgen) && defined?(RDoc::Task)
  desc "Build the whole user documentation"
  task :doc => [:rdoc, 'htmldoc']
end

tt = Rake::TestTask.new do |test|
  test.warning = false
  test.libs << 'test'
  test.test_files = FileList['test/test_*.rb']
end

# Release tasks and development tasks ############################################

namespace :dev do

  SUMMARY = 'kramdown is a fast, pure-Ruby Markdown-superset converter.'
  DESCRIPTION = <<EOF
kramdown is yet-another-markdown-parser but fast, pure Ruby,
using a strict syntax definition and supporting several common extensions.
EOF

  begin
    REL_PAGE = Webgen::Page.from_data(File.read('doc/news/release_' + Kramdown::VERSION.split('.').join('_') + '.page'))
  rescue
    puts 'NO RELEASE NOTES/CHANGES FILE'
  end

  PKG_FILES = FileList.new([
                            'Rakefile',
                            'setup.rb',
                            'COPYING', 'README.md', 'AUTHORS',
                            'VERSION', 'CONTRIBUTERS',
                            'bin/*',
                            'benchmark/*',
                            'lib/**/*.rb',
                            'man/man1/kramdown.1',
                            'data/**/*',
                            'doc/**',
                            'test/**/*'
                           ])

  CLOBBER << "VERSION"
  file 'VERSION' do
    puts "Generating VERSION file"
    File.open('VERSION', 'w+') {|file| file.write(Kramdown::VERSION + "\n")}
  end

  CLOBBER << 'CONTRIBUTERS'
  file 'CONTRIBUTERS' do
    puts "Generating CONTRIBUTERS file"
    `echo "  Count Name" > CONTRIBUTERS`
    `echo "======= ====" >> CONTRIBUTERS`
    `git log | grep ^Author: | sed 's/^Author: //' | sort | uniq -c | sort -nr >> CONTRIBUTERS`
  end

  CLOBBER << "man/man1/kramdown.1"
  file 'man/man1/kramdown.1' => ['man/man1/kramdown.1.erb'] do
    puts "Generating kramdown man page"
    File.open('man/man1/kramdown.1', 'w+') do |file|
      data = ERB.new(File.read('man/man1/kramdown.1.erb')).result(binding)
      file.write(Kramdown::Document.new(data).to_man)
    end
  end

  Rake::PackageTask.new('kramdown', Kramdown::VERSION) do |pkg|
    pkg.need_tar = true
    pkg.need_zip = true
    pkg.package_files = PKG_FILES
  end

  if defined? Gem
    spec = Gem::Specification.new do |s|

      #### Basic information
      s.name = 'kramdown'
      s.version = Kramdown::VERSION
      s.summary = SUMMARY
      s.description = DESCRIPTION
      s.license = 'MIT'

      #### Dependencies, requirements and files
      s.files = PKG_FILES.to_a

      s.require_path = 'lib'
      s.executables = ['kramdown']
      s.default_executable = 'kramdown'
      s.required_ruby_version = '>= 2.0'
      s.add_development_dependency 'minitest', '~> 5.0'
      s.add_development_dependency 'coderay', '~> 1.0.0'
      s.add_development_dependency 'rouge'
      s.add_development_dependency 'stringex', '~> 1.5.1'
      s.add_development_dependency 'prawn', '~> 2.0'
      s.add_development_dependency 'prawn-table', '~> 0.2.2'
      s.add_development_dependency 'ritex', '~> 1.0'
      s.add_development_dependency 'itextomml', '~> 1.5'
      s.add_development_dependency 'execjs', '~> 2.7'
      s.add_development_dependency 'sskatex', '>= 0.9.37'
      s.add_development_dependency 'katex', '~> 0.4.3'

      #### Documentation

      s.has_rdoc = true
      s.rdoc_options = ['--main', 'lib/kramdown/document.rb']

      #### Author and project details

      s.author = 'Thomas Leitner'
      s.email = 't_leitner@gmx.at'
      s.homepage = "http://kramdown.gettalong.org"
    end


    task :gemspec => [ 'CONTRIBUTERS', 'VERSION', 'man/man1/kramdown.1'] do
      print "Generating Gemspec\n"
      contents = spec.to_ruby
      File.open("kramdown.gemspec", 'w+') {|f| f.puts(contents)}
    end

    Gem::PackageTask.new(spec) do |pkg|
      pkg.need_zip = true
      pkg.need_tar = true
    end

  end

  if defined?(Webgen) && defined?(Gem) && defined?(Rake::RDocTask)
    desc 'Release Kramdown version ' + Kramdown::VERSION
    task :release => [:clobber, :package, :publish_files, :publish_website]
  end

  if defined?(Gem)
    desc "Upload the release to Rubygems"
    task :publish_files => [:package] do
      sh "gem push pkg/kramdown-#{Kramdown::VERSION}.gem"
      puts 'done'
    end
  end

  desc "Upload the website"
  task :publish_website => ['doc'] do
    puts "Transfer manually!!!"
    # sh "rsync -avc --delete --exclude 'MathJax' --exclude 'robots.txt'  htmldoc/ gettalong@rubyforge.org:/var/www/gforge-projects/kramdown/"
  end


  if defined? Rcov
    Rcov::RcovTask.new do |rcov|
      rcov.libs << 'test'
    end
  end

  CODING_LINE = "# -*- coding: utf-8 -*-\n"
  COPYRIGHT=<<EOF
#
#--
# Copyright (C) 2009-2016 Thomas Leitner <t_leitner@gmx.at>
#
# This file is part of kramdown which is licensed under the MIT.
#++
#
EOF

  desc "Insert/Update copyright notice"
  task :update_copyright do
    inserted = false
    Dir["lib/**/*.rb", "test/**/*.rb"].each do |file|
      if !File.read(file).start_with?(CODING_LINE + COPYRIGHT)
        inserted = true
        puts "Updating file #{file}"
        old = File.read(file)
        if !old.gsub!(/\A#{Regexp.escape(CODING_LINE)}#\n#--.*?\n#\+\+\n#\n/m, CODING_LINE + COPYRIGHT)
          old.gsub!(/\A(#{Regexp.escape(CODING_LINE)})?/, CODING_LINE + COPYRIGHT + "\n")
        end
        File.open(file, 'w+') {|f| f.puts(old)}
      end
    end
    puts "Look through the above mentioned files and correct all problems" if inserted
  end

  desc "Check for MathjaxNode availability"
  task :test_mathjaxnode_deps do
    html = %x{echo '$$a$$' | \
              #{RbConfig.ruby} -Ilib bin/kramdown --no-config-file --math-engine mathjaxnode}
    raise (<<MJC) unless $?.success?
Some requirement by the mathjax-node-cli package has not been satisfied.
Cf. the above error messages.
MJC
    raise (<<MJN) unless %r{\A<math xmlns="http://www.w3.org/\d+/Math/MathML".*</math>\Z}m === html
The MathjaxNode engine is not available. Try "npm install mathjax-node-cli".
MJN
    puts "MathjaxNode is available, and its default configuration works."
  end

  desc "Update kramdown MathjaxNode test reference outputs"
  task update_mathjaxnode_tests: [:test_mathjaxnode_deps] do
    # Not framed in terms of rake file tasks to prevent accidental overwrites.
    Dir['test/testcases/**/mathjaxnode*.text'].each do |f|
      stem = f[0..-6] # Remove .text
      ruby "-Ilib bin/kramdown --config-file #{stem}.options #{f} >#{stem}.html.19"
    end
  end

  desc "Check for SsKaTeX availability"
  task :test_sskatex_deps do
    katexjs = 'katex/katex.min.js'
    raise (<<TKJ) unless File.exists? katexjs
Cannot find file '#{katexjs}'.
You need to download KaTeX e.g. from https://github.com/Khan/KaTeX/releases/
and extract at least '#{katexjs}'.
Alternatively, if you have a copy of KaTeX unpacked somewhere else,
you can create a symbolic link 'katex' pointing to that KaTeX directory.
TKJ
    html = %x{echo '$$a$$' | \
              #{RbConfig.ruby} -Ilib bin/kramdown --no-config-file --math-engine sskatex}
    raise (<<KTC) unless $?.success?
Some requirement by SsKaTeX or the employed JS engine has not been satisfied.
Cf. the above error messages.
KTC
    raise (<<XJS) unless / class="katex"/ === html
Some static dependency of SsKaTeX, probably the 'sskatex' or the 'execjs' gem,
is not available.
If you 'gem install sskatex', also make sure that some JS engine is available,
e.g. by installing one of the gems 'duktape', 'therubyracer', or 'therubyrhino'.
XJS
    puts "SsKaTeX is available, and its default configuration works."
  end

  desc "Update kramdown SsKaTeX test reference outputs"
  task update_sskatex_tests: [:test_sskatex_deps] do
    # Not framed in terms of rake file tasks to prevent accidental overwrites.
    Dir['test/testcases/**/sskatex*.text'].each do |f|
      stem = f[0..-6] # Remove .text
      ruby "-Ilib bin/kramdown --config-file #{stem}.options #{f} >#{stem}.html.19"
    end
  end

  desc "Update kramdown KaTeX test reference outputs"
  task :update_katex_tests do
    # Not framed in terms of rake file tasks to prevent accidental overwrites.
    Dir['test/testcases/**/katex*.text'].each do |f|
      stem = f[0..-6] # Remove .text
      ruby "-Ilib bin/kramdown --config-file #{stem}.options #{f} >#{stem}.html.19"
    end
  end
end

task :gemspec => ['dev:gemspec']

task :clobber => ['dev:clobber']
