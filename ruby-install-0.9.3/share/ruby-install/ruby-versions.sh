#!/usr/bin/env bash

source "$ruby_install_dir/versions.sh"
source "$ruby_install_dir/checksums.sh"

ruby_versions_url="https://raw.githubusercontent.com/postmodern/ruby-versions/master"
ruby_versions_files=({versions,stable}.txt checksums.{md5,sha1,sha256,sha512})

#
# Determines if the ruby-versions files are missing for a ruby.
#
function are_ruby_versions_missing()
{
	local dir="$ruby_install_cache_dir/$ruby"

	if [[ ! -d "$dir" ]]; then
		return 0
	fi

	local file

	for file in "${ruby_versions_files[@]}"; do
		if [[ ! -f "$dir/$file" ]]; then
			return 0
		fi
	done

	return 1
}

#
# Downloads a file from the ruby-versions repository.
#
function download_ruby_versions_file()
{
	local ruby="$1"

	local file="$2"
	local dir="$ruby_install_cache_dir/$ruby"
	local dest="$dir/$file"

	local url="$ruby_versions_url/$ruby/$file"

	if [[ -f "$dest" ]]; then rm "$dest"      || return $?
	else                      mkdir -p "$dir" || return $?
	fi

	local ret

	if [[ -n "$enable_debug" ]]; then
		download "$url" "$dest"
		ret=$?
	else
		download "$url" "$dest" >/dev/null 2>&1
		ret=$?
	fi

	if (( ret > 0 )); then
		error "Failed to download $url to $dest!"
		return $ret
	fi
}

#
# Downloads all ruby-versions files for a ruby.
#
function download_ruby_versions()
{
	local ruby="$1"

	for file in "${ruby_versions_files[@]}"; do
		download_ruby_versions_file "$ruby" "$file" || return $?
	done
}

#
# Lists all current stable versions.
#
function stable_ruby_versions()
{
	local ruby="$1"

	cat "$ruby_install_cache_dir/$ruby/stable.txt"
}

#
# Finds the closest matching stable version.
#
function latest_ruby_version()
{
	local ruby="$1"
	local version="$2"

	latest_version "$ruby_install_cache_dir/$ruby/stable.txt" "$version"
}

#
# Determines if the given version is a known version.
#
function is_known_ruby_version()
{
	local ruby="$1"
	local version="$2"

	is_known_version "$ruby_install_cache_dir/$ruby/versions.txt" "$version"
}

#
# Determines if the given version is an unknown version.
#
function is_unknown_ruby_version()
{
	! is_known_ruby_version "$1" "$2"
}

#
# Looks up a checksum for $ruby_archive.
#
function ruby_checksum_for()
{
	local ruby="$1"
	local algorithm="$2"
	local archive="$3"
	local checksums="checksums.$algorithm"

	lookup_checksum "$ruby_install_cache_dir/$ruby/$checksums" "$archive"
}

#
# Resolves a short-hand ruby version to a fully qualified version.
#
function lookup_ruby_version()
{
	local ruby="$1"
	local version="$2"

	if is_known_ruby_version "$ruby" "$version"; then
		echo -n "$version"
	else
		latest_ruby_version "$ruby" "$version"
	fi
}
