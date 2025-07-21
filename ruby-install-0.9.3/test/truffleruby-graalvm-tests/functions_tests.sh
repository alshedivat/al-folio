#!/usr/bin/env bash

. ./test/helper.sh
. ./share/ruby-install/ruby-install.sh

function setUp()
{
	ruby="truffleruby-graalvm"
	ruby_version="23.1.0"

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/truffleruby-graalvm/functions.sh"
}

function test_graalvm_platform_when_os_platform_is_Linux()
{
	local original_os_platform="$os_platform"
	os_platform="Linux"

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/truffleruby-graalvm/functions.sh"

	assertEquals "did not correctly set \$graalvm_platform" \
	             "linux" \
	             "$graalvm_platform"

	os_platform="$original_os_platform"
}

function test_graalvm_platform_when_os_platform_is_Darwin()
{
	local original_os_platform="$os_platform"
	os_platform="Darwin"

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/truffleruby-graalvm/functions.sh"

	assertEquals "did not correctly set \$graalvm_platform" \
	             "darwin" \
	             "$graalvm_platform"

	os_platform="$original_os_platform"
}

function test_graalvm_arch_when_os_arch_is_x86_64()
{
	local original_os_arch="$os_arch"
	os_arch="x86_64"

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/truffleruby-graalvm/functions.sh"

	assertEquals "did not correctly set \$graalvm_arch" \
	             "amd64" \
	             "$graalvm_arch"

	os_arch="$original_os_arch"
}

function test_graalvm_arch_when_os_arch_is_aarch64()
{
	local original_os_arch="$os_arch"
	os_arch="aarch64"

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/truffleruby-graalvm/functions.sh"

	assertEquals "did not correctly set \$graalvm_arch" \
	             "aarch64" \
	             "$graalvm_arch"

	os_arch="$original_os_arch"
}

function test_graalvm_arch_when_os_arch_is_arm64()
{
	local original_os_arch="$os_arch"
	os_arch="arm64"

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/truffleruby-graalvm/functions.sh"

	assertEquals "did not correctly set \$graalvm_arch" \
	             "aarch64" \
	             "$graalvm_arch"

	os_arch="$original_os_arch"
}

function test_truffleruby_major()
{
	assertEquals "did not correctly set \$truffleruby_major" \
	             "23" \
	             "$truffleruby_major"
}

function test_truffleruby_without_major()
{
	assertEquals "did not correctly set \$truffleruby_without_major" \
	             "1.0" \
	             "$truffleruby_without_major"
}

function test_truffleruby_minor()
{
	assertEquals "did not correctly set \$truffleruby_minor" \
	             "1" \
	             "$truffleruby_minor"
}

function test_ruby_dir_name_when_ruby_version_is_23_0_0()
{
	ruby_version="23.0.0"

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/truffleruby-graalvm/functions.sh" >/dev/null

	assertEquals "did not correctly set \$ruby_dir_name" \
	             "graalvm-jdk-17.0.7+8.1" \
	             "$ruby_dir_name"
}

function test_ruby_dir_name_when_ruby_version_is_greater_or_equal_to_23_1_0()
{
	ruby_version="23.1.0"

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/truffleruby-graalvm/functions.sh"

	assertEquals "did not correctly set \$ruby_dir_name" \
	             "truffleruby-$ruby_version-${graalvm_platform/darwin/macos}-$graalvm_arch" \
	             "$ruby_dir_name"
}

function test_ruby_dir_name_when_ruby_version_is_less_than_23_0_0()
{
	ruby_version="22.1.0"

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/truffleruby-graalvm/functions.sh"

	assertEquals "did not correctly set \$ruby_dir_name" \
	             "graalvm-ce-java11-$ruby_version" \
	             "$ruby_dir_name"
}

