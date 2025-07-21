# ruby-install

Installs [Ruby], [JRuby], [TruffleRuby] (native / GraalVM), or [mruby].

## Features

* Supports installing arbitrary versions.
* Supports downloading the latest versions and checksums from [ruby-versions].
* Supports installing into `/opt/rubies/` for root and `~/.rubies/` for users
  by default.
* Supports installing into arbitrary directories.
* Supports downloading from arbitrary URLs.
* Supports downloading from mirrors.
* Supports downloading/applying patches.
* Supports specifying arbitrary `./configure` options.
* Supports downloading archives using `wget` or `curl`.
* Supports verifying downloaded archives via MD5, SHA1, SHA256 or SHA512
  checksums.
* Supports installing build dependencies via the package manager:
  * [apt]
  * [dnf]
  * [yum]
  * [pacman]
  * [zypper]
  * [xbps]
  * [pkg]
  * [macports]
  * [brew]
* Has tests.

## Anti-Features

* Does not require updating every time a new Ruby version comes out.
* Does not require recipes for each individual Ruby version or configuration.
* Does not support installing trunk/HEAD or nightly rolling releases.
* Does not support installing unsupported/unmaintained versions of Ruby.

## Requirements

* [bash] >= 3.x
* `grep`
* [wget] > 1.12 or [curl]
* `md5sum` or `md5`
* `sha1sum` or `sha1`
* `sha256sum` or `sha256`
* `sha512sum` or `sha512`
* `tar`
* `bzip2`
* `xz`
* `patch` (if `--patch` is specified)
* [gcc] >= 4.2 or [clang]

## Synopsis

List supported Rubies and their current stable versions:

```shell
$ ruby-install
```

Updates then list the supported Rubies and their current stable versions:

```shell
$ ruby-install --update
```

Install the current stable version of Ruby:

```shell
$ ruby-install ruby
```

Install the latest version of Ruby:

```shell
$ ruby-install --update ruby
```

Install a stable version of Ruby:

```shell
$ ruby-install ruby 3.1
```

Install a specific version of Ruby:

```shell
$ ruby-install ruby 3.1.2
```

Install a Ruby into a specific directory:

```shell
$ ruby-install --install-dir /path/to/dir ruby
```

Install a Ruby into a specific `rubies` directory:

```shell
$ ruby-install --rubies-dir /path/to/rubies/ ruby
```

Install a Ruby into `/usr/local`:

```shell
$ ruby-install --system ruby 3.1.2
```

Install a Ruby from an official site with directly download:

```shell
$ ruby-install -M https://ftp.ruby-lang.org/pub/ruby ruby 3.1.2
```

Install a Ruby from a mirror:

```shell
$ ruby-install -M http://www.mirrorservice.org/sites/ftp.ruby-lang.org/pub/ruby ruby 3.1.2
```

Install a Ruby with a specific patch:

```shell
$ ruby-install -p https://raw.github.com/gist/4136373/falcon-gc.diff ruby 1.9.3-p551
```

Install a Ruby with a specific C compiler:

```shell
$ ruby-install ruby 3.1.2 -- CC=clang
```

Install a Ruby with specific configuration:

```shell
$ ruby-install ruby 3.1.2 -- --enable-shared --enable-dtrace CFLAGS="-O3"
```

Install a Ruby without installing dependencies first:

```shell
$ ruby-install --no-install-deps ruby 3.1.2
```

Uninstall a Ruby version:

```shell
$ rm -rf ~/.rubies/ruby-3.1.2
```

### Integration

Using ruby-install with [RVM]:

```shell
$ ruby-install --rubies-dir ~/.rvm/rubies ruby-3.2.0-preview3
```

Using ruby-install with [rbenv]:

```shell
$ ruby-install --install-dir ~/.rbenv/versions/3.2.0-preview3 ruby-3.2.0-preview3
```

ruby-install can even be used with [Chef].

## Install

```shell
wget https://github.com/postmodern/ruby-install/releases/download/v0.9.3/ruby-install-0.9.3.tar.gz
tar -xzvf ruby-install-0.9.3.tar.gz
cd ruby-install-0.9.3/
sudo make install
```

### PGP

All releases are [PGP] signed for security. Instructions on how to import my
PGP key can be found on my [blog][1]. To verify that a release was not tampered
with:

```shell
wget https://github.com/postmodern/ruby-install/releases/download/v0.9.3/ruby-install-0.9.3.tar.gz.asc
gpg --verify ruby-install-0.9.3.tar.gz.asc ruby-install-0.9.3.tar.gz
```

### Homebrew

ruby-install can also be installed with [homebrew]:

```shell
brew install ruby-install
```

Or the absolute latest ruby-install can be installed from source:

```shell
brew install ruby-install --HEAD
```

### Arch Linux

ruby-install is already included in the [AUR]:

```shell
yaourt -S ruby-install
```

### Fedora Linux

ruby-install is available on [Fedora Copr](https://copr.fedorainfracloud.org/coprs/duritong/chruby/).

### FreeBSD

ruby-install is included in the official [FreeBSD ports collection]:

```shell
cd /usr/ports/devel/ruby-install/ && make install clean
```

## Known Issues

Please see the [wiki](https://github.com/postmodern/ruby-install/wiki/Known-Issues).

## Alternatives

* [RVM]
* [ruby-build]

## Endorsements

> I like the approach you're taking. Curious to see how it plays out.

-- [Sam Stephenson](https://twitter.com/sstephenson/status/334461494668443649)
of [rbenv]

[ruby-versions]: https://github.com/postmodern/ruby-versions#readme

[Ruby]: http://www.ruby-lang.org/
[JRuby]: http://jruby.org/
[TruffleRuby]: https://github.com/oracle/truffleruby
[mruby]: https://github.com/mruby/mruby#readme

[apt]: http://wiki.debian.org/Apt
[dnf]: https://fedoraproject.org/wiki/Features/DNF
[yum]: http://yum.baseurl.org/
[pacman]: https://wiki.archlinux.org/index.php/Pacman
[zypper]: https://en.opensuse.org/Portal:Zypper
[xbps]: https://docs.voidlinux.org/xbps/index.html
[pkg]: https://wiki.freebsd.org/pkgng
[macports]: https://www.macports.org/
[brew]: http://brew.sh

[bash]: http://www.gnu.org/software/bash/
[wget]: http://www.gnu.org/software/wget/
[curl]: http://curl.haxx.se/

[gcc]: http://gcc.gnu.org/
[clang]: http://clang.llvm.org/

[RVM]: https://rvm.io/
[rbenv]: https://github.com/sstephenson/rbenv#readme
[ruby-build]: https://github.com/sstephenson/ruby-build#readme
[Chef]: https://github.com/rosstimson/chef-ruby_install#readme

[PGP]: http://en.wikipedia.org/wiki/Pretty_Good_Privacy
[1]: http://postmodern.github.io/pgp/

[homebrew]: http://brew.sh/
[AUR]: https://aur.archlinux.org/packages/ruby-install/
[FreeBSD ports collection]: https://www.freshports.org/devel/ruby-install/
