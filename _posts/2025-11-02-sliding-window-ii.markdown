---
layout: single
comments: true
title: "Sliding Window II"
date: 2025-11-02 09:00:00-0400
categories: [LeetCode]
---

## Sliding Window II

---

### 1. [Permutation in String](https://leetcode.com/problems/permutation-in-string/)

**Mental Model:**  
We need to check if any substring of `s2` is a **permutation of `s1`**.  
This means both substrings must have the **same frequency of characters**.

We use:
- Two frequency arrays (or maps) of size 26.
- A **fixed window** the size of `s1`.
- Slide the window one character at a time, updating frequencies.

Instead of re-counting the entire substring each time, maintain a running count — **add the new char, remove the old one**.  
If the frequency matches at any point, we found a permutation.

**C++ Solution:**

```cpp
class Solution {
public:
    bool checkInclusion(string s1, string s2) {

        if (s1.size() > s2.size()) {
            return false;
        }

        std::vector<int> targetFreq(26, 0), windowFreq(26, 0);

        for (int i = 0; i < s1.size(); i++) {
            targetFreq[s1[i] - 'a']++;
        }

        for (int i = 0; i < s1.size(); i++) {
            windowFreq[s2[i] - 'a']++;
        }

        if (windowFreq == targetFreq) {
            return true;
        }

        for (int i = s1.size(); i < s2.size(); i++) {
            windowFreq[s2[i] - 'a']++;
            windowFreq[s2[i- s1.size()] - 'a']--;

            if (windowFreq == targetFreq) {
                return true;
            }
        }

        return false;
    }
};
```

**Revision Tip:**
* Fixed window → update counts incrementally.
* When a problem says “find an anagram/permutation,” think frequency map comparison.
* For alphabets, `vector<int>(26)` is faster than `unordered_map`.

---


### 2. [Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/description/)

**Mental Model:**

* We need the smallest window in s that contains all characters of t (including duplicates).
* This is a variable-size sliding window problem where validity depends on count satisfaction.

Strategy:
1. Keep two maps — need (from t) and window (from current substring).
2. Expand the right pointer until the window is valid (all required characters included).
3. Then shrink from the left to minimize the window while it remains valid.

Think of it as:
*“Expand to make valid, shrink to make minimal.”*

**C++ Solution:**

```cpp
class Solution {
public:
    string minWindow(string s, string t) {
        std::unordered_map<char, int> targetFreq, windowFreq;

        int left = 0, right = 0;
        int minLeft = 0, minWindowLen = INT_MAX;

        for (int i = 0; i < t.size(); i++) {
            targetFreq[t[i]]++;
        }

        int required = targetFreq.size();
        int formed = 0;

        while (right < s.size()) {
            char ch = s[right];
            windowFreq[ch]++;

            if (targetFreq.find(ch) != targetFreq.end() && targetFreq[ch] == windowFreq[ch]) {
                formed++;
            }

            while(formed == required) {
                if (right - left + 1 < minWindowLen) {
                    minWindowLen = right - left + 1;
                    minLeft = left;
                }
                
                char leftChar = s[left];
                windowFreq[leftChar]--;

                if (targetFreq.find(leftChar) != targetFreq.end() && windowFreq[leftChar] < targetFreq[leftChar]) {
                    formed--;
                }

                left++;
            }   

            right++;
        }

        return (minWindowLen == INT_MAX) ? "" : s.substr(minLeft, minWindowLen);

    }
};
```

**Revision Tip:**

* For “minimum window” or “contain all characters” → expand until valid, shrink until invalid.
* Track how many characters match rather than all counts — this avoids O(26) comparisons per step.
* Recognize the valid window pattern: maintain counts, update conditionally.