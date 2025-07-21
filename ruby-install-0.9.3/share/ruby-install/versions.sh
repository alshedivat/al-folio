#!/usr/bin/env bash

unset GREP_OPTIONS GREP_COLOR GREP_COLORS

function is_known_version()
{
	local file="$1"
	local version="$2"

	if [[ ! -f "$file" ]] || [[ -z "$version" ]]; then
		return 1
	fi

	grep -q -x "$version" "$file"
}

function latest_version()
{
	local file="$1"
	local key="$2"

	if [[ ! -f "$file" ]]; then
		return 1
	fi

	if [[ -z "$key" ]]; then
		tail -n 1 "$file"
		return
	fi

	local version match=""

	while IFS="" read -r version; do
		if [[ "$version" == "$key".* || "$version" == "$key"-* ]]; then
			match="$version"
		fi
	done < "$file"

	if [[ -n "$match" ]]; then
		echo -n "$match"
	else
		return 1
	fi
}
