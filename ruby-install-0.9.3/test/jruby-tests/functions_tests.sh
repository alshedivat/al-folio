#!/usr/bin/env bash

. ./test/helper.sh
. ./share/ruby-install/ruby-install.sh

function setUp()
{
	ruby="jruby"
	ruby_version="9.4.5.0"

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/jruby/functions.sh"
}

function test_ruby_archive_default_value()
{
	assertEquals "did not correctly set \$ruby_archive" \
	             "jruby-dist-${ruby_version}-bin.tar.gz" \
	             "$ruby_archive"
}

function test_ruby_archive_when_its_already_set()
{
	ruby_archive="jruby-custom-1.2.3.tar.bz2"

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/jruby/functions.sh"

	assertEquals "did not preserve the \$ruby_archive value" \
	             "jruby-custom-1.2.3.tar.bz2" \
	             "$ruby_archive"
}

function test_ruby_dir_name()
{
	assertEquals "did not correctly set \$ruby_dir_name" \
	             "jruby-$ruby_version" \
	             "$ruby_dir_name"
}

function test_ruby_mirror_default_value()
{
	assertEquals "did not correctly set \$ruby_mirror" \
	             "https://repo1.maven.org/maven2/org/jruby/jruby-dist" \
	             "$ruby_mirror"
}

function test_ruby_mirror_when_its_already_set()
{
	ruby_mirror="https://example.com/pub/jruby"

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/jruby/functions.sh"

	assertEquals "did not preserve the \$ruby_mirror value" \
	             "https://example.com/pub/jruby" \
	             "$ruby_mirror"
}

function test_ruby_url_default_value()
{
	assertEquals "did not correctly set \$ruby_url" \
	             "https://repo1.maven.org/maven2/org/jruby/jruby-dist/$ruby_version/$ruby_archive" \
	             "$ruby_url"
}

function test_ruby_url_when_its_already_set()
{
	ruby_url="https://example.com/pub/jruby/jruby-1.2.3.tar.gz"

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/jruby/functions.sh"

	assertEquals "did not preserve the \$ruby_url value" \
	             "https://example.com/pub/jruby/jruby-1.2.3.tar.gz" \
	             "$ruby_url"
}

function tearDown()
{
	unset ruby ruby_version ruby_archive ruby_dir_name ruby_mirror ruby_url
}

SHUNIT_PARENT=$0 . $SHUNIT2
