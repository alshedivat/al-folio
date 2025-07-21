#!/usr/bin/env bash

unset GREP_OPTIONS GREP_COLOR GREP_COLORS

if   command -v md5sum > /dev/null; then md5sum="md5sum"
elif command -v md5 > /dev/null;    then md5sum="md5 -r"
fi

if   command -v sha1sum > /dev/null; then sha1sum="sha1sum"
elif command -v sha1 > /dev/null;    then sha1sum="sha1 -r"
elif command -v shasum > /dev/null;  then sha1sum="shasum"
fi

if   command -v sha256sum > /dev/null; then sha256sum="sha256sum"
elif command -v sha256 > /dev/null;    then sha256sum="sha256 -r"
elif command -v shasum > /dev/null;    then sha256sum="shasum -a 256"
fi

if   command -v sha512sum > /dev/null; then sha512sum="sha512sum"
elif command -v sha512 > /dev/null;    then sha512sum="sha512 -r"
elif command -v shasum > /dev/null;    then sha512sum="shasum -a 512"
fi

function lookup_checksum()
{
	local checksums="$1"
	local file="${2##*/}"

	if [[ ! -f "$checksums" ]]; then
		return 1
	fi

	local output="$(grep "  $file" "$checksums")"

	echo -n "${output%% *}"
}

function compute_checksum()
{
	local algorithm="$1"
	local file="$2"
	local program

	case "$algorithm" in
		md5)	program="$md5sum" ;;
		sha1)	program="$sha1sum" ;;
		sha256)	program="$sha256sum" ;;
		sha512)	program="$sha512sum" ;;
		*)	return 1 ;;
	esac

	if [[ -z "$program" ]]; then
		error "could not find $algorithm checksum utility"
		return 1
	fi

	debug "$program $file"
	local output="$($program "$file")"

	echo -n "${output%% *}"
}

function verify_checksum()
{
	local file="$1"
	local algorithm="$2"
	local expected_checksum="$3"

	if [[ -z "$expected_checksum" ]]; then
		warn "No $algorithm checksum for $file"
		return
	fi

	local actual_checksum="$(compute_checksum "$algorithm" "$file")"

	if [[ "$actual_checksum" != "$expected_checksum" ]]; then
		error "Invalid $algorithm checksum for $file"
		error "  expected: $expected_checksum"
		error "  actual:   $actual_checksum"
		return 1
	fi
}