function test_ruby_archive_default_value_when_ruby_version_is_23_0_0()
{
	ruby_version="23.0.0"
	unset ruby_archive

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/truffleruby-graalvm/functions.sh" >/dev/null

	assertEquals "did not preserve the \$ruby_archive value" \
	             "graalvm-jdk-17.0.7_${graalvm_platform/darwin/macos}-${graalvm_arch/amd64/x64}_bin.tar.gz" \
	             "$ruby_archive"
}

function test_ruby_archive_default_value_when_ruby_version_is_greater_or_equal_to_23_1_0()
{
	ruby_version="23.1.0"
	unset ruby_archive

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/truffleruby-graalvm/functions.sh"

	assertEquals "did not preserve the \$ruby_archive value" \
	             "truffleruby-jvm-$ruby_version-${graalvm_platform/darwin/macos}-$graalvm_arch.tar.gz" \
	             "$ruby_archive"
}

function test_ruby_archive_default_value_when_ruby_version_is_less_than_23_0_0()
{
	ruby_version="22.1.0"
	unset ruby_archive

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/truffleruby-graalvm/functions.sh"

	assertEquals "did not preserve the \$ruby_archive value" \
	             "graalvm-ce-java11-$graalvm_platform-$graalvm_arch-$ruby_version.tar.gz" \
	             "$ruby_archive"
}

function test_ruby_archive_when_its_already_set_and_when_ruby_version_is_23_0_0()
{
	ruby_version="23.0.0"
	ruby_archive="truffleruby-graalvm-custom-1.2.3.tar.bz2"

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/truffleruby-graalvm/functions.sh" >/dev/null

	assertEquals "did not correctly set \$ruby_archive" \
	             "truffleruby-graalvm-custom-1.2.3.tar.bz2" \
	             "$ruby_archive"
}

function test_ruby_archive_when_its_already_set_and_ruby_version_is_greater_or_equal_to_23_1_0()
{
	ruby_version="23.1.0"
	ruby_archive="truffleruby-graalvm-custom-1.2.3.tar.bz2"

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/truffleruby-graalvm/functions.sh"

	assertEquals "did not correctly set \$ruby_archive" \
	             "truffleruby-graalvm-custom-1.2.3.tar.bz2" \
	             "$ruby_archive"
}

function test_ruby_archive_when_its_already_set_and_when_ruby_version_is_less_than_23_0_0()
{
	ruby_version="22.0.0"
	ruby_archive="truffleruby-graalvm-custom-1.2.3.tar.bz2"

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/truffleruby-graalvm/functions.sh"

	assertEquals "did not correctly set \$ruby_archive" \
	             "truffleruby-graalvm-custom-1.2.3.tar.bz2" \
	             "$ruby_archive"
}

function test_ruby_mirror_default_value_when_ruby_version_is_23_0_0()
{
	ruby_version="23.0.0"
	unset ruby_mirror

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/truffleruby-graalvm/functions.sh" >/dev/null

	assertEquals "did not correctly set \$ruby_mirror" \
	             "https://download.oracle.com/graalvm/17/archive" \
	             "$ruby_mirror"
}

function test_ruby_mirror_default_value_when_ruby_version_is_greater_or_equal_to_23_1_0()
{
	ruby_version="23.1.0"
	unset ruby_mirror

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/truffleruby-graalvm/functions.sh"

	assertEquals "did not correctly set \$ruby_mirror" \
	             "https://github.com/oracle/truffleruby/releases/download" \
	             "$ruby_mirror"
}

function test_ruby_mirror_default_value_when_ruby_version_is_less_than_23_0_0()
{
	ruby_version="22.1.0"
	unset ruby_mirror

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/truffleruby-graalvm/functions.sh"

	assertEquals "did not correctly set \$ruby_mirror" \
	             "https://github.com/graalvm/graalvm-ce-builds/releases/download" \
	             "$ruby_mirror"
}

