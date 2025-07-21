#!/usr/bin/env bash

function set_package_manager()
{
	case "$1" in
		zypper|apt|dnf|yum|pkg|port|brew|pacman|xbps)
			package_manager="$1"
			;;
		*)
			error "Unsupported package manager: $1"
			return 1
			;;
	esac
}

function install_packages()
{
	case "$package_manager" in
		apt)
			run $sudo apt install -y "$@" || return $?
			;;
		dnf|yum)
			run $sudo "$package_manager" install -y "$@" || return $?
			;;
		port)
			run $sudo port install "$@" || return $?
			;;
		pkg)
			run $sudo pkg install -y "$@" || return $?
			;;
		brew)
			local brew_sudo=""

			if (( UID == 0 )) && [[ -n "$SUDO_USER" ]]; then
				# Note: to avoid running homebrew as root,
				# drop privileges back to the original sudo user
				brew_sudo="sudo -u \"$SUDO_USER\""
			fi

			run $brew_sudo brew install "$@" ||
			run $brew_sudo brew upgrade "$@" || return $?
			;;
		pacman)
			local missing_pkgs=($(pacman -T "$@"))

			if (( ${#missing_pkgs[@]} > 0 )); then
				run $sudo pacman -S "${missing_pkgs[@]}" || return $?
			fi
			;;
		zypper)
			run $sudo zypper -n in -l "$@" || return $?
			;;
		xbps)
			run $sudo xbps-install -Sy "$@" || return $?
			;;
		"")
			warn "Could not determine Package Manager. Proceeding anyway."
			;;
	esac
}
