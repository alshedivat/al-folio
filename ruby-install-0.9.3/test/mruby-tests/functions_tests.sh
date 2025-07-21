#!/usr/bin/env bash

. ./test/helper.sh
. ./share/ruby-install/ruby-install.sh

function setUp()
{
	ruby="mruby"
	ruby_version="3.0.0"

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/mruby/functions.sh"
}

function test_ruby_archive_default_value()
{
	assertEquals "did not correctly set \$ruby_archive" \
	             "mruby-${ruby_version}.tar.gz" \
	             "$ruby_archive"
}

function test_ruby_archive_when_its_already_set()
{
	ruby_archive="ruby-custom-1.2.3.tar.bz2"

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/mruby/functions.sh"

	assertEquals "did not preserve the \$ruby_archive value" \
	             "ruby-custom-1.2.3.tar.bz2" \
	             "$ruby_archive"
}

function test_ruby_dir_name()
{
	assertEquals "did not correctly set \$ruby_dir_name" \
	             "mruby-$ruby_version" \
	             "$ruby_dir_name"
}

function test_ruby_mirror_default_value()
{
	assertEquals "did not correctly set \$ruby_mirror" \
	             "https://github.com/mruby/mruby/archive" \
	             "$ruby_mirror"
}

function test_ruby_mirror_when_its_already_set()
{
	ruby_mirror="https://example.com/pub/mruby"

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/mruby/functions.sh"

	assertEquals "did not preserve the \$ruby_mirror value" \
	             "https://example.com/pub/mruby" \
	             "$ruby_mirror"
}

function test_ruby_url_default_value()
{
	assertEquals "did not correctly set \$ruby_url" \
	             "https://github.com/mruby/mruby/archive/$ruby_version/$ruby_archive" \
	             "$ruby_url"
}

function test_ruby_url_when_its_already_set()
{
	ruby_url="https://example.com/pub/mruby/mruby-1.2.3.tar.gz"

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/mruby/functions.sh"

	assertEquals "did not preserve the \$ruby_url value" \
	             "https://example.com/pub/mruby/mruby-1.2.3.tar.gz" \
	             "$ruby_url"
}

function tearDown()
{
	unset ruby ruby_version ruby_archive ruby_dir_name ruby_mirror ruby_url
}

SHUNIT_PARENT=$0 . $SHUNIT2
