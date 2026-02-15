---
layout: single
comments: true
title: "Strings and Hashmaps I"
date: 2025-11-02
categories: [LeetCode]
---

## Strings & Hashmaps I

---

### 1. [Valid Anagram](https://leetcode.com/problems/valid-anagram/)

**Mental Model:**  
Two strings are anagrams if they contain **exactly the same characters with the same frequency**.  
You don’t care about order — only counts.  
Hence, use a hashmap (or fixed array for alphabets) to count occurrences.

**Approach:**
- If lengths differ → return false.  
- Increment count for each character in `s`, decrement for `t`.  
- If all counts return to zero → they are anagrams.

**C++ Solution:**

```cpp
class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.size() != t.size()) return false;
        vector<int> freq(26, 0);

        for (int i = 0; i < s.size(); i++) {
            freq[s[i] - 'a']++;
            freq[t[i] - 'a']--;
        }

        for (int val : freq)
            if (val != 0) return false;

        return true;
    }
};
```

**Revision Tip:**

* "Same characters, different order" → count & compare.
* For limited alphabets, prefer array over map for performance.
* Increment for one string, decrement for the other — single pass O(n).

---

### 2. [Group Anagrams](https://leetcode.com/problems/group-anagrams/description/)

**Mental Model:**
We group strings that are anagrams of each other.
Two words belong together if their frequency signature is identical.

The key is to build a hashable key from each word’s letter count (or sorted characters).
Then group by this key.

Two possible keys:
* Sorted word (simpler)

* Character frequency vector (faster for large datasets)

**C++ Solution:**

```cpp
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> groups;

        for (auto& s : strs) {
            string key = s;
            sort(key.begin(), key.end());
            groups[key].push_back(s);
        }

        vector<vector<string>> result;
        for (auto& [k, v] : groups)
            result.push_back(v);

        return result;
    }
};
```


**Revision Tip:**

* "Group similar words" → map signature → vector of strings.
* Use sorted(word) as a quick signature.
* For optimization, use fixed-size frequency array turned into a string key.

----

### 3. [Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/description/)

**Mental Model:**
We need the longest substring that reads the same backward and forward.
This can’t be solved with a hashmap directly — but understanding symmetry and expansion is key.
For each center, expand outward while s[l] == s[r].

You expand around both:

* Single character (odd-length palindrome)
* Between two characters (even-length palindrome)


```cpp
class Solution {
public:
    string longestPalindrome(string s) {
        int start = 0, maxLen = 0;

        for (int i = 0; i < s.size(); i++) {
            auto expand = [&](int l, int r) {
                while (l >= 0 && r < s.size() && s[l] == s[r]) {
                    l--; r++;
                }
                return pair<int,int>{l+1, r-l-1};
            };

            auto [l1, len1] = expand(i, i);
            auto [l2, len2] = expand(i, i+1);

            if (len1 > maxLen) { start = l1; maxLen = len1; }
            if (len2 > maxLen) { start = l2; maxLen = len2; }
        }

        return s.substr(start, maxLen);
    }
};
```

**Revision Tip:**

* Palindrome center expansion is O(n²) but fast in practice.
* Remember to handle odd and even lengths separately.
* Expansion technique beats DP for simplicity and readbility.