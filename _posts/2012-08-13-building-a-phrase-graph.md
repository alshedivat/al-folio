---
layout: post
title:  Building a Phrase Graph
date:   2012-08-12
description: Frustrations with phrase graphs
tags: research
---

Research papers. I hate them sometimes. They present a great idea, talk about
how it can be used and applied, and then give only the barest description of
how to actually build and implement the idea, often with no pointers or links
to what they built. My current frustration is with building a *Phrase Graph*.
The idea behind phrase graphs are pretty simple, they encode a large set of
sentences with a minimal automata.

Here’s a simple example. Say you have the following two sentences:

```
#archery by the Republic of Korea and the guy is legally blind.
#archery by the Republic of Korea and the guy who is legally blind.
#archery by the Republic of Korea in archery by a guy who is legally blind.
```

There’s quite a lot of overlap at the start of the sentence and at the end of the sentence. So a good phrase graph would look something like this:

![Example Phrase Graph](/academic-site/assets/img/phrase-graph-example.svg)


So you can see that the nodes in the graph represent words found in the
sentences observed and if you weight the nodes based on how often they are
traversed, you can start to detect which phrases are used most frequently. But
how does one do this? And how does one do this efficiently? This is where
research papers make me mad. They fail to point out the simplest algorithms for
building these awesome ideas. To complement these research ideas, this post’ll
give a little more detail on what these phrase graphs are, an easy way to build
them using existing libraries, and code to write your own custom phrase graph!

### Badly described methods for building a phrase graph

