#!/usr/bin/env bash

. ./test/helper.sh
. ./share/ruby-install/ruby-install.sh

function setUp()
{
	ruby="ruby"
	ruby_version="3.2.0"

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/ruby/functions.sh"
}

function test_ruby_version_family()
{
	assertEquals "did not correctly set \$ruby_version_family" \
	             "3.2" \
	             "$ruby_version_family"
}

function test_openssl_version_when_package_manager_is_not_brew_or_port()
{
	local original_package_manager="$package_manager"
	package_manager="apt"

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/ruby/functions.sh"

	assertNull "did not correctly set \$openssl_version" \
	           "$openssl_version"

	package_manager="$original_package_manager"
}

function test_openssl_version_when_package_manager_is_brew_and_ruby_version_is_less_than_3_1_0()
{
	local original_package_manager="$package_manager"
	package_manager="brew"
	ruby_version="3.0.0"

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/ruby/functions.sh"

	assertEquals "did not correctly set \$openssl_version" \
	             "1.1" \
		     "$openssl_version"

	package_manager="$original_package_manager"
}

function test_openssl_version_when_package_manager_is_brew_and_ruby_version_is_greater_equal_to_3_1_0()
{
	local original_package_manager="$package_manager"
	package_manager="brew"
	ruby_version="3.1.0"

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/ruby/functions.sh"

	assertEquals "did not correctly set \$openssl_version" \
	             "3" \
		     "$openssl_version"

	package_manager="$original_package_manager"
}

function test_openssl_version_when_package_manager_is_port_and_ruby_version_is_less_than_3_1_0()
{
	local original_package_manager="$package_manager"
	package_manager="port"
	ruby_version="3.0.0"

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/ruby/functions.sh"

	assertEquals "did not correctly set \$openssl_version" \
	             "1.1" \
		     "$openssl_version"

	package_manager="$original_package_manager"
}

function test_openssl_version_when_package_manager_is_port_and_ruby_version_is_greater_equal_to_3_1_0()
{
	local original_package_manager="$package_manager"
	package_manager="port"
	ruby_version="3.1.0"

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/ruby/functions.sh"

	assertEquals "did not correctly set \$openssl_version" \
	             "3" \
		     "$openssl_version"

	package_manager="$original_package_manager"
}

function test_ruby_archive_ext()
{
	assertEquals "did not set \$ruby_archive_ext to tar.xz" \
	             "tar.xz" \
	             "$ruby_archive_ext"
}

function test_ruby_archive_ext_for_ruby_1_x()
{
	ruby_version="1.9.3-p551"

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/ruby/functions.sh"

	assertEquals "did not set \$ruby_archive_ext to tar.bz2" \
	             "tar.bz2" \
	             "$ruby_archive_ext"
}

function test_ruby_archive_default_value()
{
	assertEquals "did not preserve the \$ruby_archive value" \
	             "ruby-${ruby_version}.${ruby_archive_ext}" \
	             "$ruby_archive"
}

function test_ruby_archive_when_its_already_set()
{
	ruby_archive="ruby-custom-1.2.3.tar.bz2"

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/ruby/functions.sh"

	assertEquals "did not correctly set \$ruby_archive" \
	             "ruby-custom-1.2.3.tar.bz2" \
	             "$ruby_archive"
}

function test_ruby_dir_name()
{
	assertEquals "did not correctly set \$ruby_dir_name" \
	             "ruby-$ruby_version" \
	             "$ruby_dir_name"
}

function test_ruby_mirror_default_value()
{
	assertEquals "did not correctly set \$ruby_mirror" \
	             "https://cache.ruby-lang.org/pub/ruby" \
	             "$ruby_mirror"
}

function test_ruby_mirror_when_its_already_set()
{
	ruby_mirror="https://example.com/pub/ruby"

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/ruby/functions.sh"

	assertEquals "did not preserve the \$ruby_mirror value" \
	             "https://example.com/pub/ruby" \
	             "$ruby_mirror"
}

function test_ruby_url_default_value()
{
	assertEquals "did not correctly set \$ruby_url" \
	             "https://cache.ruby-lang.org/pub/ruby/$ruby_version_family/$ruby_archive" \
	             "$ruby_url"
}

function test_ruby_url_when_its_already_set()
{
	ruby_url="https://example.com/pub/ruby/ruby-1.2.3.tar.gz"

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/ruby/functions.sh"

	assertEquals "did not preserve the \$ruby_url value" \
	             "https://example.com/pub/ruby/ruby-1.2.3.tar.gz" \
	             "$ruby_url"
}

function tearDown()
{
	unset ruby ruby_version ruby_version_family ruby_archive ruby_dir_name \
	      ruby_mirror ruby_url
}

SHUNIT_PARENT=$0 . $SHUNIT2
