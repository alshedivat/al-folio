---
layout: post
title:  Making Agglomerative Clustering Run in N^2 Time
date:   2012-03-16
description: Making clustering go vroom
tags: clustering
---

Let’s say you’re an amateur zoologist and you’ve got a bunch of data describing
[parliaments of owls](https://en.wikipedia.org/wiki/Owl), [gaggles of geese](https://en.wikipedia.org/wiki/Goose), [peeps of chickens](https://en.wikipedia.org/wiki/Chicken), and a [train of
jackdaws](https://en.wikipedia.org/wiki/Western_jackdaw) but you don’t really
know that you have these bird types. All you really have are descriptive
features describing each bird like feature type, beak type, conservation
status, feeding preferences, etc. Using just this data, you’d like to find out
how many bird species you have and how similar each group is to the others in a
nice graphical fashion like down below. How would you do it?

The classic solution to the problem would be to use [Hierarchical Agglomerative
Clustering](https://en.wikipedia.org/wiki/Hierarchical_clustering). In this case, Agglomerative Clustering would group together birds
that have similar features into hopefully distinct species of birds. And
there’s a lot of packages out there that kind of do this for you like [Weka](https://www.cs.waikato.ac.nz/ml/weka/),
[Scikit-Learn](https://scikit-learn.org/stable/), or plain old
[R](https://www.statmethods.net/advstats/cluster.html). However, you’ve got a
lot of birds to deal with and these standard packages are just taking way too
long. Why are they taking way too long? Because they’re doing agglomerative
clustering the slow ways.

So what do they slow ways look like? Well, pretty much all ways of doing
agglomerative clustering start by building an Affinity Matrix that simply
measures how similar two birds are to each other:

```scala
val m = Array.fill(numBirds, numBirds)(0)
for ((bird1, i) <- birds.zipWithIndex;
     (bird2, j) <- birds.zipWithIndex)
    m(i)(j) = similarityBetween(bird1, bird2)
```

This little snippet just compares each bird against all other birds and stores how “similar” they are to each other in terms of their descriptive features. What next? Well, you need another data structure to keep track of your bird groups. We’ll do this with just a map from group identifiers to sets of bird identifiers. And since this algorithm is named “agglomerative”, we gotta agglomerate things, so we’ll start by putting every bird in their own bird group:

```scala
    // First get each bird and it's id, then create a tuple holding the bird id
    // and a set with the bird as the only element.  Then turn this list of
    // tuples into a map.
    var groupMap = birds.zipWithIndex.map( birdIndex => (birdIndex._2, Set(birdIndex._1))).toMap
```

So that was simple. Now comes the complicated bits that either lead you to a
slow version, a fairly slow version, or a super slow version of agglomerative
clustering. Before we do either of these options, let’s make two
simplifications: let’s assume we just want the final groups that our bird show
up in and we know how many bird groups we want to find. Agglomerative
Clustering can give you not only this information, but a whole tree showing how
birds are linked together, but the book-keeping for doing this is tricky and
doesn’t really affect the issues we’re focusing on here. With that out of the
way, what does the super slow method look like?

```scala
while (groupMap.size > numClusters) {
    val groupSet = groupMap.toSet
    // Find the two most similar groups in our map.
    var bestSim = 0.0
    var bestGroups = (-1, -1)
    for (Array((id1, birds1), (id2, birds2)) <- groupSet.subsets(2).map(_.toArray)) {
        // Get the similarity between the two bird groups using the raw
        // values in m.
        val sim = groupSim(id1, birds1, id2, birds2, m)
        if (sim > bestSim) {
            bestSim = sim
            bestGroups = (id1, id2)
        }
    }

    // Now merge the two groups together into a new group
    val newGroup = groupMap(bestGroups._1) ++ groupMap(bestGroups._2)
    // Now remove the two groups from the map
    groupMap = groupMap - bestGroups._1
    groupMap = groupMap - bestGroups._2
    // Update the map to store the new group.  Since the old id's are
    // removed, we can just re-use one of them without any change.
    groupMap = groupMap ++ Map((bestGroups._1 -> newGroup))
}
```

That’s it! It’s super simple and super slow. Why is it so slow? Well, in
general, you’ll do the big while loop O(N) times, where N is your number of
birds. Then the next block of code compares each possible pairing of bird
groups. Since in general the number of groups is proportional to the number of
birds, this will be O(N^2) comparisons. Throw these two bits together and you
get a runtime of O(N3)! When you have 100,000 birds, that’s super slow.

So what can you do to hasten that up? Well, the main goal of the big loop
through pairs of groups is to find the most similar pair of bird groups, so an
obvious choice would be to create a priority queue, so let’s see how that
looks:

```scala
// Create a new priority queue that tracks the similarity of two groups and
// their id's
val groupQueue = new PriorityQueue[(double, int, int)]()
val groupSet = groupMap.toSet
for (Array((id1, birds1), (id2, birds2)) <- groupMap.subsets(2).map(_.toArray)) {
    // Get the similarity between the two bird groups using the raw
    // values in m.
    val sim = groupSim(id1, birds1, id2, birds2, m)
    groupQueue.enque((sim, id1, id2))
}

var nextId = groupMap.size
while (groupMap.size > numClusters) {
    var best = (0, -1, -1)
    do {
        best = p.dequeue
    } while (groupMap.contains(best._2) && groupMap.contains(best._3))

    // Now merge the two groups together into a new group
    val newGroup = groupMap(best._1) ++ groupMap(best._2)
    // Now remove the two groups from the map
    groupMap = groupMap - best._1
    groupMap = groupMap - best._2

    // Create a new id for this group.
    val newId = nextId

    // Next, add in the similarity between the new group and all existing
    // groups to the queue.
    for ( (id, group) <- groupMap )
        groupQueue.enqueue((groupSim(newId, newGroup, id, group, m),
                            newId, id))

    // Finally, update the map to store the new group.
    nextId += 1
    groupMap = groupMap ++ (newId-> newGroup)
}
```

Now this approach is definitely faster but it’s also horribly memory
inefficient. Even if you have an array based priority queue that doesn’t
allocate any extra memory for each entry other than the tuple being stored,
this approach has one major problem: after every merge step O(N) elements
immediately become invalidated. Since the two merged groups no longer exist,
any comparison between them and other groups is moot. However the priority
queue doesn’t easily permit removing them so they just float around. This is
precisely why lines 14-16 are in a do while loop that ensures the returned
groups exist. It’s highly likely that they wont. I think we can do better, both
in terms of speed and in terms of memory. So let’s blaze through a faster
method in couple of steps.

First, we need to change the setup of the algorithm. The previous two method
just depended on some simple data structures. This approach requires two
additional structures for bookkeeping: a way to track chains of nearest
neighbors and a way to track the set of clusters not already a part of the
chain.

```scala
// A mapping from cluster id's to their point sets.
val clusterMap = new HashMap[Int, HashSet[Int]]()

// A set of clusters to be considered for merging.
val remaining = new HashSet[Int]()

// Create a cluster for every data point and add it to the cluster map
// and to the examine set.
for (r <- 0 until adj.size) {
    remaining.add(r)
    clusterMap(r) = HashSet(r)
}

// Create a stack to represent the nearest neighbor.  The real source of
// matic
val chain = new Stack[(Double, Int)]()

// Add in a random node from remaining to start the neighbor chain.
initializeChain(chain, remaining);
```

The clusterMap structure replaces our birdMap but does the same thing, but the
remaining set and the chain stack hold the crux of this approach. Instead of
trying to find the best link between two clusters, we’re going to depend on
chains of nearest neighbors, so the first node in the chain could be anything,
but the second node is simply the nearest neighbor to the first node. To add
the third node, we find the nearest neighbor out of any nodes not in the chain.
We’ll keep doing this until two nodes in the chain represent reciprocal nearest
neighbors, that is two nodes that are most similar to each other, and no other
nodes in or outside of the chain. Upon finding these two nodes, we merge them,
immediately. Then we just repeat the process until we have the desired number
of clusters. In scala, this turns out to be pretty simple to do:

```scala
// Find the nearest neighbors and merge as soon as recursive nearest
// neighbors are found.
while (clusterMap.size > numClusters) {
    // Get the last link in the chain.
    val (parentSim, current) = chain.top

    // Find the nearest neighbor using the clusters not in the chain
    // already.
    val (linkSim, next) = findBest(remaining, adj, current)

    // Check the similarity for the best neighbor and compare it to that of
    // the current node in the chain.  If the neighbor sim is larger, then
    // the current node and it's parent aren't RNNs.  Otherwise, the current
    // node is RNNs with it's parent.
    if (linkSim > parentSim) {
        // The current node to push is more similar to the last node in the
        // chain, so the last node and the next to last nodes can't be
        // reciprocal nearest neighbors.
        chain.push((linkSim, next))
        remaining.remove(next)
    } else {
        // The current node is less similar to the last node than the last
        // node is to it's predecesor in the chain, so the last two nodes in
        // the chain are just the kind of nodes we're looking to merge.

        // Pop the current node from the top. 
        chain.pop
        // Pop the parent of the best node.
        val (_, parent) = chain.pop

        // These are the two nodes we'll be merging.  The node we
        // found above is left in the remaining set and is essentially
        // forgotten.

        // Remove the current and parent clusters from the cluster map
        // and extract the sizes.
        val (c1Points, c1Size) = removeCluster(clusterMap, current)
        val (c2Points, c2Size) = removeCluster(clusterMap, parent)
        val total = c1Size + c2Size

        // Update the similarity between the new merged cluster and all
        // other existing clusters.  
        for (key <- clusterMap.keys)
            adj(current)(key) = updatedSimilarity(
                adj, current, c1Size, parent, c2Size, key)

        // Replace the mapping from current to now point to the merged
        // cluster and add current back into the set of remaining
        // clusters so that it's compared to nodes in the chain.
        clusterMap(current) = c1Points ++ c2Points
        remaining.add(current)

        // If the chain is now empty, re-initialize it.
        if (chain.size == 0)
            initializeChain(chain, remaining)
    }
}
```

And that’s it! By focusing on reciprocal nearest neighbors, the algorithm
merges together clusters that will always be merged, no matter how you find
them. Furthermore, it’s remarkably easy and fast to find these nodes. By
building the chain, the number of things that can go on the chain gets smaller
and smaller.

Oh, but there’s one other magic trick to making this super fast, and it depends
on how you compute updateSimilarity. The silly way to do it would be to
traverse all the pairings between nodes in the new cluster and the each other
remaining cluster, but that in itself gets really slow as the clusters grow.
But rather than doing that, [these
folks](https://wires.onlinelibrary.wiley.com/doi/full/10.1002/widm.53) suggest
some recurrence relations that can be computed in constant time, for any of the
existing agglomerative criteria methods. Crazy right? But just crazy enough to
work correctly and be too fast to believe.
