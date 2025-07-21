#!/usr/bin/env bash

#
# Sets os_platform and os_arch.
#
function detect_os()
{
	os_platform="$(uname -s)"
	os_arch="$(uname -m)"
}

#
# Don't use sudo if already root.
#
function detect_sudo()
{
	if (( UID == 0 )); then sudo=""
	else                    sudo="sudo"
	fi
}

#
# Auto-detect the package manager.
#
function detect_package_manager()
{
	if [[ -n "$RUBY_INSTALL_PKG_MANAGER" ]]; then
		package_manager="$RUBY_INSTALL_PKG_MANAGER"
		return
	fi

	case "$os_platform" in
		Linux)
			if [[ -f /etc/redhat-release ]]; then
				if   command -v dnf >/dev/null; then
					package_manager="dnf"
				elif command -v yum >/dev/null; then
					package_manager="yum"
				fi
			elif [[ -f /etc/debian_version ]]; then
				if command -v apt >/dev/null; then
					package_manager="apt"
				fi
			elif [[ -f /etc/SuSE-release ]]; then
				if command -v zypper >/dev/null; then
					package_manager="zypper"
				fi
			elif [[ -f /etc/arch-release ]]; then
				if command -v pacman >/dev/null; then
					package_manager="pacman"
				fi
			elif [[ -x /bin/lsb_release ]] && lsb_release -c|grep -q void; then
				if command -v xbps-install >/dev/null; then
					package_manager="xbps"
				fi
			fi
			;;
		Darwin)
			if   command -v brew >/dev/null; then
				package_manager="brew"
			elif command -v port >/dev/null; then
				package_manager="port"
			fi
			;;
		*BSD)
			if command -v pkg >/dev/null; then
				package_manager="pkg"
			fi
			;;
	esac
}

#
# Auto-detect the downloader.
#
function detect_downloader()
{
	case "$os_platform" in
		Darwin)
			if command -v curl >/dev/null; then
				downloader="curl"
			elif   command -v wget >/dev/null; then
				downloader="wget"
			fi
			;;
		*)
			if   command -v wget >/dev/null; then
				downloader="wget"
			elif command -v curl >/dev/null; then
				downloader="curl"
			fi
			;;
	esac
}

detect_os
detect_sudo
detect_package_manager
detect_downloader
