---
layout: single
comments: true
title: "Two Pointers II (Advanced)"
date: 2025-11-02 09:00:00-0400
categories: [LeetCode]
---

## Two Pointers II (Advanced)

---

### 1. [3Sum](https://leetcode.com/problems/3sum/)

**Mental Model:**  

* This is an evolution of the **pair-sum** problem.  
* We fix one element (`nums[i]`) and use **two pointers** (`left`, `right`) to find pairs that complete the target `0 - nums[i]`.  
* The key trick is to **sort the array first** — so duplicates are adjacent and the search becomes ordered.

Flow:
1. Sort the array.  
2. Iterate through each element `i`.  
3. Use two pointers from both ends of the remaining array to find complement pairs.  
4. Skip duplicates carefully to avoid redundant triplets.

Think of it as:  
*  *Fix one → find two using “move inward” pointers.*

**C++ Solution:**

```cpp
class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> res;
        int n = nums.size();

        for (int i = 0; i < n; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue; // skip duplicates

            int left = i + 1, right = n - 1;
            int target = -nums[i];

            while (left < right) {
                int sum = nums[left] + nums[right];
                if (sum == target) {
                    res.push_back({nums[i], nums[left], nums[right]});
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    while (left < right && nums[right] == nums[right - 1]) right--;
                    left++; right--;
                } else if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return res;
    }
};
```


**Revision Tip:**

- Always sort first — it enables ordered pointer movement and easy duplicate handling.
- If you see a “find triplet/pair that sums to X” → think “fix one + two-pointer scan.”
- Two pointers here are guided by sum comparison, not just traversal.

---


### 2. [Container With Most Water](https://leetcode.com/problems/container-with-most-water/description/)

**Mental Model:**
- You have vertical lines on the x-axis. The area is defined by width * min(height[left], height[right]).
- The naive approach is O(n²), but the two-pointer approach optimizes it:
    - Start with two ends (left, right).
    - Compute the current area.
    - Move the pointer pointing to the shorter line, because the limiting height can only increase by moving that one.

This is a classic case of:
- “Shrink search space intelligently while maintaining the possibility of a larger area.”

```cpp
class Solution {
public:
    int maxArea(vector<int>& height) {
        int left = 0;
        int right = height.size() - 1;

        int maxArea = INT_MIN;

        while (left < right) {
            maxArea = max(maxArea, ((right - left) * min(height[left], height[right])));

            if (height[left] < height[right]) { left++; }
            else {right--; }
        }

        return maxArea;
    }
};
```

**Revision Tip:**
- The core pattern: move the limiting pointer.
- Think in terms of “what can increase the result next.”
- This idea generalizes to problems like “trap rain water,” “minimum window,” etc.