The first paper I read for building phrase graphs, titled [Summarizing Sporting
events using
Twitter](http://www.jeffreynichols.com/papers/summary-iui2012.pdf), gives this
highly detailed algorithm description:

> The phrase graph consists of a node for each word appearing in any status
> update, and an edge between each set of two words that are used adjacently in
> any status update

Seems easy to implement, no? Here’s a more detailed algorithm, found in [Experiments in Microblog Summarization](http://www.cs.uccs.edu/~jkalita/papers/2010/SharifiBeauxSocialcom2010.pdf):

> To construct the left-hand side, the algorithm starts with the root node. It
> reduces the set of input sentences to the set of sentences that contain the
> current node’s phrase. The current node and the root node are initially the
> same. Since every input sentence is guaranteed to contain the root phrase,
> our list of sentences does not change initially. Subsequently, the algorithm
> isolates the set of words that occur immediately before the current node’s
> phrase. From this set, duplicate words are combined and assigned a count that
> represents how many instances of those words are detected. For each of these
> unique words, the algorithm adds them to the graph as nodes with their
> associated counts to the left of the current node.

This gives a lot more detail on what the phrase graph contains, and an easy
enough algorithm, but it’s not exactly a fast algorithm, especially if you want
to do this using 10 million tweets about the Olympics. Both descriptions leave
out a key detail: these phrase graphs are really just [Compressed
Tries](https://en.wikipedia.org/wiki/Trie#Compressing_tries).

### Tries and their compressed cousins

![Trie Example](/academic-site/assets/img/trie-example.svg)

Tries are one of the simplest data structures, and one of the most powerful
when processing natural languages. Given a set of words or sentences, a Trie is
essentially a standard tree where the leaves represent observed words or
sentences. The power of it is that each internal node in the Trie represents
overlapping sequences. So if you want to build a Trie for an [English
Dictionary](https://www.brics.dk/automaton/), the root node would be a blank
character, which then points to a node for each letter of the alphabet. From
the “a” child, you would then have access to all words starting with “a”, and
the further down the Trie you go, you get longer prefixes of words.

Now a Phrase Graph is essentially a Trie which condenses not only shared
prefixes, but also any shared subsequence, be they in the middle, or the end.
Formally, they are directed acyclic graphs, and if they are treated as a lookup
structure, ala a dictionary, they are called Minimal Acyclic Finite-State
Automata. And there’s plenty of fast and simple ways to build these things. The
easiest places to start reading about these is [Incremental Construction of
Minimal Acyclic Finite State Automata](https://aclanthology.org/J00-1002.pdf).
The [Brics Automaton](https://www.brics.dk/automaton/) package also provides a
really good implantation for these that works


{% highlight scala linenos %}
import dk.brics.automaton.BasicAutomata
val automata = BasicAutomata.makeStringUnion(
    "#archery by the Republic of Korea and the guy is legally blind",
    "#archery by the Republic of Korea in archery by a guy who is legally blind")
println(automata.toDot)
{% endhighlight %}

![A Brics Phrase Graph](/academic-site/assets/img/brics-phrase-graph-example.svg)

NOTE: You may want to open this in a new tab to zoom in as every letter has it’s own state.

### Rolling your own automata builder

Using Brics works really well if you just want to check whether or not a
sentence matches one seen in a corpus. However, it doesn’t easily let you check
how often particular sub-phrases are used within the corpus. For that kinda
power, you’ll have to craft your own implemenation. And now it’s time to share
the very code to do this!

#### Nodes in the graph, that’s where.

Where does one start? First, you need a node data structure, with some very
carefully crafted functions to determine equality (which indidentally, the
research papers *don’t* point out).

{% highlight scala linenos %}
/**
 * A simple node structure that records a label, a weight, and a mapping from this node to other nodes using labeled arcs.  This
 * implementation overrides {@link hashCode} and {@link equals} such that only nodes with the same label and which point to the same exact
 * children (i.e.  same objects, not equivalent objects), are considered equal.
 **/
class PhraseNode(val label: String) {

    /**
     * The internal weight for this {@link PhraseNode}.
     */
    var inCount = 0d

    /**
     * A mapping from this {@link PhraseNode} to children {@link PhraseNode}s using labeled arcs.
     */
    var linkMap = Map[String,PhraseNode]()

    /**
     * A record of the last {@link PhraseNode} added as a child to this {@link PhraseNode}.
     */
    var lastAdded:PhraseNode = null

    /**
     * Returns the {@link PhraseNode} connected to {@code this} {@link PhraseNode} via the arc {@code term}.  If no such node exists, a new
     * {@link PhraseNode} is created and returned.
     */
    def neighbor(term: String) =
        linkMap.get(term) match {
            case Some(node) => node
            case None => { lastAdded = new PhraseNode(term)
                           linkMap += (term -> lastAdded)
                           lastAdded
                         }
        }

    /**
     * Adds {@code delta} to the {@code inCount} and returns a pointer to {@code this} {@link PhraseNode}.
     */
    def addCount(delta: Double = 1) = {
        inCount += delta
        this
    }

    /**
     * Returns a hashcode based on java's internal hash code method for every object which uniquely identifies every object.
     */
    def pointerHashCode = super.hashCode

    /**
     * Override {@code hashCode} to use three factors:
     * <ol>
     *  <li>The hash code for {@code label}</li>
     *  <li>The hash code for {@code label} of each child node</li>
     *  <li>The hash code for {@code pointer} of each child node</li>
     * </ol>
     * This ensures that nodes only have the same hash code if they have the same label, same number of children, same links to those
     * children, and point to the very same children.  This is a cheap and fast way to ensure that we don't accidently consider two nodes
     * with the same link labels aren't equivalent.
     */
    override def hashCode =
        linkMap.map{ case(childLabel, child) =>
            childLabel.hashCode ^ child.pointerHashCode
        }.foldLeft(label.hashCode)(_^_)

    /**
     * Override {@code equals} to use the same three factors as {@cod hachCode}:K
     * <ol>
     *  <li>The {@code label}</li>
     *  <li>The {@code label} of each child node</li>
     *  <li>The {@code pointer} of each child node</li>
     * </ol>
     * 
     * This ensures that nodes only equal when they have the same distinguishing meta data and point to the same children.
     */
    override def equals(that: Any) =
        that match {
            case other: PhraseNode => if (this.hashCode != other.hashCode) false
                                      else if (this.label != other.label) false
                                      else compareLinkMaps(this.linkMap, other.linkMap)
            case _ => false
        }

    /**
     * Returns true if the two maps have the same size, same keys, and the key in each map points to the same object.  We use this instead
     * of simply calling equals between the two maps because we want to check node equality using just the pointer hash code, which prevents
     * walking down the entire graph structure from each node.
     */
    def compareLinkMaps(lmap1: Map[String, PhraseNode], lmap2: Map[String, PhraseNode]) : Boolean = {
        if (lmap1.size != lmap2.size)
            return false
        for ( (key1, entry1) <- lmap1 ) {
            val matched = lmap2.get(key1) match {
                case Some(entry2) => entry2.pointerHashCode == entry1.pointerHashCode
                case None => false
            }
            if (!matched)
                return false
        }
        true
    }
}
{% endhighlight %}

This PhraseNode has three fairly simple data members, a label that records
which word the node represents, the weight of the node, and a map from this
node to it’s children based on their labels. The tricky part of this node is
how you determine equality. Two nodes can be equal in two different senses: 1)
they are the exact same data structure in memory, and so their memory locations
are the same or 2) they have the same label and point to the same exact
children in memory. Checking the first type of equality is easy, you can
compare the hash code of their addresses using the default hashCode method java
provides for every object. Checking the second form of equality is more
challenging to do efficiently. The naive way would be to recursively check that
all children eventually point to sub-graphs with the same structure. However,
checking the hash code of the pointers of each children is much faster and
accomplishes the same goal. Hence, this is why we override hashCode and equals
with such complicated code.

#### Linking together those Phrase Nodes

The algorithm for linking together PhraseNodes such that they form a minimal
transducer relies on a few interesting tricks and beautiful recursion. The
first trick we need is lexicographically sorted input. By sorting the input,
you’re maximizing the size of matching prefixes between any neighboring words
you want to put in the transducer. So let’s look at how we do that adding in
sorted order.

Before we get there though, let’s flesh sketch out a CondensedTrie data
structure. It’s pretty simple. It starts off with just having a single
PhraseNode element, the root.

{% highlight scala linenos %}
/**
 * The {@link CondensedTrie} represents a single phrase graph centered around a single key phrase.  Lists of tokens, representing sentences,
 * can be added to the {@link CondensedTrie} to create a minimal finite state automata which counts the number of times sequences of tokens
 * appear.  Lists must be added in fully sorted order, otherwise the behavior is undefined.  Once the {@link CondensedTrie} has been
 * completed, a sequence of tokens can be used to walk through the {@link CondensedTrie} and count the weight of that particular sequence.
 **/
class CondensedTrie() {

    /**
     * The root node in the {@link CondensedTrie}.  This always has an emtpy label.
     */
    val root = new PhraseNode("")

}
{% endhighlight %}

Now comes adding entries. Since we want a clean and easy to use interface,
we’ll be defensive and assume the elements aren’t sorted, but they are already
tokenized, so each element in the given list is a sequence of tokens. How you
sort thoes beasts is a homework assignment.

{% highlight scala linenos %}
/**
 * Trains the {@link CondensedTrie} on a list of token sequences.  This list does not have to be sorted and will instead be sorted
 * before any sentences are added.
 */
def train(tokenizedSentences: Seq[List[String]]) {
    for ( tokenizedSentence <- tokenizedSentences.sortWith(Util.tokenListComparator) )
        add(tokenizedSentence)
    if (root.linkMap.size != 0)
        replaceOrRegister(root)
}

/**
 * Adds the list of tokens to this {@link CondensedTrie}.
 */
def add(tweet: List[String]) {
    val (lastSharedNode, remainingSuffix) = computeDeepestCommonNodeAndSuffix(root, tweet)
    if (lastSharedNode.linkMap.size != 0)
        replaceOrRegister(lastSharedNode)
    addSuffix(lastSharedNode, remainingSuffix)
}

/**
 * Returns the deepest {@link PhraseNode} in the {@link CondensedTrie} matching the tokens in {@code tweet}.  When a {@link PhraseNode}
 * no longer has an arc matching the first element in {@code tweet}, this returns that {@link PhraseNode} and the remaining tokens in
 * {@code tweet} that cold not be matched.
 */
def computeDeepestCommonNodeAndSuffix(node: PhraseNode, tweet: List[String]) : (PhraseNode, List[String]) =
    tweet match {
        case head::tail => node.linkMap.get(head) match {
            case Some(child) => {
                child.addCount()
                computeDeepestCommonNodeAndSuffix(child, tail)
            }
            case None => (node, tweet)
        }
        case _ => (node, tweet)
    }

/**
 * Adds all tokens in {@code tweet} as a branch stemming from {@code node}
 */
def addSuffix(node: PhraseNode, tweet: List[String]) {
    tweet.foldLeft(node)( (n, t) => n.neighbor(t).addCount() )
}
{% endhighlight %}

These methods are mostly simple. addSuffix starts adding links to nodes
starting from some initial point, note that nodes will automatically create a
new node for a word if one doesn’t already exist.
computeDeepestCommonNodeAndSuffix walks down the Trie starting at the root
consuming each token that has a node and returns the deepest node reachable,
i.e. finds the node with the longest common prefix with a given sequence of
tokens. Finally adding a single tweet depends on getting the prefix, doing some
magic called replaceOrRegister and then adding the suffix to the last node in
the longest prefix. So, only question left, what is this registry business?

The registry keeps track of all nodes in the graph after they’ve been
validated. And what does validation entail? It involves checking wether or not
an existing node already exists in the registry. If one does, you simply
replace that duplicate node with the one in the registry. If no such node
exists, in goes the node. And this is exactly what replaceOrRegister does. To
do this efficiently and correctly, we call replaceOrRegister on the last node
in our comment prefix and walk all the way down along the most recently added
path, i.e. the added by the last element we added, and then zip up any matching
nodes which correspond to matching suffixes. By starting at the bottom, we
match together end points which have no children and merge them.

Take our archery example above, all three sentences end with “is legally
blind.” After we add the first sentence, there would be a node for each token
in the order of the sentence. When we add the second sentence and walk down to
the end, we see that “blind.” has a duplicate, which we can merge. Taking one
step backwards, we’ll see that “legally” also has an exact match, where two
nodes with the same label point to the same exact node, the node we just
merged. And then thanks to recursion, we keep zipping things along until we get
to “who”, which has no exact match, and we can stop zipping. Walking through an
example like this should make the code below a little clearer.

{% highlight scala linenos %}
/**
 * Recursively walks down the chain of last nodes added starting at {@code node} and then checks if the last child of that node are in the
 * registry.  If an equivalent {@link PhraseNode} matching the last child is in the registry, this replaces the last child with the
 * registry node.  If no matching {@link PhraseNode} exists in the registry, then the last child is added to the registry.
 **/
def replaceOrRegister(node: PhraseNode) {
    // Recursively replace or register the last added child of the current node.
    val child = node.lastAdded
    if (child.linkMap.size != 0)
        replaceOrRegister(child)

    // Get the possible matches for the last child.
    val candidateChildren = register.get(child.label)
    // Select only the registry node which has an exact match to the last
    // child.  We can also replace this equivalence check for a subsumption
    // check later on to condence the trie even more while breaking the
    // automata contract.
    candidateChildren.filter(matchMethod(_, child)) match {
        // If such a child exists, merge the counts of the last child to the
        // existing child and link the parent to the existing child.  This
        // is just a convenient way to match a list, which is what gets
        // returned by filter
        case existingChild :: tail =>
            existingChild.addCount(child.inCount)
            // Make sure to update the most recently added node with the
            // registry version!
            node.lastAdded = existingChild
            node.linkMap += (child.label -> existingChild)
        // If no chld exists, put the last child in the registery.
        case _ => register.put(child.label, child)
    }
}
{% endhighlight %}

And Voila, we now have all the code needed to make a phrase graph!

![Exact Phrase Graph](/academic-site/assets/img/example.exact.phrase-graph.svg)

### Tweaking the automata to condense more phrases

BUT! Suppose you want something more minimal? Suppose you think it’s kinda
funny that interjection of “who” prevents “guy SOMETHING OR NOTHING is” from
being a phrase. Or you try adding in the sentence

```
#archery ZOIDBERG by the Republic of Korea and the guy who is legally blind.
```

and notice how it creates an entirely new branch for “the Republic of Korea”
starting at “ZOIDBERG”, thus making the number of times you think you’ve seen
that phrase dependent on the previous tokens. Can we fix this? YES! All we have
to do is relax our definition of finding a matching element in the registry to
finding a node whose outgoing links are a superset of the most recently added
children.

And since Scala is awesome, we can do this with minimal effort.

{% highlight scala linenos %}
class CondensedTrie(useSubsumingMatches: Boolean = false) {
    /**
     * The filtering method for determining which candidate node from the register will replace existing children nodes during the
     * compaction phase.
     */
    val matchMethod = if (useSubsumingMatches) subsumeMatch _

    /**
     * Returns true if {@code child} and {@code candidate} are exact matches.
     */
    def exactMatch(candidate: PhraseNode, child: PhraseNode) =
        candidate == child

    /**
     * Returns true if {@code child} and {@code candidate} have the same label and the links from {@code child} are a subset of the links
     * from {@code candidate}.
     */
    def subsumeMatch(candidate: PhraseNode, child: PhraseNode) =
        if (candidate.label != child.label)
            false
        else
            child.linkMap.map{ case(key, subchild) =>
                candidate.linkMap.get(key) match {
                    case Some(otherSubchild) if otherSubchild.pointerHashCode == subchild.pointerHashCode => true
                    case _ => false
                }
            }.foldLeft(true)(_&&_)
{% endhighlight %}

All we had to do was update the contractor to take in a boolean, then create a new data member that links to one of two comparison functions for pairs of nodes: 1) an exact matching function, which we would use for a true compressed trie and 2) a subset matching function, to get our even more compressed sorta-trie. If we swap in subsumeMatch, we now get this phrase graph:

Let’s see how the two versions handle this as input:

```
Republic of Korea in archery by a guy who is legally blind
#archery by the Republic of Korea and by the guy is legally blind
#archery by the Republic of Korea and the guy is legally blind
#archery by the Republic of Korea in archery by a guy who is legally blind
#archery zoidberg by the Republic of Korea and by the guy is legally blind
#archery zoidberg by the Republic of Korea in archery by a guy who is legally blin
```

Using exact Matching: Using Exact Matching:

![Exact Matching](/academic-site/assets/img/test.exact.svg)

Using link subset Matching: 

![Subsume Matching](/academic-site/assets/img/test.subsume.svg)

Finally! This second version is precisely the data structure those three
original papers were describing.
