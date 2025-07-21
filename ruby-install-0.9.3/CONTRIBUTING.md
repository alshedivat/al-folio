# Contributing

## New Versions

**All new versions or checksums should be submitted to the [ruby-versions]
repository.**

## Code Style

* Tab indent code.
  * Spaces may be used to align multi-line commands.
* (Try to) Keep code within 80 columns.
* Use [bash] <= 3.x features.
* Quote all String variables.
* Use `(( ))` for arithmetic expressions and `[[ ]]` otherwise.
* Use `$(...)` instead of back-ticks.
* Use `${path##*/}` instead of `$(basename $path)`.
* Use `${path%/*}` instead of `$(dirname $path)`.
* Always use `"$@"` and `${array[@]}` instead of `$*` or `${arry[*]}`,
  respectively.
* Prefer single-line expressions where appropriate:

        [[ -n "$foo" ]] && other command

        if   [[ "$foo" == "bar" ]]; then command
        elif [[ "$foo" == "baz" ]]; then other_command
        fi

        case "$foo" in
        	bar) command ;;
        	baz) other_command ;;
        esac

* Use the `function` keyword for functions.
* Put curly braces on a new line so they align.
* Load function arguments into local variables for readability:

        function do_stuff()
        {
        	local ruby="$1"
        	local version="$2"
        	# ...
        }

* Explicitly return error codes with `|| return $?`.
* Keep branching logic to a minimum.
* Code should be declarative and easy to understand.

## Pull Request Guidelines

* Utility functions should go into `share/ruby-install/ruby-install.sh`.
* Generic installation steps should go into `share/ruby-install/functions.sh`.
* Ruby specific installation steps should go into
  `share/ruby-install/$ruby/functions.sh` and may override the generic steps in
  `share/ruby-install/functions.sh`.
* Ruby build dependencies should go into
  `share/ruby-install/$ruby/dependencies.txt`.
* All new code must have [shunit2] unit-tests.

### What Will Not Be Accepted

* Options for Ruby specific `./configure` options. You can pass additional
  configuration options like so:

        ruby-install ruby 2.0 -- --foo --bar

* Excessive version or environment checks. This is the job of a `./configure`
  script.
* Excessive OS specific workarounds. We should strive to fix any Ruby build
  issues or OS environment issues at their source.
* Building Rubies from HEAD. This is risky and may result in a buggy/broken
  version of Ruby. The user should build development versions of Ruby by hand
  and report any bugs to upstream.

[Makefile]: https://gist.github.com/3224049
[shunit2]: http://code.google.com/p/shunit2/

[bash]: http://www.gnu.org/software/bash/
[ruby-versions]: https://github.com/postmodern/ruby-versions
