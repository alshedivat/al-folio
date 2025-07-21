#!/usr/bin/env bash

shopt -s extglob

ruby_install_version="0.9.3"
ruby_install_dir="${BASH_SOURCE[0]%/*}"
ruby_install_cache_dir="${XDG_CACHE_HOME:-$HOME/.cache}/ruby-install"

rubies=(ruby jruby truffleruby truffleruby-graalvm mruby)
patches=()
configure_opts=()
make_opts=()

system_dir="/usr/local"

if (( UID == 0 )); then
	src_dir="${RUBY_INSTALL_SRC_DIR:-$system_dir/src}"
	rubies_dir="${RUBY_INSTALL_RUBIES_DIR:-/opt/rubies}"
else
	src_dir="${RUBY_INSTALL_SRC_DIR:-$HOME/src}"
	rubies_dir="${RUBY_INSTALL_RUBIES_DIR:-$HOME/.rubies}"
fi

source "$ruby_install_dir/logging.sh"
source "$ruby_install_dir/system.sh"
source "$ruby_install_dir/package_manager.sh"
source "$ruby_install_dir/util.sh"
source "$ruby_install_dir/ruby-versions.sh"

#
# Prints usage information for ruby-install.
#
function usage()
{
	cat <<USAGE
usage: ruby-install [OPTIONS] [[RUBY|VERSION|RUBY-VERSION] [-- CONFIGURE_OPTS ...]]

Options:

	-r, --rubies-dir DIR	Directory that contains other installed Rubies
	-i, --install-dir DIR	Directory to install Ruby into
	    --prefix DIR        Alias for -i DIR
	    --system		Alias for -i $system_dir
	-s, --src-dir DIR	Directory to download source-code into
	-c, --cleanup		Remove archive and unpacked source-code after installation
	-j, --jobs NUM, -jNUM, --jobs=NUM
				Number of jobs to run in parallel when compiling
	-p, --patch FILE	Patch to apply to the Ruby source-code
	-M, --mirror URL	Alternate mirror to download the Ruby archive from
	-u, --url URL		Alternate URL to download the Ruby archive from
	-m, --md5 MD5		MD5 checksum of the Ruby archive
	    --sha1 SHA1		SHA1 checksum of the Ruby archive
	    --sha256 SHA256	SHA256 checksum of the Ruby archive
	    --sha512 SHA512	SHA512 checksum of the Ruby archive
	--package-manager [apt|dnf|yum|pacman|zypper|brew|pkg|port]
				Use an alternative package manager
	--no-download		Use the previously downloaded Ruby archive
	--no-verify		Do not verify the downloaded Ruby archive
	--no-extract		Do not re-extract the downloaded Ruby archive
	--no-install-deps	Do not install build dependencies before installing Ruby
	--no-reinstall  	Skip installation if another Ruby is detected in same location
	-U, --update		Downloads the latest ruby versions and checksums
	-L, --latest		Deprecated: please use -U,--update instead
	-D, --debug		Enable debug messages
	-V, --version		Prints the version
	-h, --help		Prints this message

Examples:

	$ ruby-install ruby
	$ ruby-install ruby 2.3
	$ ruby-install ruby 2.3.0
	$ ruby-install ruby -- --with-openssl-dir=...
	$ ruby-install -M https://ftp.ruby-lang.org/pub/ruby ruby
	$ ruby-install -M http://www.mirrorservice.org/sites/ftp.ruby-lang.org/pub/ruby ruby
	$ ruby-install -p https://raw.github.com/gist/4136373/falcon-gc.diff ruby 1.9.3

USAGE
}

#
# Parses a "ruby-version" string.
#
function parse_ruby()
{
	local string="$1"

	case "$string" in
		*-[0-9]*)
			ruby="${string%-[0-9]*}"
			ruby_version="${string#$ruby-}"
			;;
		[0-9]*)
			ruby="ruby"
			ruby_version="$string"
			;;
		*)
			ruby="$string"
			;;
	esac

	if [[ ! "${rubies[*]}" == *"$ruby"* ]]; then
		echo "ruby-install: unknown ruby: $ruby" >&2
		return 1
	fi
}

