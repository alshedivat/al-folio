---
layout: post
title: Data Structures and Algorithms
date: 2024-02-11 11:59:00-0400
description: Common Problems and How to Solve Them 
tags: comments
categories: algorithms data-structures coding
giscus_comments: true
related_posts: false
toc:
    sidebar: left
---

# Data structures

## Graphs

Graphs are data structures composed of a set of objects (*nodes*) and pairwise relationships between them (*edges*). Notably, edges can have properties, like a direction or a weight.

Graphs can be represented as:

- Adjacency matrices: matrices in which every row $$i$$ contains the edges of node $$i$$. Specifically, $$\text{row}_{ij}$$ is 1 if nodes $$i$$ and $$j$$ are connected, and 0 otherwise. They are symmetric for undirected graphs.
- Adjacency list: list of pairs, each of which represents an edge by describing the two involved node indexes. The node order can be meaningful (in directed graphs) or not (in undirected graphs).
- Hash map: keys are node ids, values are the set of nodes each is connected to. This is a very convenient representation.

A common type of graph in computer science are grids, in which nodes are laid in a grid, and they are connected to the nodes selected top, bottom, left and right.

## Binary trees

A tree is a graph in which there is only one path between every pair of nodes. Some concepts related to trees are: root, the (only) node on level 1; parent, the connected node in the level above; child, a connected in the level below; and leaf, a node with no children. Importantly, a tree has only one root. A very useful type of tree  are *binary* trees, in which every node has *at most* two children.

Often trees are represented using classes. Specifically, we would have an object `Node` like:

```python
class Node:
    def __init__(self, val=None):
        self.val = val
        self.left = None
        self.right = None
```

We would keep a reference to the root, and build a try by successively creating new nodes and assigning them to `.left` or `.right`.

### Heaps / priority queues

(Min-)Heaps are binary trees in which the value of every parent is lower or equal than any of its children. This gives them their most interesting property: the minimum element is always on top. (Similarly, in max-heaps, the maximum stands at the root.) Because of that, they are also called priority queues.