function test_ruby_mirror_when_its_already_set_and_when_ruby_version_is_greater_or_equal_to_23_1_0()
{
	ruby_version="23.1.0"
	ruby_mirror="https://example.com/pub/truffleruby-graalvm"

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/truffleruby-graalvm/functions.sh"

	assertEquals "did not preserve the \$ruby_mirror value" \
	             "https://example.com/pub/truffleruby-graalvm" \
	             "$ruby_mirror"
}

function test_ruby_mirror_when_its_already_set_and_when_ruby_version_is_greater_or_equal_to_23_1_0()
{
	ruby_version="22.0.0"
	ruby_mirror="https://example.com/pub/truffleruby-graalvm"

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/truffleruby-graalvm/functions.sh"

	assertEquals "did not preserve the \$ruby_mirror value" \
	             "https://example.com/pub/truffleruby-graalvm" \
	             "$ruby_mirror"
}

function test_ruby_url_default_value_when_ruby_version_is_23_0_0()
{
	ruby_version="23.0.0"
	unset ruby_mirror ruby_url

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/truffleruby-graalvm/functions.sh" >/dev/null

	assertEquals "did not correctly set \$ruby_url" \
	             "https://download.oracle.com/graalvm/17/archive/$ruby_archive" \
	             "$ruby_url"
}

function test_ruby_url_default_value_when_ruby_version_is_greater_or_equal_to_23_1_0()
{
	ruby_version="23.1.0"
	unset ruby_mirror ruby_url

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/truffleruby/functions.sh" >/dev/null

	assertEquals "did not correctly set \$ruby_url" \
	             "https://github.com/oracle/truffleruby/releases/download/graal-$ruby_version/$ruby_archive" \
	             "$ruby_url"
}

function test_ruby_url_default_value_when_ruby_version_is_less_than_23_0_0()
{
	ruby_version="22.1.0"
	unset ruby_mirror ruby_url

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/truffleruby-graalvm/functions.sh" >/dev/null

	assertEquals "did not correctly set \$ruby_url" \
	             "https://github.com/graalvm/graalvm-ce-builds/releases/download/vm-$ruby_version/$ruby_archive" \
	             "$ruby_url"
}

function test_ruby_url_when_its_already_set_and_when_ruby_version_is_23_0_0()
{
	ruby_version="23.0.0"
	ruby_url="https://example.com/pub/truffleruby-graalvm/truffleruby-graalvm-1.2.3.tar.gz"

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/truffleruby-graalvm/functions.sh" >/dev/null

	assertEquals "did not preserve the \$ruby_url value" \
	             "https://example.com/pub/truffleruby-graalvm/truffleruby-graalvm-1.2.3.tar.gz" \
	             "$ruby_url"
}

function test_ruby_url_when_its_already_set_and_when_ruby_version_is_greater_equal_to_23_1_0()
{
	ruby_version="23.1.0"
	ruby_url="https://example.com/pub/truffleruby-graalvm/truffleruby-graalvm-1.2.3.tar.gz"

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/truffleruby-graalvm/functions.sh"

	assertEquals "did not preserve the \$ruby_url value" \
	             "https://example.com/pub/truffleruby-graalvm/truffleruby-graalvm-1.2.3.tar.gz" \
	             "$ruby_url"
}

function test_ruby_url_when_its_already_set_and_when_ruby_version_is_less_than_23_0_0()
{
	ruby_version="22.0.0"
	ruby_url="https://example.com/pub/truffleruby-graalvm/truffleruby-graalvm-1.2.3.tar.gz"

	source "$ruby_install_dir/functions.sh"
	source "$ruby_install_dir/truffleruby-graalvm/functions.sh"

	assertEquals "did not preserve the \$ruby_url value" \
	             "https://example.com/pub/truffleruby-graalvm/truffleruby-graalvm-1.2.3.tar.gz" \
	             "$ruby_url"
}

function tearDown()
{
	unset ruby ruby_version ruby_version_family ruby_archive ruby_dir_name \
	      ruby_mirror ruby_url
}

SHUNIT_PARENT=$0 . $SHUNIT2
