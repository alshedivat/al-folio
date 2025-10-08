#!/bin/sh

# File to compare
targetFile="./papers.bib"

echo "🔍 Comparing '$targetFile' across all branches..."
echo "⚠️  Reminder: Run 'git fetch --all --prune' first to ensure remotes are up to date."
echo

results=$(mktemp)

# Collect hash per branch
for branch in $(git branch -a --format='%(refname:short)' | sort -u); do
    fileHash=$(git ls-tree -r "$branch" -- "$targetFile" | awk '{print $3}')
    if [ -n "$fileHash" ]; then
        echo "$fileHash $branch" >> "$results"
    else
        echo "MISSING $branch" >> "$results"
    fi
done

echo "===== Branches analyzed ====="
git branch -a --format='%(refname:short)'
echo

# Get master hash
masterHash=$(grep " master$" "$results" | awk '{print $1}')

if [ -z "$masterHash" ]; then
    echo "❌ Could not find '$targetFile' in master branch."
    rm -f "$results"
    exit 1
fi

echo "===== Version Groups ====="

# Same as master
sameAsMaster=$(grep "^$masterHash " "$results" | awk '{print $2}' | tr '\n' ' ')
echo "Same as master: $sameAsMaster"
echo

# Different from master
grep -v '^MISSING' "$results" | grep -v "^$masterHash " | awk '
{
    hash=$1
    branch=$2
    groups[hash]=groups[hash] branch " "
}
END {
    if (length(groups) == 0) {
        print "No branches differ from master."
    } else {
        groupNum=1
        for (h in groups) {
            print "Different group " groupNum ": " groups[h]
            groupNum++
        }
    }
}
'
echo

# Missing file
if grep -q '^MISSING' "$results"; then
    echo "Branches missing file '$targetFile':"
    grep '^MISSING' "$results" | cut -d' ' -f2- | tr '\n' ' '
    echo
fi

rm -f "$results"
echo
echo "✅ Summary complete."