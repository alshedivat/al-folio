---
layout: single
comments: true
title: "Sliding Window I"
date: 2025-11-02 08:00:00-0400
categories: [LeetCode]
---

## Sliding Window I

---

### 1. [Maximum Average Subarray I](https://leetcode.com/problems/maximum-average-subarray-i/)

**Mental Model:**  

The fixed-size sliding window is an evolution of two pointers when you know the window length (here, `k`).  
Instead of recalculating sums repeatedly, you maintain a **running sum** of the last `k` elements — add the new one, remove the oldest.  
This converts an O(n*k) brute force into O(n).

Think of it as **“window sum that slides forward by one step at a time.”**

**C++ Solution:**

```cpp
class Solution {
public:
    double findMaxAverage(vector<int>& nums, int k) {
        double maxSum = -1e9;
        double runningSum = 0;

        for (int i = 0; i < k; i++) { runningSum += nums[i]; }

        maxSum = runningSum;
        for (int i = k; i < nums.size(); i++) {    
            runningSum = runningSum - nums[i-k] + nums[i];
            maxSum = max(maxSum, runningSum);
        }

        return maxSum/k;
        
    }
};
```

**Revision Tip:**

* Use prefix + difference thinking: you only need to adjust what enters/leaves the window.
* Common for problems with “fixed-size subarray” or “average/sum over k elements.”
* If the window size is known and constant → think fixed window.


-----


### 2. [Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/description/)

**Mental Model:**

This is the variable-size window version.
We expand the window until we hit a duplicate, then shrink from the left until the substring is unique again.
A hash map tracks the last seen index of characters.

Think of it as a rubber band: stretch to include new characters, contract when invalid.

**C++ Solution:**

```cpp
class Solution {
public:
    int lengthOfLongestSubstring(string s) {

        int size = s.size();
        std::unordered_map<char, int> lastIndex;

        int longestSubString = 0;
        int front = 0;

        for (int end = 0; end < size; end++) {
            char ch = s[end];
            if (lastIndex.find(ch) != lastIndex.end()) {
                front = max(front, lastIndex[ch] + 1);
            }

            lastIndex[ch] = end;
            longestSubString = max(longestSubString, end - front + 1);
        }


        return longestSubString;
        
    }
};
```

**Revision Tip:**

* The window expands with i, shrinks by updating start.
* For string problems involving “unique” or “distinct” characters, use a map to track last seen positions.
* Think of sliding window as a dynamic region that grows or shrinks based on constraints.