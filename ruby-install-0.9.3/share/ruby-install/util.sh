#!/usr/bin/env bash

#
# Searches a file for a key and echos the value.
# Nothing is returned if the key cannot be found.
#
function fetch()
{
	local file="$ruby_install_dir/$1.txt"
	local key="$2"
	local line

	while IFS="" read -r line; do
		if [[ "$line" == "$key:"* ]]; then
			echo "${line##$key:*([[:space:]])}"
		fi
	done < "$file"
}

#
# Downloads a URL.
#
function download()
{
	local url="$1"
	local dest="$2"

	[[ -d "$dest" ]] && dest="$dest/${url##*/}"
	[[ -f "$dest" ]] && return

	mkdir -p "${dest%/*}" || return $?

	case "$downloader" in
		wget) run wget -c -O "$dest.part" "$url" || return $?         ;;
		curl) run curl -f -L -C - -o "$dest.part" "$url" || return $? ;;
		"")
			error "Could not find wget or curl"
			return 1
			;;
	esac

	mv "$dest.part" "$dest" || return $?
}

#
# Extracts an archive.
#
function extract()
{
	local archive="$1"
	local dest="${2:-${archive%/*}}"

	case "$archive" in
		*.tgz|*.tar.gz)
			run tar -xzf "$archive" -C "$dest" || return $?
			;;
		*.tbz|*.tbz2|*.tar.bz2)
			run tar -xjf "$archive" -C "$dest" || return $?
			;;
		*.txz|*.tar.xz)
			debug "xzcat $archive | tar -xf - -C $dest"
			xzcat "$archive" | tar -xf - -C "$dest" || return $?
			;;
		*.zip)
			run unzip "$archive" -d "$dest" || return $?
			;;
		*)
			error "Unknown archive format: $archive"
			return 1
			;;
	esac
}

#
# Copies files from within a source directory into a destination directory.
#
function copy_into()
{
	local src="$1"
	local dest="$2"

	mkdir -p "$dest" || return $?
	run cp -R "$src"/* "$dest" || return $?
}