#
# Parses command-line options for ruby-install.
#
function parse_options()
{
	local argv=()

	while [[ $# -gt 0 ]]; do
		case "$1" in
			-r|--rubies-dir)
				rubies_dir="$2"
				shift 2
				;;
			-i|--install-dir|--prefix)
				install_dir="$2"
				shift 2
				;;
			--system)
				install_dir="$system_dir"
				shift 1
				;;
			-s|--src-dir)
				src_dir="$2"
				shift 2
				;;
			-c|--cleanup)
				cleanup=1
				shift
				;;
			-j|--jobs)
				make_opts+=("$1" "$2")
				shift 2
				;;
			-j+([0-9])|--jobs=+([0-9]))
				make_opts+=("$1")
				shift
				;;
			-p|--patch)
				patches+=("$2")
				shift 2
				;;
			-M|--mirror)
				ruby_mirror="$2"
				shift 2
				;;
			-u|--url)
				ruby_url="$2"
				ruby_archive="${ruby_url##*/}"
				shift 2
				;;
			-m|--md5)
				ruby_md5="$2"
				shift 2
				;;
			--sha1)
				ruby_sha1="$2"
				shift 2
				;;
			--sha256)
				ruby_sha256="$2"
				shift 2
				;;
			--sha512)
				ruby_sha512="$2"
				shift 2
				;;
			--package-manager)
				set_package_manager "$2"
				shift 2
				;;
			--no-download)
				no_download=1
				shift
				;;
			--no-verify)
				no_verify=1
				shift
				;;
			--no-extract)
				no_download=1
				no_verify=1
				no_extract=1
				shift
				;;
			--no-install-deps)
				no_install_deps=1
				shift
				;;
			--no-reinstall)
				no_reinstall=1
				shift
				;;
			-L|--latest)
				warn "DEPRECATION: -L,--latest is deprecated. Please use -U,--update instead."
				force_update=1
				shift
				;;
			-U|--update)
				force_update=1
				shift
				;;
			-D|--debug)
				enable_debug=1
				shift
				;;
			-V|--version)
				echo "ruby-install: $ruby_install_version"
				exit
				;;
			-h|--help)
				usage
				exit
				;;
			--)
				shift
				configure_opts=("$@")
				break
				;;
			-*)
				echo "ruby-install: unrecognized option $1" >&2
				return 1
				;;
			*)
				argv+=("$1")
				shift
				;;
		esac
	done

	case ${#argv[*]} in
		2)	parse_ruby "${argv[0]}-${argv[1]}" || return $? ;;
		1)	parse_ruby "${argv[0]}" || return $? ;;
		0)	return 0 ;;
		*)
			echo "ruby-install: too many arguments: ${argv[*]}" >&2
			usage 1>&2
			return 1
			;;
	esac
}

#
# Prints Rubies supported by ruby-install.
#
function list_rubies()
{
	local ruby

	for ruby in "${rubies[@]}"; do
		if [[ $force_update -eq 1 ]] ||
		   are_ruby_versions_missing "$ruby"; then
			log "Downloading latest $ruby versions ..."
			download_ruby_versions "$ruby"
		fi
	done

	echo "Stable ruby versions:"
	for ruby in "${rubies[@]}"; do
		echo "  $ruby:"
		stable_ruby_versions "$ruby" | sed -e 's/^/    /' || return $?
	done
}

#
# Initializes variables.
#
function init()
{
	local fully_qualified_version="$(lookup_ruby_version "$ruby" "$ruby_version")"

	if [[ -n "$fully_qualified_version" ]]; then
		ruby_version="$fully_qualified_version"
	else
		warn "Unknown $ruby version $ruby_version. Proceeding anyways ..."
	fi

	source "$ruby_install_dir/functions.sh"       || return $?
	source "$ruby_install_dir/$ruby/functions.sh" || return $?

	ruby_cache_dir="$ruby_install_cache_dir/$ruby"
	install_dir="${install_dir:-$rubies_dir/$ruby-$ruby_version}"
	ruby_build_dir="$src_dir/$ruby_dir_name"

	ruby_md5="${ruby_md5:-$(ruby_checksum_for "$ruby" md5 "$ruby_archive")}"
	ruby_sha1="${ruby_sha1:-$(ruby_checksum_for "$ruby" sha1 "$ruby_archive")}"
	ruby_sha256="${ruby_sha256:-$(ruby_checksum_for "$ruby" sha256 "$ruby_archive")}"
	ruby_sha512="${ruby_sha512:-$(ruby_checksum_for "$ruby" sha512 "$ruby_archive")}"
}
