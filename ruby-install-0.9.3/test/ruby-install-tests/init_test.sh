#!/usr/bin/env bash

. ./test/helper.sh

function oneTimeSetUp()
{
	ruby="ruby"

	download_ruby_versions "$ruby"
}

function setUp()
{
	ruby="ruby"
	ruby_version="2.7"

	expected_ruby_version="$(latest_version "$ruby_install_cache_dir/$ruby/stable.txt" "$ruby_version")"
}

function test_init()
{
	init

	assertEquals "did not return 0" 0 $?
}

function test_init_when_ruby_is_unknown()
{
	ruby="foo"

	init 2>/dev/null

	assertEquals "did not return 1" 1 $?
}

function test_ruby_version()
{
	init

	assertEquals "did not expand ruby_version" \
		     "$expected_ruby_version" \
		     "$ruby_version"
}

function test_ruby_version_with_unknown_version()
{
	local expected_ruby_version="9000"

	ruby_version="$expected_ruby_version"

	local output=$(init 2>&1)

	assertTrue "did not print a warning" \
		   '[[ $output == *"*** Unknown ruby version $expected_ruby_version."* ]]'
	assertEquals "did not preserve ruby_version" \
		     "$expected_ruby_version" \
		     "$ruby_version"
}

function test_init_with_ruby_url()
{
	local url="http://mirror.s3.amazonaws.com/downloads/ruby-1.2.3.tar.gz"

	ruby_url="$url"
	init

	assertEquals "did not preserve ruby_url" "$url" "$ruby_url"
}

function test_init_ruby_md5()
{
	init

	assertNotNull "did not set ruby_md5" $ruby_md5
}

function test_init_ruby_sha1()
{
	init

	assertNotNull "did not set ruby_sha1" $ruby_sha1
}

function test_init_ruby_sha256()
{
	init

	assertNotNull "did not set ruby_sha256" $ruby_sha256
}

function test_init_ruby_sha512()
{
	init

	assertNotNull "did not set ruby_sha512" $ruby_sha512
}

function test_init_with_ruby_md5()
{
	local md5="b1946ac92492d2347c6235b4d2611184"

	ruby_md5="$md5"
	init

	assertEquals "did not preserve ruby_md5" "$md5" "$ruby_md5"
}

function test_init_with_ruby_sha1()
{
	local sha1="4e1243bd22c66e76c2ba9eddc1f91394e57f9f83"

	ruby_sha1="$sha1"
	init

	assertEquals "did not preserve ruby_sha1" "$sha1" "$ruby_sha1"
}

function test_init_with_ruby_sha256()
{
	local sha256="f2ca1bb6c7e907d06dafe4687e579fce76b37e4e93b7605022da52e6ccc26fd2"

	ruby_sha256="$sha256"
	init

	assertEquals "did not preserve ruby_sha256" "$sha256" "$ruby_sha256"
}

function test_init_with_ruby_sha512()
{
	local sha512="0cf9180a764aba863a67b6d72f0918bc131c6772642cb2dce5a34f0a702f9470ddc2bf125c12198b1995c233c34b4afd346c54a2334c350a948a51b6e8b4e6b6"

	ruby_sha512="$sha512"
	init

	assertEquals "did not preserve ruby_sha512" "$sha512" "$ruby_sha512"
}

function test_rubies_dir()
{
	init

	if (( UID == 0 )); then
		assertEquals "did not correctly default rubies_dir" \
			     "/opt/rubies" \
			     "$rubies_dir"
	else
		assertEquals "did not correctly default rubies_dir" \
			     "$HOME/.rubies" \
			     "$rubies_dir"
	fi
}

function test_ruby_cache_dir()
{
	init

	assertEquals "did not correctly set ruby_cache_dir" \
		     "$ruby_install_cache_dir/$ruby" \
		     "$ruby_cache_dir"
}

function test_install_dir()
{
	init

	assertEquals "did not correctly default install_dir" \
		     "$rubies_dir/$ruby-$expected_ruby_version" \
		     "$install_dir"
}

function tearDown()
{
	unset install_dir ruby_cache_dir
	unset ruby ruby_version ruby_md5 ruby_archive ruby_url
}

SHUNIT_PARENT=$0 . $SHUNIT2
