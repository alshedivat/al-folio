#!/usr/bin/env bash

. ./test/helper.sh
. ./share/ruby-install/checksums.sh

test_dir="$test_fixtures_dir/checksums_test"

data="hello world"
file="$test_dir/file.txt"

md5="5eb63bbbe01eeed093cb22bb8f5acdc3"
sha1="2aae6c35c94fcfb415dbe95f408b9ce91ee846ed"
sha256="b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9"
sha512="309ecc489c12d6eb4cc40f50c902f2b4d0ed77ee511a7c7a9bcd3ca86d4cd86f989dd35bc5ff499670da34255b45b0cfd830e81f605dcf7dc5542e93ae9cd76f"

checksums_md5="$test_dir/checksums.md5"
checksums_sha1="$test_dir/checksums.sha1"
checksums_sha256="$test_dir/checksums.sha256"
checksums_sha512="$test_dir/checksums.sha512"

function oneTimeSetUp()
{
	mkdir -p "$test_dir"

	echo -n "$data" > "$file"

	cat <<EOS > "$checksums_md5"
eacf2ed066d1c5c3ba074cebb933d388  foo.txt
$md5  $(basename "$file")
4c80727cee7493fec3db112793d55221  bar.txt
EOS

	cat <<EOS > "$checksums_sha1"
3fd8717137c578f6ea05486c6c6c9b633e77a0ab  foo.txt
$sha1  $(basename "$file")
8203a446206c774b4673a62d1e92fd45df69c9b9  bar.txt
EOS

	cat <<EOS > "$checksums_sha256"
d8e6b6a5760ebae82c446f46441eeaee10d5034e8f0ec35871ecccaede7183e8  foo.txt
$sha256  $(basename "$file")
0610cff587f7eed38c5787ed880940c10efab6fd8ea92ebeeb00c1a6ae048119  bar.txt
EOS

	cat <<EOS > "$checksums_sha512"
879d5302f2041e0318b2e0f573e23c14f8022fcac4814ad74a59ab0a11456941f3476a0699e8bb5f84ca4c762d10a2fefe1f73e590e3b920b76079db4d326b52  foo.txt
$sha512  $(basename "$file")
a934e1875d4c38df432bc704265f0c16404bd06db96246aee85737b682bc0a0af6489177e703a5109448a837e1a48d43465a7ae0704d7a0a076b7438993bdb3f  bar.txt
EOS
}

function test_supported_checksums()
{
	assertNotNull "did not detect the md5 checksum utilility" "$md5sum"
	assertNotNull "did not detect the sha1 checksum utilility" "$sha1sum"
	assertNotNull "did not detect the sha256 checksum utilility" "$sha256sum"
	assertNotNull "did not detect the sha512 checksum utilility" "$sha512sum"
}

function test_lookup_checksum_md5()
{
	assertEquals "did not return the expected md5 checksum" \
		     "$md5" \
		     "$(lookup_checksum "$checksums_md5" "$file")"
}

function test_lookup_checksum_sha1()
{
	assertEquals "did not return the expected sha1 checksum" \
		     "$sha1" \
		     "$(lookup_checksum "$checksums_sha1" "$file")"
}

function test_lookup_checksum_sha256()
{
	assertEquals "did not return the expected sha256 checksum" \
		     "$sha256" \
		     "$(lookup_checksum "$checksums_sha256" "$file")"
}

function test_lookup_checksum_sha512()
{
	assertEquals "did not return the expected sha512 checksum" \
		     "$sha512" \
		     "$(lookup_checksum "$checksums_sha512" "$file")"
}

function test_lookup_checksum_with_missing_file()
{
	assertEquals "returned data when it should not have" \
		     "" \
		     "$(lookup_checksum "$checksums_sha512" "missing.txt")"
}

function test_lookup_checksum_with_duplicate_entries()
{
	cat <<EOS > duplicate_checksums.md5
$md5  $(basename "$file")
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa  $(basename "$file")
EOS

	assertEquals "did not return the first checksum for the file" \
		     "$md5" \
		     "$(lookup_checksum duplicate_checksums.md5 "$file")"

	rm duplicate_checksums.md5
}

function test_compute_checksum_md5()
{
	assertEquals "did not return the expected md5 checksum" \
		     "$md5" \
		     "$(compute_checksum md5 "$file")"
}

function test_compute_checksum_sha1()
{
	assertEquals "did not return the expected sha1 checksum" \
		     "$sha1" \
		     "$(compute_checksum sha1 "$file")"
}

function test_compute_checksum_sha256()
{
	assertEquals "did not return the expected sha256 checksum" \
		     "$sha256" \
		     "$(compute_checksum sha256 "$file")"
}

function test_compute_checksum_sha512()
{
	assertEquals "did not return the expected sha512 checksum" \
		     "$sha512" \
		     "$(compute_checksum sha512 "$file")"
}

function test_compute_checksum_with_missing_file()
{
	assertEquals "returned data when it should not have" \
		     "" \
		     "$(compute_checksum md5 "missing.txt" 2>/dev/null)"
}

function test_verify_checksum_md5()
{
	verify_checksum "$file" md5 "$md5"

	assertEquals "checksum was not valid" 0 $?
}

function test_verify_checksum_sha1()
{
	verify_checksum "$file" sha1 "$sha1"

	assertEquals "checksum was not valid" 0 $?
}

function test_verify_checksum_sha256()
{
	verify_checksum "$file" sha256 "$sha256"

	assertEquals "checksum was not valid" 0 $?
}

function test_verify_checksum_sha512()
{
	verify_checksum "$file" sha512 "$sha512"

	assertEquals "checksum was not valid" 0 $?
}

function oneTimeTearDown()
{
	rm -rf "$test_dir"
}

SHUNIT_PARENT=$0 . $SHUNIT2
