---
layout: single
comments: true
title: "Two Pointers I"
date: 2025-11-02 08:00:00-0400
categories: [LeetCode]
---

## Two Pointers I

---

### 1. [Move Zeroes](https://leetcode.com/problems/move-zeroes/)

**Mental Model:**  

The core idea is **compaction** — imagine sliding all non-zero elements to the left, preserving their order, and filling the rest with zeros.  
Two pointers achieve this efficiently:  
- `insertPos` — where the next non-zero should go.  
- `i` — current scanner.  

As we scan, we copy non-zeros to the front and fill the rest with zeros later.  
This pattern is known as the **"in-place stable partition"**.


**C++ Solution:**

```cpp
class Solution {
public:
    void moveZeroes(vector<int>& nums) {

        int insertPos = 0;

        for(int i = 0; i < nums.size(); i++) {
            if (nums[i] != 0) {
                nums[insertPos++] = nums[i];
            }
        }

        for (int i = insertPos; i < nums.size(); i++) {
            nums[i] = 0;
        }
        
    }
};
```

**Revision Tip:**

- When asked to “rearrange elements without extra space,” think compaction pattern: move valid elements forward, then fill the rest.
- Similar pattern: “remove element,” “sort colors,” and “partition array.”

---

### 2. [Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/)

**Mental Model:**

- Since the array is sorted, duplicates are consecutive.
- We can use **slow and fast pointers**:
    * i — explores new elements (fast).
    * insertPos — next unique element position (slow).

- Every time a new unique value appears, copy it to insertPos.
- Think of it as **“writing unique elements as you go”**.

**C++ solution**

```cpp
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        int insertPos = 0;

        int i = 0;
        int size = nums.size();

        while (i < size) {
            nums[insertPos++] = nums[i];
            
            int current = nums[i];

            while( i < size && nums[i] == current) {
                i++;
            }
        }

        return insertPos;
        
    }
};
```

**Revision Tip**

* For sorted arrays, duplicates are local — no need for maps or sets.
* The slow-fast pointer trick generalizes to “remove duplicates,” “compress sequences,” and “merge intervals.”
* If an operation says “modify array in place,” always look for a write pointer

----


### 3. [Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)


**Mental Model:**
- This is a **two-direction scan problem** — we check characters symmetrically from both ends.
- The challenge is handling noise (non-alphanumeric characters).
- Two pointers — one from start, one from end — move inward, skipping irrelevant chars and comparing meaningful ones.
- It’s a clean example of combining two-pointer traversal + conditional skipping.

**C++ Solution:**

```cpp
class Solution {
public:
    bool isPalindrome(string s) {
        int size = s.size();
        int i = 0;
        int j = size - 1;
        
        while (i < j) {
            while(i < j && !std::isalnum(s[i])) {
                i++;
            }

            while(i < j && !std::isalnum(s[j])) {
                j--;
            }

            if (std::tolower(s[i]) != std::tolower(s[j])) {
                return false;
            }

            i++;
            j--;
        }

        return true;
    }
};
```


**Revision Tip:**

- Use two pointers when you need mirrored comparisons.
- Common pattern for string and array validation problems.
- When you see “ignore certain characters,” think skip + compare inward.