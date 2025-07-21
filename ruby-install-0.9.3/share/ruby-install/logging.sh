#!/usr/bin/env bash

#
# Prints a log message.
#
function log()
{
	if [[ -t 1 ]]; then
		echo -e "\x1b[1m\x1b[32m>>>\x1b[0m \x1b[1m$1\x1b[0m"
	else
		echo ">>> $1"
	fi
}

#
# Prints a warn message.
#
function warn()
{
	if [[ -t 1 ]]; then
		echo -e "\x1b[1m\x1b[33m***\x1b[0m \x1b[1m$1\x1b[0m" >&2
	else
		echo "*** $1" >&2
	fi
}

#
# Prints an error message.
#
function error()
{
	if [[ -t 1 ]]; then
		echo -e "\x1b[1m\x1b[31m!!!\x1b[0m \x1b[1m$1\x1b[0m" >&2
	else
		echo "!!! $1" >&2
	fi
}

unset enable_debug

#
# Prints a debugging message, only if enable_debug is enabled.
#
function debug()
{
	if [[ ! $enable_debug -eq 1 ]]; then
		return
	fi

	if [[ -t 1 ]]; then
		echo -e "\x1b[1m\x1b[33m[DEBUG]\x1b[0m \x1b[1m$1\x1b[0m" >&2
	else
		echo "[DEBUG] $1" >&2
	fi
}

#
# Runs the command and prints the full command if debugging is enabled.
#
function run()
{
	debug "$*"
	"$@"
}

#
# Prints an error message and exists with -1.
#
function fail()
{
	error "$*"
	exit -1
}
