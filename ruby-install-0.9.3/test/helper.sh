[[ -z "$SHUNIT2"     ]] && SHUNIT2=/usr/share/shunit2/shunit2
[[ -n "$ZSH_VERSION" ]] && setopt shwordsplit

test_fixtures_dir="$PWD/test/fixtures"

export HOME="$test_fixtures_dir/home"
export PATH="$PWD/bin:$PATH"

mkdir -p "$HOME"

. $PWD/share/ruby-install/ruby-install.sh

function oneTimeSetUp() { return; }
function setUp() { return; }
function tearDown() { return; }
function oneTimeTearDown() { return; }
