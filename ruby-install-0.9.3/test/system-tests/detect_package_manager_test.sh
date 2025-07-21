#!/usr/bin/env bash

. ./test/helper.sh
. ./share/ruby-install/system.sh

function test_detect_package_manager_on_redhat_based_systems_with_dnf()
{
	[[ -f /etc/redhat-release ]] && command -v dnf >/dev/null || return 0

	detect_package_manager

	assertEquals "did not prefer dnf over yum" "dnf" "$package_manager"
}

function test_detect_package_manager_on_redhat_based_systems_with_yum()
{
	[[ -f /etc/redhat-release ]] &&
		! command -v dnf >/dev/null &&
		command -v yum >/dev/null || return 0

	detect_package_manager

	assertEquals "did not fallback to yum" "yum" "$package_manager"
}

function test_detect_package_manager_on_debian_based_systems_with_apt()
{
	[[ -f /etc/debian_version ]] && command -v apt >/dev/null || \
		return 0

	detect_package_manager

	assertEquals "did not detect apt" "apt" "$package_manager"
}

function test_detect_package_manager_on_open_suse_systems_with_zypper()
{
	[[ -f /etc/SuSE-release ]] && command -v zypper >/dev/null || return 0

	detect_package_manager

	assertEquals "did not detect zypper" "zypper" "$package_manager"
}

function test_detect_package_manager_on_void_systems_with_xbps()
{
	command -v lsb_release >/dev/null &&
		command -v xbps-install >/dev/null || return 0

	assertEquals "did not detect xbps-install" "xbps" "$package_manager"
}

function test_detect_package_manager_on_bsd_systems_with_pkg()
{
	[[ "$os_platform" == *BSD ]] && command -v pkg >/dev/null || return 0

	detect_package_manager

	assertEquals "did not detect pkg" "pkg" "$package_manager"
}

function test_detect_package_manager_on_macos_systems_with_homebrew()
{
	[[ "$os_platform" == *Darwin ]] && command -v brew >/dev/null || \
		return 0

	detect_package_manager

	assertEquals "did not prefer brew over port" "brew" "$package_manager"
}

function test_detect_package_manager_on_macos_systems_with_macports()
{
	[[ "$os_platform" == *Darwin ]] &&
		! command -v brew >/dev/null &&
		command -v port >/dev/null || return 0

	detect_package_manager

	assertEquals "did not fallback to macports" "port" "$package_manager"
}

function test_detect_package_manager_when_RUBY_INSTALL_PKG_MANAGER_is_set()
{
	RUBY_INSTALL_PKG_MANAGER="custom"

	detect_package_manager

	assertEquals "did not set package_manager to $$RUBY_INSTALL_PKG_MANAGER" \
		     "$RUBY_INSTALL_PKG_MANAGER" "$package_manager"
		

	unset RUBY_INSTALL_PKG_MANAGER
}

function tearDown()
{
	unset package_manager
}

SHUNIT_PARENT=$0 . $SHUNIT2
