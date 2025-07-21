#!/usr/bin/env bash

. ./test/helper.sh
. ./share/ruby-install/ruby-versions.sh

ruby="ruby"
ruby_archive="ruby-2.2.4.tar.bz2"

function oneTimeSetUp()
{
	download_ruby_versions_file "$ruby" "checksums.md5"
	download_ruby_versions_file "$ruby" "checksums.sha1"
	download_ruby_versions_file "$ruby" "checksums.sha256"
	download_ruby_versions_file "$ruby" "checksums.sha512"
}

function test_ruby_checksum_for_with_md5()
{
	local expected_checksum="c3d65f6d2ebe90dda81a37885ea244f5"
	local output="$(ruby_checksum_for "$ruby" md5 "$ruby_archive")"

	assertEquals "did not return the correct checksum" \
		     "$expected_checksum" \
		     "$output"
}

function test_ruby_checksum_for_with_sha1()
{
	local expected_checksum="6132840a859dbf2ac1498ba313021f299a870038"
	local output="$(ruby_checksum_for "$ruby" sha1 "$ruby_archive")"

	assertEquals "did not return the correct checksum" \
		     "$expected_checksum" \
		     "$output"
}

function test_ruby_checksum_for_with_sha256()
{
	local expected_checksum="31203696adbfdda6f2874a2de31f7c5a1f3bcb6628f4d1a241de21b158cd5c76"
	local output="$(ruby_checksum_for "$ruby" sha256 "$ruby_archive")"

	assertEquals "did not return the correct checksum" \
		     "$expected_checksum" \
		     "$output"
}

function test_ruby_checksum_for_with_sha512()
{
	local expected_checksum="d27ca2f19c214ce87f906b57edd41f2f8af35b2871c191470facded9cfda15ba46e5c3bc7d5540225a38da6bd65050fcc8aaa4ffbadbb6bf7dc891c1821da0df"
	local output="$(ruby_checksum_for "$ruby" sha512 "$ruby_archive")"

	assertEquals "did not return the correct checksum" \
		     "$expected_checksum" \
		     "$output"
}

SHUNIT_PARENT=$0 . $SHUNIT2