In Python, [`heapq`](https://docs.python.org/3/library/heapq.html) provides an implementation of the heap. Any populated list can be transformed in-place into a heap:

```python
import heapq

x = [5, 123, 8, 3, 2, 6, -5]

heapq.heapify(x)
```
```
[-5, 2, 5, 3, 123, 6, 8]
```

The elements have been reordered to represent a heap: each parent note is indexed by $$k$$, and its children by $$2k+1$$ and $$2k+2$$.

Let's see some common operations:

- Push a new element (and sift up):
    ```python
    heapq.heappush(x, -10)
    print(x)
    ```
    ```
    [-10, -5, 5, 2, 123, 6, 8, 3]
    ```

- Pop the root (and sift down):
    ```python
    heapq.heappop(x)
    ```
    ```
    -10
    ```

- Combine the two operations:

    - Push, then pop:
        ```python
        heapq.heappushpop(x, -7) # [-5, 2, 5, 3, 123, 6, 8]
        ```
        ```
        -7
        ```
    - Pop, then push:
        ```python
        heapq.heapreplace(x, -7) # [-7, 2, 5, 3, 123, 6, 8]
        ```
        ```
        -5
        ```

A famous algorithm that can be solved with heaps is [computing the running median of a data stream](https://leetcode.com/problems/find-median-from-data-stream/).

## Tries

Tries (from re*trie*val) are trees that store strings:

- Nodes represent characters, except for the root, represents the string start.
- Children represent each of the possible characters that can follow the parent.
- Leaf nodes represent the end of the string.
- Paths from the root to the leafs represent the different words.
 
Due to its nature, tries excel at two things:

1. Saving space when storing words sharing the same prefix, since they only store the prefix once.
1. Searching words, which can be done in $$O(\text{word length})$$. Similarly, they make it very fast to search for words with a given prefix.

These two properties make them excellent at handling spell checking and autocomplete functions.

## Union Find

Union-Finds, also known as Disjoint-Sets, store a collection of non-overlapping sets. Internally, sets are represented directed trees, in which every member point at the root of the tree. The root is just another member, which we call the **representative**. Union-Finds provide two key operations:

- **Find:** returns the set an element belongs to. Specifically, it returns its representative.
- **Union:** combines two sets. Specifically, first, it performs two finds. If the representatives differ, it will connect one tree's root to the root of the other.

Union-Finds can be represented as an array, in which every member of the universal set is one element. Members linked to a set take as value the index of another member of the set, often the root. Consequently, members that are the only members of a set take their own value. The same goes for the root. While this eliminates many meaningful pairwise relationship between the elements, it speeds up the two core operations.

A property of the set is its *rank*, i.e., an approximation of its depth. Union is performed *by rank*: the root with the highest rank is picked as the new root. Find performs an additional step, called *path compresion*, in which every member in the path to the root will be directly bound to the root. This increases the cost of that find operation, but keeps the tree shallow and the paths short, and hence speeds up subsequence find operations.

Here is a Python implementation:

```python
class UnionFind:
    def __init__(self, size):
        self.parent = [i for i in range(size)]
        self.rank = [0] * size

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # Path compression
        return self.parent[x]

    def union(self, x, y):
        rootX = self.find(x)
        rootY = self.find(y)
        if rootX != rootY:
            if self.rank[rootX] > self.rank[rootY]:
                self.parent[rootY] = rootX
            elif self.rank[rootX] < self.rank[rootY]:
                self.parent[rootX] = rootY
            else:
                self.parent[rootY] = rootX
                self.rank[rootX] += 1
```

If two elements belong to the same set, there is a cycle.

They are useful to detect cycles.

# Algorithms

## Divide and conquer problems

Divide and conquer algorithms work by breaking down a problem into *two or more* smaller subproblems of the same type. These subproblems are tackled recursively, until the subproblem is simple enough to have a trivial solution. Then, the solutions are combined in a bottom-up fashion. For examples in [sorting](#sorting-problems), see [merge sort](#merge-sort) and [quick sort](#quick-sort).

## Intervals and scheduling problems

The input of interval problems is a list of lists, each of which contains a pair `[start_i, end_i]` representing an interval. Typical questions revolve around how much they overlap with each other, or inserting and merging a new element.

**Note:** There are many corner cases, no intervals, intervals which end and start at the same time or intervals that englobe other intervals. Make sure to think it through.

**Note:** If the intervals are not sorted, the first step is *almost always* **sort them**, either by start or by end. This usually brings the time complexity to $$O(n \log n)$$. In some cases we need to perform two sorts, by start and end separately, before merging them. This produces the sequence of events that are happening.

## Sorting problems

Sorting consists on arranging the elements of an input array according to some criteria. There are multiple ways to sort an input, each offerintg different trade-offs:

- Memory usage: *in-place* approaches sort the items in place, without using extra space.
- Stability: stable algorithms preserve the original relative order when faced with two equal keys.
- Internal vs external: internal sorts operate exclusively on RAM memory; external sorts do it outside (e.g., disk or tape).
- Recursive vs non-recursive
- Comparison-based: comparison-based algorithms work by comparing pairs of items. All the algorithms I cover here fall under this category, but not all (e.g., [counting sort](https://en.wikipedia.org/wiki/Counting_sort)).

I implement a couple of those below. Their complexities are as follows:

| Algorithm | Time complexity | Space complexity |
|-----------|-----------------|------------------|
| Selection | $$O(n^2)$$      | $$O(1)$$         |
| Bubble    | $$O(n^2)$$      | $$O(1)$$         |
| Merge     | $$O(n \log n)$$ | $$O(n)$$         |
| Quicksort | $$O(n \log n)$$ (average) | $$O(\log n)$$    |

### Selection sort

```python
def selection_sort(x):

    for i in range(len(x)):
        curr_max, curr_max_idx = float("-inf"), None

        for j in range(len(x) - i):
            if x[j] > curr_max:
                curr_max = x[j]
                curr_max_idx = j

        x[~i], x[curr_max_idx] = x[curr_max_idx], x[~i]

    return x

bubble_sort([3,5,1,8,-1])
```

### Bubble sort

```python
def bubble_sort(x):
    for i in range(len(x) - 1):
        for j in range(i + 1, len(x)):
            if x[i] > x[j]:
                x[i], x[j] = x[j], x[i]
    return x

bubble_sort([3,5,1,8,-1])
```

### Merge sort

```python
def merge_sort(x):

    # base case
    if len(x) <= 1:
        return x

    # recursively sort the two halves
    mid = len(x) // 2
    sorted_left = merge_sort(x[:mid])
    sorted_right = merge_sort(x[mid:])

    # merge the two sorted halves
    i = j = 0
    merged = []

    while i < len(sorted_left) and j < len(sorted_right):
        if sorted_left[i] < sorted_right[j]:
            merged.append(sorted_left[i])
            i += 1
        else:
            merged.append(sorted_right[j])
            j += 1

    # since slicing forgives out of bounds starts
    # hence, this will work when i >= len(sorted_left)
    merged.extend(sorted_left[i:])
    merged.extend(sorted_right[j:])

    return merged


merge_sort([3,5,1,8,-1])
```

### Quick sort

```python
def quick_sort(x):

    if len(x) <= 1:
        return x

    pivot = x[-1] # preferrable to modifying the input with x.pop()
    lower = []
    higher = []

    # populate lower and higher in one loop,
    # instead of two list comprehensions
    for num in x[:-1]:
        if num <= pivot:
            lower.append(num)
        else:
            higher.append(num)

    return quick_sort(lower) + [pivot] + quick_sort(higher)

quick_sort([3,5,1,8,-1])
```

### Further reading

- [Sorting Out The Basics Behind Sorting Algorithms](https://medium.com/basecs/sorting-out-the-basics-behind-sorting-algorithms-b0a032873add)

## Search problems

### Linear search

TODO

### Binary search

TODO

## Tree problems

TODO

### Tree traversal

TODO

### Search and delete

TODO

### Insert

TODO

## Graph problems

The bread and butter of graph problems are traversal algorithms. Let's see them.

### Depth first traversal

In a depth-first traversal, given a starting node, we recursively visit each of its neighbors before moving to the next one. In a 2D grid, it would involve picking a direction, and continuing until we can't continue. Then we would pick another direction, and do the same. Essentially, the exploration path looks like a snake.

The data structure underlying DFT is a **stack**:

1. When we visit a node, we push all of its neighbors. Hence, each frame in the stack is a node to visit.
2. We pop from the stack to visit the next node. Then we add its neighbors to the stack and continue.
3. Once we can't go deeper, pop will retrieve the last, unvisited branching point.
4. Once the stack is empty, our job is done.

Let's see an explicit implementation of the stack:

```python
graph = {
    "a": {"b", "c"},
    "b": {"d"},
    "c": {"e"},
    "d": {"f"},
    "e": set(),
    "f": set(),
}

def depth_first_print(graph: dict[str, set[str]], seed: str) -> None:
    stack = [seed]

    while stack:
        curr_node = stack.pop()
        print(curr_node)
        stack.extend(graph[curr_node])

depth_first_print(graph, "a")
```
```
a
b
d
f
c
e
```

Alternatively, we can use a recursive approach and an implicit stack:

```python
def depth_first_print(graph: dict[str, set[str]], seed: str) -> None:
    print(seed)
    for neighbor in graph[seed]:
        depth_first_print(graph, neighbor)

depth_first_print(graph, "a")
```
```
a
c
e
b
d
f
```

For a graph with $$V$$ nodes and $$E$$ edges, the time complexity is $$O(V+E)$$ and the space complexity is $$O(V)$$.

**Note:** Watch out for *cycles*. Without explicing handling, we might get stuck in infinite traversals. We can keep track of which nodes we have visited using a set, and exit early as soon as we re-visit one.

**Note:** Some corner cases are the empty graph, graphs with one or two nodes, graphs with multiple components and graphs with cycles.

### Breadth first traversal

In a breadth-first traversal, given a starting node, we first visit its neighbors, then their neighbors, and so on.

In a 2D grid, it doesn't favour any direction. Instead, it looks like a water ripple.

The data structure underlying DFT is a **queue**:

1. When we visit a node, we push all of its neighbors to the queue. As in DFT, each item is a node to visit.
2. We popleft to get the next node. We push allof its neighbors.
3. As before, once the queue is empty, our job is done.

Let's see an implementation:

```python
graph = {
    "a": {"b", "c"},
    "b": {"d"},
    "c": {"e"},
    "d": {"f"},
    "e": set(),
    "f": set(),
}

from collections import deque

def breadth_first_print(graph: dict[str, set[str]], seed: str) -> None:
    queue = deque([seed])

    while queue:
        curr_node = queue.popleft()
        print(curr_node)
        queue.extend(graph[curr_node])

breadth_first_print(graph, "a")
```
```
a
b
c
d
e
f
```

For a graph with $$V$$ nodes and $$E$$ edges, the time complexity is $$O(V+E)$$ and the space complexity is $$O(V)$$.

### Topological sorting

TODO

### Union find

TODO

### Djikstra

TODO

### Min spanning tree

TODO

### Top sort

TODO

### Union find

TODO

## Binary tree problems

### Tree traversals

As for graph related problems, problems involving trees often require traversals, either [depth](#depth-first-traversal) or [breadth](#breadth-first-traversal) first. The same principles and data structures apply. For a tree with $$n$$ nodes, the time complexity is $$O(n)$$, and the time complexity is $$O(n)$$. If the tree is balanced, depth first has a space complexity of $$O(\log n)$$.

### Further resources

- [Graph Algorithms for Technical Interviews - Full Course](https://www.youtube.com/watch?v=tWVWeAqZ0WU)

## Two pointers

The two pointer approach can be used in problems involving searching, comparing and modifying elements in a sequence. A naive approach would involve two loops, and hence take $$O(n^2)$$ time. Instead, in the two pointer approach we have two pointers storing indexes, and, by moving them in a coordinate way, we can reduce the complexity down to $$O(n)$$. Generally speaking, the two pointers can either move in the same direction, or in opposite directions.

**Note:** Some two pointer problems require the sequence to be sorted to move the pointers efficiently. For instance, to find the two elements that produce a sum, having a sorted array is key to know which pointer to increase or decrease.

**Note:** Sometimes we need to iterate an $$m \times n$$ table. While we can use two pointers for that, we can to with a single pointer $$i \in [0, m \times n)$$: `row = i // n`, `col = i % n`.

#### Sliding window problems

Sliding window problems are a type of same direction pointer problems. They are optimization problems involving **contiguous** sequences (substrings, subarrays, etc.), particularly involving cumulative properties. The general approach consists on starting with two pointers, `st` and `ed` at the beginning of the sequence. We can keep track of the cumulative property and update it as the window expands or contracts. We keep increasing `st` until we find a window that meets our constraint. Then, we try to reduce it by increasing `st`, until it doesn't meet it anymore. Then, we go back to increasing `ed`, and so on.

## Permutation problems

Permutation problems can be tackled by [recursion](#recursion).

## Backtracking problems

Backtracking is a family of algorithms characterized by:

- The candidate solutions are built incrementally.
- The solutions have **constraints**, so not all candidates are valid. 

Since solutions are built incrementally, backtracting they can be visualized as **traversing a tree**. At each node, the algorithm checks if it will lead to a valid solution. If the answer is negative, it will *backtrack* to the parent node, and continue the process.

### A recipe for backtracking problems

As we will see in a few examples, the solution to a backtracking problem looks like this:

```python
def solve(candidate):

    if is_solution(candidate):
        output(candidate)
        return

    for child in get_children(candidate):
        if is_valid(child):
            place(child)
            solve(child)
            remove(child)
```

### Examples

#### The eight queens puzzle

A famous application of backtracking is solving the [eight queens puzzle](https://en.wikipedia.org/wiki/Eight_queens_puzzle):

> The eight queens puzzle is the problem of placing eight chess queens on an 8×8 chessboard so that no two queens threaten each other; thus, a solution requires that no two queens share the same row, column, or diagonal. There are 92 solutions.

I present here a solution, which mirrors the recipe presented above:

```python

board = []

def under_attack(row, col):
    for row_i, col_i in board:
        if row_i == row or col_i == col:
            return True
        
        # check the diagonals
        if abs(row_i - row) == abs(col_i - col):
            return True

    return False

def eight_queens(row=0, count=0):

    if row == 8:
        return count + 1

    for col in range(8):
        # check the constraints: the explored square 
        # is not under attack
        if not under_attack(row, col):
            board.append((row, col))
            # explore a (so-far) valid path
            count = eight_queens(row + 1, count)
            # backtrack!
            board.pop()

    return count

total_solutions = eight_queens()
print(f"Total solutions: {total_solutions}")
```
```
Total solutions: 92
```

#### Solving a sudoku

```python

from pprint import pprint

board = [[0, 0, 0, 1, 0, 0, 0, 0, 5],
         [0, 0, 0, 0, 0, 4, 0, 1, 0],
         [1, 0, 3, 0, 0, 8, 4, 2, 7],
         [0, 0, 1, 7, 4, 6, 0, 9, 0],
         [0, 0, 6, 0, 3, 2, 1, 0, 8],
         [0, 3, 2, 5, 8, 0, 6, 0, 4],
         [0, 0, 7, 8, 0, 0, 0, 4, 0],
         [0, 0, 5, 0, 2, 7, 9, 8, 0],
         [0, 0, 0, 4, 6, 0, 0, 0, 0]]


def is_valid(board, row, col, num):

    block_row, block_col = (row // 3) * 3, (col // 3) * 3

    for i in range(9):
        if board[row][i] == num:
            return False
        elif board[i][col] == num:
            return False
        if board[block_row + i // 3][block_col + i % 3] == num:
            return False
    
    return True


def solve(board):

    for row in range(9):
        for col in range(9):

            if board[row][col]:
                continue

            for num in range(1, 10):
                if is_valid(board, row, col, num):
                    board[row][col] = num
                    if solve(board):
                        return True
                    board[row][col] = 0
            
            return False
            
    return True

if solve(board):
    pprint(board)
else:
    print("No solution exists.")
```
```
[[2, 7, 4, 1, 9, 3, 8, 6, 5],
 [6, 5, 8, 2, 7, 4, 3, 1, 9],
 [1, 9, 3, 6, 5, 8, 4, 2, 7],
 [5, 8, 1, 7, 4, 6, 2, 9, 3],
 [7, 4, 6, 9, 3, 2, 1, 5, 8],
 [9, 3, 2, 5, 8, 1, 6, 7, 4],
 [3, 2, 7, 8, 1, 9, 5, 4, 6],
 [4, 6, 5, 3, 2, 7, 9, 8, 1],
 [8, 1, 9, 4, 6, 5, 7, 3, 2]]
```

## Dynamic programming

The hallmark of a dynamic programming problem are **overlapping subproblems**.

The key to the problem is identifying the *trivially* smallest input, the case for which the answer is trivially simple.

We have two strategies:
- Memoization
- Tabulation

Draw a strategy!!

### Recursion + memoization

#### Recursion

Recursion is a technique in to solve problems which in turn depend on solving smaller subproblems. It permeates many other methods, like [backtracking](#backtracking-problems), [merge sort](#merge-sort), [quick sort](#quick-sort), [binary search](#binary-search) or [tree traversal](#tree-traversal).

Recursive functions have two parts:

1. Definition of the **base case(s)**, the case(s) in which solving a problem is trivial, and a solution is provided, stopping the recursion.
1. Divide the problem into smaller subproblems, which are sent off to the recursive function.

The space complexity of recursion will be, at least, the length of the stack which accumulates all the function calls.

**Note:** CPython's recursion limit is 1,000. This can limit to the depth of the problems we can tackle.

#### Memoization

TODO

#### Recursion + memoization recipe

In DP, combining recursion and memoization is a powerful way to trade space complexity for time complexity. Specifically, since problems are overlapping, it is likely we are solving the same subproblems over and over, which can get expensive due to recursion. Caching them can greatly improve the speed of our algorithm.

Here is a recipe for solving these problems (from [here](https://www.youtube.com/watch?v=oBt53YbR9Kk)):

1. Visualize the problem as a tree
1. Implement the tree using recursion, in which the leaves are the base cases. This will produce the brute force solution.
1. Test it for a few simple cases.
1. Memoize it!
    1. Add a memo dictionary, which keeps getting passed in the recursive calls
    1. Add the base cases to the dictionary
    1. Store the return values into the memo
    1. Return the right value from memo

#### Computational complexity

The computational complexity will be impacted by two factors:

- `m`: the average length of the elements of the input. For instance, if the input is a list, `m = len(input)`; it it is an integer, it is `m = input`. This will impact the height of the tree.
- `n`: the length of the input. This will impact the branching factor. For instance, if the input is a list, `n = len(input)`.

**Brute force:** for every node, we have a `n` options. Usually, the time complexity of DP problems will be exponential, of $$O(n^m*k)$$, where $k$ is the complexity of a single recursive call. The memory complexity is the call stack, $$O(m)$$.

**Memoized:** memoization reduces the branching factor by storing previous results. In other words, it trades time complexity for space complexity; usually both become polynomial.

### Tabulation

TODO

#### Tabulation recipe

Taken from [here](https://www.youtube.com/watch?v=oBt53YbR9Kk):

1. Visualize the problem as a table. Specifically:
    1. Design the size of the table based on the inputs. Often the size of the table is one unit longer in each dimension than the respective inputs. That allows us to include the trivial case (usually in the first position), and nicely aligns our input with the last index.
    1. Pick the default value, usually based on what the output value should be.
    1. Infuse the trivial answer into the table, the case for which we immediately know the answer
1. Iterate through the table, filling the positions ahead based on the current position.
1. Retrieve the answer from the relevant position.

Some caveats:

1. Note that sometimes the trivial case might not have the solution we need to solve the algorithm. Watch out for such situations.

### Additional resources

These are some materials that helped me understand dynamic programming (the order matters!):

1. [A graphical introduction to dynamic programming](https://avikdas.com/2019/04/15/a-graphical-introduction-to-dynamic-programming.html)
1. [Dynamic Programming - Learn to Solve Algorithmic Problems & Coding Challenges](https://www.youtube.com/watch?v=oBt53YbR9Kk)
1. [Dynamic Programming is not Black Magic](https://qsantos.fr/2024/01/04/dynamic-programming-is-not-black-magic/)
1. [LeetCode: DP for Beginners](https://leetcode.com/discuss/study-guide/662866/DP-for-Beginners-Problems-or-Patterns-or-Sample-Solutions)

### Solved problems

```python
def how_sum(target: int, nums: list[int], memo: dict = {}) -> None | list[int]:
    if target == 0: return []
    if target < 0: return None
    if target in memo.keys(): return memo[target]
    for num in nums:
        solution = how_sum(target - num, nums, memo)
        if solution is not None:
            memo[target] = solution + [num]
            return memo[target]
    memo[target] = None
    return None

how_sum(300, [7, 14])
```

```python
def best_sum(target: int, nums: list[int], memo: dict = {}) -> None | list[int]:

    if target in memo: return memo[target]
    if target == 0: return []
    if target < 0: return None

    memo[target] = None
    length_best_solution = float("inf")

    for num in nums:
        solution = best_sum(target - num, nums, memo)

        if solution is not None and len(solution) < length_best_solution:
            memo[target] = solution + [num]
            length_best_solution = len(memo[target])
        
    return memo[target]

print(best_sum(7, [5, 3, 4, 7]))
print(best_sum(8, [1, 4, 5]))
print(best_sum(100, [1, 2, 5, 25]))
```

```python
def can_construct(target: str, dictionary: list, memo: dict = {}) -> bool:

    if target in memo: return memo[target]
    if not target: return True

    memo[target] = False

    for word in dictionary:
        if target.startswith(word):
            new_target = target.removeprefix(word)
            if can_construct(new_target, dictionary, memo):
                memo[target] = True
                break
            
    return memo[target]

print(can_construct("abcdef", ["ab", "abc", "cd", "def", "abcd"]))
print(can_construct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"]))
print(can_construct("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", ["e", "ee", "eee", "eeee", "eeeee", "eeeee"]))
```

```python
def count_construct(target: str, dictionary: list, memo: dict = {}) -> int:

    if target in memo: return memo[target]
    if not target: return 1

    memo[target] = 0

    for word in dictionary:
        if target.startswith(word):
            new_target = target.removeprefix(word)
            memo[target] += count_construct(new_target, dictionary, memo)

    return memo[target]

print(count_construct("abcdef", ["ab", "abc", "cd", "def", "abcd"]))
print(count_construct("purple", ["purp", "p", "ur", "le", "purpl"]))
print(count_construct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"]))
print(count_construct("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", ["e", "ee", "eee", "eeee", "eeeee", "eeeee"]))
```

```python
def all_construct(target: str, dictionary: list, memo: dict = {}) -> list[list[str]]:

    if target in memo: return memo[target]
    if not target: return [[]]

    memo[target] = []

    for word in dictionary:
        if target.startswith(word):
            new_target = target.removeprefix(word)
            constructs = all_construct(new_target, dictionary, memo)
            constructs = [[word] + c for c in constructs]
            memo[target].extend(constructs)

    return memo[target]

print(all_construct("abcdef", ["ab", "abc", "cd", "def", "abcd", "ef", "c"]))
print(all_construct("purple", ["purp", "p", "ur", "le", "purpl"]))
print(all_construct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"]))
print(all_construct("eeeeeeeeeeeeeeeeeeeeef", ["e", "ee", "eee", "eeee", "eeeee", "eeeee"]))
```

```python
def fib_t(n: int) -> int:
    
    table = [0] * (n + 2)
    table[1] = 1

    for i in range(n):
        table[i + 1] += table[i]
        table[i + 2] += table[i]

    return table[n]

print(fib_t(6))
print(fib_t(50))

```python
def grid_traveler(m: int, n: int) -> int:

    grid = [[0] * (n + 1) for _ in range(m + 1)]
    grid[1][1] = 1

    for i in range(m + 1):
        for j in range(n + 1):
            if (i + 1) <= m:
                grid[i + 1][j] += grid[i][j]
            if (j + 1) <= n:
                grid[i][j + 1] += grid[i][j]

    return grid[m][n]

print(grid_traveler(1, 1))
print(grid_traveler(2, 3))
print(grid_traveler(3, 2))
print(grid_traveler(3, 3))
print(grid_traveler(18, 18))
```

```python
def can_sum_t(target: int, nums: list) -> bool:
    """
    Complexity:
        - Time: O(m*n)
        - Space: O(m)
    """
    
    grid = [False] * (target + 1)
    grid[0] = True

    for i in range(len(grid)):
        if not grid[i]:
            continue
        
        for num in nums:
            if (i + num) <= len(grid):
                grid[i + num] = True

    return grid[target]

print(can_sum_t(7, [2 ,3])) # True
print(can_sum_t(7, [5, 3, 4])) # True
print(can_sum_t(7, [2 ,4])) # False
print(can_sum_t(8, [2, 3, 5])) # True
print(can_sum_t(300, [7, 14])) # False
```

```python
def how_sum_t(target: int, nums: list[int]) -> None | list[int]:
    """
    Complexity:
        - Time: O(m*n^2)
        - Space: O(m*n)
    """
    grid = [None] * (target + 1)
    grid[0] = []
    
    for i in range(len(grid)):
        if grid[i] is None:
            continue

        for num in nums:
            if (i + num) < len(grid):
                grid[i + num] = grid[i].copy()
                grid[i + num].append(num)

    return grid[target]


print(how_sum_t(7, [2 ,3])) # [2, 2, 3]
print(how_sum_t(7, [5, 3, 4, 7])) # [3, 4]
print(how_sum_t(7, [2 ,4])) # None
print(how_sum_t(8, [2, 3, 5])) # [2, 2, 2, 2]
print(how_sum_t(300, [7, 14])) # None
```

```python
def best_sum_t(target: int, nums: list[int], memo: dict = {}) -> None | list[int]:
    """
    Complexity:
        - Time: O(m*n^2)
        - Space: O(m^2)
    """

    grid = [None] * (target + 1)
    grid[0] = []

    for i in range(len(grid)):
        if grid[i] is None:
            continue

        for num in nums:
            if (i + num) < len(grid):
                if grid[i + num] is None or len(grid[i + num]) > len(grid[i]):
                    grid[i + num] = grid[i].copy()
                    grid[i + num].append(num)

    return grid[target]

print(best_sum_t(7, [2 ,3])) # [2, 2, 3]
print(best_sum_t(7, [5, 3, 4, 7])) # [7]
print(best_sum_t(7, [2 ,4])) # None
print(best_sum_t(8, [2, 3, 5])) # [5, 3]
print(best_sum_t(300, [7, 14])) # None
```

```python
def can_construct_t(target: str, words: list[str]) -> bool:
    """
    Complexity:
        - Time: O(m^2*n)
        - Space: O(m)
    """

    grid = [False] * (len(target) + 1)
    grid[0] = True

    for i in range(len(grid)):

        if not grid[i]:
            continue

        prefix = target[:i]
        for word in words:
            if (i + len(word)) >= len(grid):
                continue

            if target.startswith(prefix + word):
                grid[i + len(word)] = True

    return grid[len(target)]

print(can_construct_t("abcdef", ["ab", "abc", "cd", "def", "abcd"])) # True
print(can_construct_t("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"])) # False
print(can_construct_t("enterapotentpot", ["a", "p", "ent", "enter", "ot", "o", "t"])) # True
print(can_construct_t("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", ["e", "ee", "eee", "eeee", "eeeee", "eeeee"])) # False
```

```python
def count_construct_t(target: str, words: list[str]) -> int:
    """
    Complexity:
        - Time: O(m^2*n)
        - Space: O(m)
    """
    grid = [0] * (len(target) + 1)
    grid[0] = 1

    for i in range(len(grid)):
        if not grid[i]:
            continue

        for word in words:
            if (i + len(word)) >= len(grid):
                continue

            prefix = target[:i]

            if target.startswith(prefix + word):
                grid[i + len(word)] += grid[i]

    return grid[len(target)]

print(count_construct_t("abcdef", ["ab", "abc", "cd", "def", "abcd"])) # 1
print(count_construct_t("purple", ["purp", "p", "ur", "le", "purpl"])) # 2
print(count_construct_t("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"])) # 0
print(count_construct_t("enterapotentpot", ["a", "p", "ent", "enter", "ot", "o", "t"])) # 4
print(count_construct_t("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", ["e", "ee", "eee", "eeee", "eeeee", "eeeee"])) # 0
```

```python
from copy import deepcopy

def all_construct_t(target: str, words: list[str]) -> list[list[str]]:
    """
    Complexity:
        - Time: O(n^m)
        - Memory: O(n^m)
    """

    grid = [[] for _ in range(len(target) + 1)]
    grid[0] = [[]]

    for i in range(len(grid)):

        if not grid[i]:
            continue

        for word in words:
            if (i + len(word)) > len(grid):
                continue

            prefix = target[:i]

            if target.startswith(prefix + word):
                new_constructs = deepcopy(grid[i])
                for x in new_constructs:
                    x.append(word)
                
                if grid[i + len(word)]:
                    grid[i + len(word)].extend(new_constructs)
                else:
                    grid[i + len(word)] = new_constructs
                    

    return grid[len(target)]

print(all_construct_t("abcdef", ["ab", "abc", "cd", "def", "abcd", "ef", "c"])) # [['ab', 'cd', 'ef'], ['ab', 'c', 'def'], ['abc', 'def'], ['abcd', 'ef']]
print(all_construct_t("purple", ["purp", "p", "ur", "le", "purpl"])) # [['purp', 'le'], ['p', 'ur', 'p', 'le']]
print(all_construct_t("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"])) # []
print(all_construct_t("enterapotentpot", ["a", "p", "ent", "enter", "ot", "o", "t"])) # # [['enter', 'a', 'p', 'ot', 'ent', 'p', 'ot'], ['enter', 'a', 'p', 'ot', 'ent', 'p', 'o', 't'], ['enter', 'a', 'p', 'o', 't', 'ent', 'p', 'ot'], ['enter', 'a', 'p', 'o', 't', 'ent', 'p', 'o', 't']]
```

# How to solve a problem

Stakeholders will sometimes come to us with problems, and we might need to produce a good algorithmic solution pretty quickly; say 45-60 minutes. This is a template on how to tackle these situations.

## 1. Problem statement

If our stakeholder is prepared, they might come with a written down problem statement. They might share it with us ahead of our meeting or right at the start. 

1. Make sure you understand the problem: 
    1. Paraphrase the problem back to them.
    1. If examples (input-output pairs) are provided, walk through one of them.
    1. Otherwise, generate a few examples and infer the expected output.
1. Ask clarifying questions:
    1. About the input:
        - What are its data types? Is it sorted? Do we know the range of the integers? (Can they be negative?) A batch of a stream? Et cetera.
        - Expected input size: if they know it, might give an idea of the complexity we should aim for. For inputs of size 1 to 100, $$O(n^2)$$ is acceptable; for larger inputs, we should do better.
    1. About the edge cases: empty input, invalid, etc.
    1. Ask about the specific runtime our solution will need. That will be very useful to screen out solutions and algorithms.
1. If possible, draw, or at least visualize the problem.

## 2. Brainstorming

While it can be tempting to implement a solution right away, it is worth spending some time drafting the problem. After all, our stakeholder might have given it some thought already, and could be able to point us in the right direction.

1. Try to match this problem to the problems you have seen. Regarding data structures:
    - Hash maps: if we need fast lookups
    - Graphs: if we are working with associated entities
    - Stacks and queues: if the input has a nested quality
    - Heaps: if we need to perform scheduling/orderings based on a priority
    - Trees and tries: if we need efficient lookup and storage of strings
    - Linked lists: if we require fast insertions and deletions, especially when order matters
    - Union-finds: if we're investigating the if sets are connected or cycles exist in a graph
    Regarding algorithms, there are some recurring ones:
    - Depth-first search
    - Binary Search
    - Sorting Algorithms
1. Don't be shy! Let your stakeholder hear out your thought process. They will surely appreciate knowing whats on your mind, and be able to chip in. Specially, if they do say something, **listen**. They are the subject matter experts after all!
1. Once you seem to have converged to a specific approach, state the main parts of the algorithm and make sure they understand and agree.
    - We might want to start with a suboptimal solution, as long as we let them know that we know that! Once we have that working, we can identify the main bottlenecks and go back to the drawing board.

## 3. Implementation

During the implementation phase, it might help to go from the big picture to the small picture. Start by defining the global flow of the program, calling unimplemented functions with clear names. This will allow you to make sure your proposal make sense before getting entangled in the specifics.

In order to allow our stakeholder follow our logic, it is important that they can follow along:

- Make sure our stakeholder is ok with us using additional dependencies. They might prefer to keep the algorithm lean!
- Explain why you are making each decision. 
- If you realize your solution might not work, let them know. You might need to go back to brainstorming.
- Stick to the language conventions. For instance, in PEP8:
    - Functions are separated by two lines
- Keep your code clean: avoid duplicate code, use helper functions, keep function and variable names understandable.
- Time is limited, so you might want to cut corners, e.g., comments or function typing. However, let your stakeholder know!

Once you have a working solution, revisit it:

- Scan the code for mistakes. For instance, when working with arrays, index errors are common.
- Compute the complexity of your code. This might hint at what could be improved. It might also highlight tradeoffs.
- Identify redundant work
- Identify overlapping and repeated computations. The algorithm might be sped up by memoization.

## 4. Testing and debugging

Once our solution is ready, it might be a good idea to give it a go. Simply call your function on a few examples. Consider:

- "Normal" inputs
- Trivial inputs
- Edge inputs
- Invalid inputs

If some examples fail, we need to debug our code. Throw in a few print statements, predict what you expect to see, and go for it.

## 5. Follow-ups

After successfully presenting a solution, our stakeholder might have some follow-up questions:

- About our solution:
    - Time and space complexity? Usually, we should consider the worst case complexity, but if the amortized case is significantly better you should point it out.
    - Specific questions about the choice of algorithm, data structure, loops, etc.
    - What are possible optimizations?
        - While abstracting specific aspects into functions is helpful, it might also be less efficient (e.g., if we have to iterate the input multiple times instead of one).
        - Identify repeated computations.
    - Consider non-technical constraints, such as development time, maintainability, or extensibility.
- Identify the best theoretical time complexity. This involves considering what is the minimum number of operations involved. For instance if we need to visit every element, probably $$O(n)$$ is optimal.

**Note:** some algorithms have some implicit and potentially unexpected behaviors. `Ctrl + F` "Note:" in order to find some of them.

## Further reading

- ["Blind 75" problem set](https://www.teamblind.com/post/New-Year-Gift---Curated-List-of-Top-75-LeetCode-Questions-to-Save-Your-Time-OaM1orEU)
- [Code templates](https://leetcode.com/explore/interview/card/cheatsheets/720/resources/4723/)
- [Top techniques to approach and solve coding interview questions](https://www.techinterviewhandbook.org/coding-interview-techniques/)
- [What kind of problem do I have?](https://sebinsua.com/algorithmic-bathwater#what-kind-of-problem-do-i-have)