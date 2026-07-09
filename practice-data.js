// Question bank: Python + SQL, basics -> real interview questions
// Each question: id, cat (python/sql), phase (basics/interview), difficulty, title, prompt, solution, explain
// Python questions additionally carry: setup (optional fixture code) + test (expression to evaluate & compare)
// SQL questions additionally carry: schema (CREATE TABLE + INSERT statements) + optional verifyQuery
//   (used instead of `solution` to read back state after a mutating query like DELETE)
// `day` is assigned programmatically below so the schedule always fits Jul 8 - Aug 8.

const pythonBasics = [
  {id:'pyb1', cat:'python', difficulty:'Easy', title:'Reverse a string',
   prompt:`Write a function reverse_str(s) that returns the string reversed, without using s[::-1].`,
   solution:`def reverse_str(s):
    result = ""
    for ch in s:
        result = ch + result
    return result`,
   test:`reverse_str("hello")`,
   explain:`Slicing is the idiomatic one-liner, but interviewers often ask you to do it manually to check loop logic.`},
  {id:'pyb2', cat:'python', difficulty:'Easy', title:'Check palindrome',
   prompt:`Write is_palindrome(s) that returns True if s reads the same forwards and backwards (case-insensitive).`,
   solution:`def is_palindrome(s):
    s = s.lower()
    return s == s[::-1]`,
   test:`is_palindrome("Racecar")`,
   explain:`Normalize case first. Follow-up: ignore non-alphanumeric chars (see interview version later).`},
  {id:'pyb3', cat:'python', difficulty:'Easy', title:'FizzBuzz',
   prompt:`Write fizzbuzz(n) that returns a list of strings for 1..n. Multiples of 3 -> "Fizz", multiples of 5 -> "Buzz", multiples of both -> "FizzBuzz", else the number as a string.`,
   solution:`def fizzbuzz(n):
    out = []
    for i in range(1, n+1):
        if i % 15 == 0: out.append("FizzBuzz")
        elif i % 3 == 0: out.append("Fizz")
        elif i % 5 == 0: out.append("Buzz")
        else: out.append(str(i))
    return out`,
   test:`fizzbuzz(15)`,
   explain:`Check the combined condition (15) first, otherwise Fizz/Buzz will fire before FizzBuzz can.`},
  {id:'pyb4', cat:'python', difficulty:'Easy', title:'Find max without max()',
   prompt:`Write find_max(nums) that returns the largest number in a non-empty list without using max().`,
   solution:`def find_max(nums):
    best = nums[0]
    for n in nums[1:]:
        if n > best:
            best = n
    return best`,
   test:`find_max([3,7,2,9,4])`,
   explain:`Classic "implement the builtin yourself" warm-up question.`},
  {id:'pyb5', cat:'python', difficulty:'Easy', title:'Count vowels',
   prompt:`Write count_vowels(s) that returns how many vowels (a,e,i,o,u, case-insensitive) are in s.`,
   solution:`def count_vowels(s):
    return sum(1 for ch in s.lower() if ch in "aeiou")`,
   test:`count_vowels("Hello World")`,
   explain:`Generator expression inside sum() is a common Pythonic pattern worth being fluent in.`},
  {id:'pyb6', cat:'python', difficulty:'Easy', title:'Remove duplicates, keep order',
   prompt:`Write dedupe(lst) that removes duplicates from a list while preserving the original order.`,
   solution:`def dedupe(lst):
    seen = set()
    result = []
    for x in lst:
        if x not in seen:
            seen.add(x)
            result.append(x)
    return result`,
   test:`dedupe([1,2,2,3,1,4])`,
   explain:`set(lst) removes dupes but loses order — this seen-set pattern shows up constantly in interviews.`},
  {id:'pyb7', cat:'python', difficulty:'Easy', title:'Sum of digits',
   prompt:`Write digit_sum(n) that returns the sum of the digits of a positive integer n.`,
   solution:`def digit_sum(n):
    total = 0
    while n > 0:
        total += n % 10
        n //= 10
    return total`,
   test:`digit_sum(12345)`,
   explain:`The %10 / //10 combo is the standard way to peel off digits without converting to a string.`},
  {id:'pyb8', cat:'python', difficulty:'Easy', title:'Check prime',
   prompt:`Write is_prime(n) that returns True if n is a prime number.`,
   solution:`def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(n**0.5)+1):
        if n % i == 0:
            return False
    return True`,
   test:`[is_prime(n) for n in [2,3,4,17,18]]`,
   explain:`Only check divisors up to sqrt(n) — a very common efficiency follow-up question.`},
  {id:'pyb9', cat:'python', difficulty:'Easy', title:'Fibonacci sequence',
   prompt:`Write fib(n) that returns a list of the first n Fibonacci numbers, starting 0, 1, 1, 2, 3...`,
   solution:`def fib(n):
    seq = [0, 1]
    while len(seq) < n:
        seq.append(seq[-1] + seq[-2])
    return seq[:n]`,
   test:`fib(7)`,
   explain:`Recursive fib is elegant but O(2^n) — mention memoization/DP if asked to optimize.`},
  {id:'pyb10', cat:'python', difficulty:'Easy', title:'Merge two dictionaries',
   prompt:`Write merge_dicts(a, b) that merges two dicts; keys in b overwrite keys in a.`,
   solution:`def merge_dicts(a, b):
    return {**a, **b}`,
   test:`merge_dicts({"x":1,"y":2}, {"y":3,"z":4})`,
   explain:`Python 3.9+ also supports a | b. Know both since interviewers may ask for the older syntax.`},
  {id:'pyb11', cat:'python', difficulty:'Easy', title:'Word frequency counter',
   prompt:`Write word_freq(sentence) that returns a dict mapping each word (lowercased) to its count.`,
   solution:`from collections import Counter
def word_freq(sentence):
    return dict(Counter(sentence.lower().split()))`,
   test:`word_freq("the cat sat on the mat")`,
   explain:`Counter is the go-to tool for frequency problems — expect it to reappear in real interview questions.`},
  {id:'pyb12', cat:'python', difficulty:'Easy', title:'Squares of even numbers',
   prompt:`Using a list comprehension, write even_squares(nums) returning the squares of all even numbers in nums.`,
   solution:`def even_squares(nums):
    return [n*n for n in nums if n % 2 == 0]`,
   test:`even_squares([1,2,3,4,5,6])`,
   explain:`List comprehensions with a filter clause are extremely common in Python interviews.`},
  {id:'pyb13', cat:'python', difficulty:'Easy', title:'Swap two variables',
   prompt:`Given a = 5, b = 9, swap their values without using a temporary variable, so that a becomes 9 and b becomes 5.`,
   solution:`a, b = 5, 9
a, b = b, a`,
   test:`(a, b)`,
   explain:`Python tuple unpacking makes this trivial — know why other languages need a temp variable.`},
  {id:'pyb14', cat:'python', difficulty:'Easy', title:'Flatten a nested list (one level)',
   prompt:`Write flatten(lst) that flattens a list of lists by one level, e.g. [[1,2],[3],[4,5]] -> [1,2,3,4,5].`,
   solution:`def flatten(lst):
    result = []
    for sub in lst:
        result.extend(sub)
    return result`,
   test:`flatten([[1,2],[3],[4,5]])`,
   explain:`extend() vs append() is a common point of confusion — extend adds elements, append adds the whole sublist.`},
  {id:'pyb15', cat:'python', difficulty:'Easy', title:'Title case each word',
   prompt:`Write title_case(s) that capitalizes the first letter of every word in a sentence, without using str.title().`,
   solution:`def title_case(s):
    return " ".join(w[0].upper() + w[1:] if w else w for w in s.split())`,
   test:`title_case("hello world from python")`,
   explain:`str.title() breaks on apostrophes (e.g. "don't" -> "Don'T"), so knowing the manual version matters.`},
];

const pythonInterview = [
  {id:'pyi1', cat:'python', difficulty:'Easy', title:'Two Sum',
   prompt:`Given a list of integers nums and a target, return the indices of the two numbers that add up to target. Assume exactly one solution.
Example: nums=[2,7,11,15], target=9 -> [0,1]`,
   solution:`def two_sum(nums, target):
    seen = {}
    for i, n in enumerate(nums):
        complement = target - n
        if complement in seen:
            return [seen[complement], i]
        seen[n] = i`,
   test:`two_sum([2,7,11,15], 9)`,
   explain:`Hash map gives O(n) instead of the brute-force O(n^2) double loop — the single most-asked interview question.`},
  {id:'pyi2', cat:'python', difficulty:'Easy', title:'Valid Anagram',
   prompt:`Given two strings s and t, return True if t is an anagram of s.
Example: s="anagram", t="nagaram" -> True`,
   solution:`from collections import Counter
def is_anagram(s, t):
    return Counter(s) == Counter(t)`,
   test:`is_anagram("anagram", "nagaram")`,
   explain:`Counter comparison handles this in one line; alternative is sorting both strings and comparing.`},
  {id:'pyi3', cat:'python', difficulty:'Easy', title:'Contains Duplicate',
   prompt:`Given a list nums, return True if any value appears at least twice.`,
   solution:`def contains_duplicate(nums):
    return len(nums) != len(set(nums))`,
   test:`contains_duplicate([1,2,3,1])`,
   explain:`Comparing lengths after converting to a set is O(n) and very idiomatic.`},
  {id:'pyi4', cat:'python', difficulty:'Easy', title:'Best Time to Buy and Sell Stock',
   prompt:`Given daily prices, return the max profit from buying then selling once (buy before sell).
Example: [7,1,5,3,6,4] -> 5 (buy at 1, sell at 6)`,
   solution:`def max_profit(prices):
    min_price = float("inf")
    best = 0
    for p in prices:
        min_price = min(min_price, p)
        best = max(best, p - min_price)
    return best`,
   test:`max_profit([7,1,5,3,6,4])`,
   explain:`Track the minimum price seen so far in a single pass — O(n) time, O(1) space.`},
  {id:'pyi5', cat:'python', difficulty:'Medium', title:'Group Anagrams',
   prompt:`Group a list of strings into anagram groups.
Example: ["eat","tea","tan","ate","nat","bat"] -> [["eat","tea","ate"],["tan","nat"],["bat"]]`,
   solution:`from collections import defaultdict
def group_anagrams(strs):
    groups = defaultdict(list)
    for s in strs:
        key = "".join(sorted(s))
        groups[key].append(s)
    return sorted([sorted(g) for g in groups.values()])`,
   test:`group_anagrams(["eat","tea","tan","ate","nat","bat"])`,
   explain:`Sorted string as a dict key is the standard trick — anagrams always sort to the same key. (Solution here sorts the output too, just to make grading order-independent — your own answer can return groups in any order.)`},
  {id:'pyi6', cat:'python', difficulty:'Easy', title:'Pandas: GroupBy + Agg',
   prompt:`DataFrame df with columns [department, salary].
Using pandas, compute the average and max salary per department. Assign the result to a variable called "result".`,
   setup:`import pandas as pd
df = pd.DataFrame({"department":["Eng","Eng","Sales"],"salary":[100,200,50]})`,
   solution:`result = df.groupby("department")["salary"].agg(["mean", "max"]).reset_index()`,
   test:`result.to_dict("records")`,
   explain:`groupby().agg([...]) is the pandas equivalent of SQL GROUP BY with multiple aggregate functions — the single most-used pandas pattern in DA interviews.`},
  {id:'pyi7', cat:'python', difficulty:'Medium', title:'Pandas: Merge Two DataFrames',
   prompt:`DataFrames orders[order_id, customer_id, amount] and customers[customer_id, name, region] are provided.
Join them to show name, region, and amount for every order, keeping orders even if the customer is missing. Assign to "result".`,
   setup:`import pandas as pd
orders = pd.DataFrame({"order_id":[1,2],"customer_id":[1,3],"amount":[10,20]})
customers = pd.DataFrame({"customer_id":[1,2],"name":["A","B"],"region":["East","West"]})`,
   solution:`result = orders.merge(customers, on="customer_id", how="left")`,
   test:`result.fillna("NA").to_dict("records")`,
   explain:`pandas .merge() maps directly onto SQL JOIN semantics: how="left"/"right"/"inner"/"outer" mirrors the SQL join types.`},
  {id:'pyi8', cat:'python', difficulty:'Medium', title:'Longest Substring Without Repeating Characters',
   prompt:`Given a string s, find the length of the longest substring without repeating characters.
Example: "abcabcbb" -> 3 ("abc")`,
   solution:`def length_of_longest_substring(s):
    seen = {}
    left = 0
    best = 0
    for right, ch in enumerate(s):
        if ch in seen and seen[ch] >= left:
            left = seen[ch] + 1
        seen[ch] = right
        best = max(best, right - left + 1)
    return best`,
   test:`length_of_longest_substring("abcabcbb")`,
   explain:`Sliding window with a hash map of last-seen index is the standard O(n) solution.`},
  {id:'pyi9', cat:'python', difficulty:'Medium', title:'Top K Frequent Elements',
   prompt:`Given nums and k, return the k most frequent elements (sorted ascending for grading).
Example: nums=[1,1,1,2,2,3], k=2 -> [1,2]`,
   solution:`from collections import Counter
def top_k_frequent(nums, k):
    return sorted([item for item, _ in Counter(nums).most_common(k)])`,
   test:`top_k_frequent([1,1,1,2,2,3], 2)`,
   explain:`Counter.most_common(k) does the heavy lifting; know the manual heap-based O(n log k) version as a follow-up.`},
  {id:'pyi10', cat:'python', difficulty:'Medium', title:'Product of Array Except Self',
   prompt:`Given nums, return an array where output[i] = product of all elements except nums[i], without using division.
Example: [1,2,3,4] -> [24,12,8,6]`,
   solution:`def product_except_self(nums):
    n = len(nums)
    result = [1] * n
    left = 1
    for i in range(n):
        result[i] = left
        left *= nums[i]
    right = 1
    for i in range(n-1, -1, -1):
        result[i] *= right
        right *= nums[i]
    return result`,
   test:`product_except_self([1,2,3,4])`,
   explain:`Two passes: prefix products left-to-right, then multiply in suffix products right-to-left. O(n), no division.`},
  {id:'pyi11', cat:'python', difficulty:'Easy', title:'Move Zeroes',
   prompt:`Given nums, move all zeroes to the end while keeping the relative order of non-zero elements, in-place, and return nums.
Example: [0,1,0,3,12] -> [1,3,12,0,0]`,
   solution:`def move_zeroes(nums):
    pos = 0
    for i in range(len(nums)):
        if nums[i] != 0:
            nums[pos], nums[i] = nums[i], nums[pos]
            pos += 1
    return nums`,
   test:`move_zeroes([0,1,0,3,12])`,
   explain:`Two-pointer in-place swap — a common "modify array without extra space" pattern.`},
  {id:'pyi12', cat:'python', difficulty:'Easy', title:'Valid Palindrome (ignore non-alnum)',
   prompt:`Given a string, return True if it is a palindrome considering only alphanumeric characters and ignoring case.
Example: "A man, a plan, a canal: Panama" -> True`,
   solution:`def is_palindrome(s):
    cleaned = [c.lower() for c in s if c.isalnum()]
    return cleaned == cleaned[::-1]`,
   test:`is_palindrome("A man, a plan, a canal: Panama")`,
   explain:`Filter first with isalnum(), then compare to its reverse — cleaner than a two-pointer scan for most interviews.`},
  {id:'pyi13', cat:'python', difficulty:'Easy', title:'Longest Common Prefix',
   prompt:`Given a list of strings, find the longest common prefix among all of them.
Example: ["flower","flow","flight"] -> "fl"`,
   solution:`def longest_common_prefix(strs):
    if not strs:
        return ""
    prefix = strs[0]
    for s in strs[1:]:
        while not s.startswith(prefix):
            prefix = prefix[:-1]
    return prefix`,
   test:`longest_common_prefix(["flower","flow","flight"])`,
   explain:`Shrink the prefix one character at a time until every string starts with it.`},
  {id:'pyi14', cat:'python', difficulty:'Medium', title:'Pandas: Pivot Table',
   prompt:`DataFrame sales[product, quarter, amount] where quarter is 'Q1'..'Q4'.
Build a pivot table with one row per product and one column per quarter, values summed. Assign to "result".`,
   setup:`import pandas as pd
sales = pd.DataFrame({"product":["W","W","G"],"quarter":["Q1","Q2","Q1"],"amount":[100,150,200]})`,
   solution:`result = sales.pivot_table(index="product", columns="quarter", values="amount", aggfunc="sum", fill_value=0)`,
   test:`result.to_dict()`,
   explain:`pivot_table is the pandas equivalent of the SQL CASE-WHEN-inside-SUM pivot trick — fill_value=0 avoids NaNs for missing combinations.`},
  {id:'pyi15', cat:'python', difficulty:'Easy', title:'Missing Number',
   prompt:`Given nums containing n distinct numbers from 0 to n, find the one missing number.
Example: [3,0,1] -> 2`,
   solution:`def missing_number(nums):
    n = len(nums)
    return n * (n + 1) // 2 - sum(nums)`,
   test:`missing_number([3,0,1])`,
   explain:`Gauss sum formula for 0..n minus actual sum gives the missing value in O(n) time, O(1) space.`},
  {id:'pyi16', cat:'python', difficulty:'Easy', title:'Majority Element',
   prompt:`Given nums, return the element that appears more than n/2 times. Assume it always exists.
Example: [2,2,1,1,1,2,2] -> 2`,
   solution:`def majority_element(nums):
    count = 0
    candidate = None
    for n in nums:
        if count == 0:
            candidate = n
        count += 1 if n == candidate else -1
    return candidate`,
   test:`majority_element([2,2,1,1,1,2,2])`,
   explain:`Boyer-Moore voting algorithm — O(1) space, a favorite follow-up after the Counter().most_common(1) answer.`},
  {id:'pyi17', cat:'python', difficulty:'Easy', title:'Pandas: Handling Missing Values',
   prompt:`DataFrame df has a column "revenue" with some NaN values and a column "customer_id".
Fill missing revenue with the column's median, then drop any remaining rows that still have NaN in "customer_id".`,
   setup:`import pandas as pd
import numpy as np
df = pd.DataFrame({"revenue":[10.0, np.nan, 30.0], "customer_id":[1, 2, np.nan]})`,
   solution:`df["revenue"] = df["revenue"].fillna(df["revenue"].median())
df = df.dropna(subset=["customer_id"])`,
   test:`df.to_dict("records")`,
   explain:`fillna vs dropna is a constant real-world decision — median is more robust to outliers than mean for skewed revenue data.`},
  {id:'pyi18', cat:'python', difficulty:'Easy', title:'Intersection of Two Arrays',
   prompt:`Given two arrays, return their intersection (unique elements present in both), sorted ascending for grading.
Example: [1,2,2,1], [2,2] -> [2]`,
   solution:`def intersection(nums1, nums2):
    return sorted(set(nums1) & set(nums2))`,
   test:`intersection([1,2,2,1], [2,2])`,
   explain:`Set intersection with & is O(n+m) — mention the sorted two-pointer alternative if arrays are huge.`},
  {id:'pyi19', cat:'python', difficulty:'Easy', title:'First Unique Character',
   prompt:`Given a string s, return the index of the first non-repeating character, or -1 if none exists.
Example: "leetcode" -> 0`,
   solution:`from collections import Counter
def first_uniq_char(s):
    counts = Counter(s)
    for i, ch in enumerate(s):
        if counts[ch] == 1:
            return i
    return -1`,
   test:`first_uniq_char("leetcode")`,
   explain:`Count everything first, then scan in order — two passes but both O(n).`},
  {id:'pyi20', cat:'python', difficulty:'Medium', title:'Pandas: Apply / Lambda Transform',
   prompt:`DataFrame df has a column "email".
Create a new column "domain" containing everything after the "@" in each email, using apply.`,
   setup:`import pandas as pd
df = pd.DataFrame({"email":["a@gmail.com","b@yahoo.com"]})`,
   solution:`df["domain"] = df["email"].apply(lambda x: x.split("@")[1])`,
   test:`df.to_dict("records")`,
   explain:`apply(lambda) is the general-purpose escape hatch when a vectorized .str method doesn't exist yet — but for this exact case df["email"].str.split("@").str[1] is faster and more idiomatic.`},
  {id:'pyi21', cat:'python', difficulty:'Easy', title:'Merge Two Sorted Lists (as arrays)',
   prompt:`Merge two sorted lists into one sorted list.
Example: [1,2,4], [1,3,4] -> [1,1,2,3,4,4]`,
   solution:`def merge_sorted(a, b):
    i = j = 0
    result = []
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            result.append(a[i]); i += 1
        else:
            result.append(b[j]); j += 1
    result.extend(a[i:])
    result.extend(b[j:])
    return result`,
   test:`merge_sorted([1,2,4], [1,3,4])`,
   explain:`This is the merge step of merge sort — worth knowing cold since it underlies many other problems.`},
  {id:'pyi22', cat:'python', difficulty:'Medium', title:"Maximum Subarray (Kadane's)",
   prompt:`Find the contiguous subarray with the largest sum and return that sum.
Example: [-2,1,-3,4,-1,2,1,-5,4] -> 6 ([4,-1,2,1])`,
   solution:`def max_subarray(nums):
    best = cur = nums[0]
    for n in nums[1:]:
        cur = max(n, cur + n)
        best = max(best, cur)
    return best`,
   test:`max_subarray([-2,1,-3,4,-1,2,1,-5,4])`,
   explain:`Kadane's algorithm: at each step decide whether to extend the current run or start fresh. O(n).`},
  {id:'pyi23', cat:'python', difficulty:'Easy', title:'Find All Duplicates in an Array',
   prompt:`Given nums where 1 <= nums[i] <= n, find all elements that appear twice, sorted ascending for grading.
Example: [4,3,2,7,8,2,3,1] -> [2,3]`,
   solution:`from collections import Counter
def find_duplicates(nums):
    return sorted([n for n, c in Counter(nums).items() if c == 2])`,
   test:`find_duplicates([4,3,2,7,8,2,3,1])`,
   explain:`Counter-based solution is O(n) time and space; the in-place sign-flipping trick is an O(1)-space follow-up.`},
  {id:'pyi24', cat:'python', difficulty:'Easy', title:'Single Number (XOR)',
   prompt:`Given a list where every element appears twice except one, find that single one, in O(1) space.
Example: [4,1,2,1,2] -> 4`,
   solution:`def single_number(nums):
    result = 0
    for n in nums:
        result ^= n
    return result`,
   test:`single_number([4,1,2,1,2])`,
   explain:`XOR of a number with itself is 0, and XOR is commutative — pairs cancel out, leaving the lone value.`},
  {id:'pyi25', cat:'python', difficulty:'Medium', title:'Pandas: String Filtering with .str',
   prompt:`DataFrame df has a column "email".
Find all rows where the email domain is "gmail.com", case-insensitive, without using apply/lambda. Assign to "result".`,
   setup:`import pandas as pd
df = pd.DataFrame({"email":["A@GMAIL.com","b@yahoo.com","c@gmail.com"]})`,
   solution:`result = df[df["email"].str.lower().str.endswith("@gmail.com")]`,
   test:`result.to_dict("records")`,
   explain:`Vectorized .str accessor methods (contains, startswith, endswith, extract) run in C under the hood and are much faster than .apply(lambda) on large data.`},
  {id:'pyi26', cat:'python', difficulty:'Easy', title:'Roman to Integer',
   prompt:`Convert a Roman numeral string to an integer.
Example: "LVIII" -> 58`,
   solution:`def roman_to_int(s):
    vals = {"I":1,"V":5,"X":10,"L":50,"C":100,"D":500,"M":1000}
    total = 0
    for i, ch in enumerate(s):
        v = vals[ch]
        if i+1 < len(s) and v < vals[s[i+1]]:
            total -= v
        else:
            total += v
    return total`,
   test:`roman_to_int("LVIII")`,
   explain:`Subtract when a smaller numeral precedes a larger one (like IV = 4), otherwise add.`},
  {id:'pyi27', cat:'python', difficulty:'Medium', title:'Sort Characters By Frequency',
   prompt:`Given a string, sort its characters by decreasing frequency.
Example: "tree" -> "eert" or "eetr"`,
   solution:`from collections import Counter
def frequency_sort(s):
    counts = Counter(s)
    return "".join(ch * n for ch, n in counts.most_common())`,
   test:`frequency_sort("tree")`,
   explain:`Counter.most_common() already returns items sorted by frequency descending.`},
  {id:'pyi28', cat:'python', difficulty:'Medium', title:'Pandas: Datetime Resampling',
   prompt:`DataFrame df has columns [order_date, amount], order_date is datetime.
Compute total amount per month. Assign to "result".`,
   setup:`import pandas as pd
df = pd.DataFrame({"order_date": pd.to_datetime(["2026-01-05","2026-01-20","2026-02-10"]), "amount":[10,20,30]})`,
   solution:`df = df.set_index("order_date")
result = df["amount"].resample("M").sum()`,
   test:`result.reset_index().assign(order_date=lambda d: d["order_date"].astype(str)).to_dict("records")`,
   explain:`.resample() buckets a datetime-indexed Series into calendar periods — the pandas equivalent of SQL DATE_TRUNC + GROUP BY.`},
  {id:'pyi29', cat:'python', difficulty:'Medium', title:'Pandas: Top N Rows Per Group',
   prompt:`DataFrame df has columns [department, name, salary].
Return the top 2 highest-paid employees within each department (the pandas analogue of the SQL "Department Top Salaries" question). Assign to "result".`,
   setup:`import pandas as pd
df = pd.DataFrame({"department":["Eng","Eng","Eng","Sales"],"name":["A","B","C","D"],"salary":[100,300,200,50]})`,
   solution:`result = (
    df.sort_values("salary", ascending=False)
      .groupby("department")
      .head(2)
)`,
   test:`sorted(result.to_dict("records"), key=lambda r: (r["department"], r["name"]))`,
   explain:`sort first, then groupby().head(n) — the pandas idiom for "top N per group," equivalent to ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...) <= N in SQL.`},
  {id:'pyi30', cat:'python', difficulty:'Easy', title:'Pandas: Drop Duplicates Keeping Latest',
   prompt:`DataFrame df has columns [user_id, event, updated_at] with possible duplicate user_id rows from repeated syncs.
Keep only the most recent row per user_id. Assign to "result".`,
   setup:`import pandas as pd
df = pd.DataFrame({"user_id":[1,1,2],"event":["x","y","z"],"updated_at":["2026-01-01","2026-01-02","2026-01-01"]})`,
   solution:`result = (
    df.sort_values("updated_at")
      .drop_duplicates(subset="user_id", keep="last")
)`,
   test:`sorted(result.to_dict("records"), key=lambda r: r["user_id"])`,
   explain:`sort_values + drop_duplicates(keep="last") is the standard pandas way to collapse duplicate/late-arriving records to the newest version — a routine ETL cleanup step.`},
];

// --- Data Engineering classics (appended to the existing pools) ---
pythonInterview.push(
  {id:'pyde1', cat:'python', difficulty:'Medium', title:'Deduplicate Records by Latest Timestamp',
   prompt:`Given a list of dicts like {"id": 1, "value": "a", "updated_at": "2026-01-01"}, some ids repeat with different updated_at.
Return one record per id — the one with the latest updated_at, sorted by id for grading. (Plain Python, no pandas.)`,
   solution:`def dedupe_latest(records):
    latest = {}
    for r in records:
        rid = r["id"]
        if rid not in latest or r["updated_at"] > latest[rid]["updated_at"]:
            latest[rid] = r
    return sorted(latest.values(), key=lambda r: r["id"])`,
   test:`dedupe_latest([{"id":1,"value":"a","updated_at":"2026-01-01"},{"id":1,"value":"b","updated_at":"2026-01-02"},{"id":2,"value":"c","updated_at":"2026-01-01"}])`,
   explain:`This exact pattern (keep the newest version per key) shows up constantly in ETL jobs merging incremental data loads — string-formatted ISO dates compare correctly with plain > .`},
  {id:'pyde2', cat:'python', difficulty:'Easy', title:'Batch/Chunk an Iterable',
   prompt:`Write chunk(lst, size) that yields successive chunks of a list, each of length at most size.
Example: chunk([1,2,3,4,5], 2) -> [1,2], [3,4], [5]`,
   solution:`def chunk(lst, size):
    for i in range(0, len(lst), size):
        yield lst[i:i+size]`,
   test:`list(chunk([1,2,3,4,5], 2))`,
   explain:`Batching is used everywhere in data pipelines — paginating API calls, bulk-inserting rows, or capping memory use when processing large files.`},
  {id:'pyde3', cat:'python', difficulty:'Medium', title:'Flatten a Nested JSON Record',
   prompt:`Given a nested dict like {"id": 1, "user": {"name": "Li", "address": {"city": "SF"}}}, flatten it into {"id": 1, "user.name": "Li", "user.address.city": "SF"} for loading into a flat table.`,
   solution:`def flatten(d, parent_key=""):
    items = {}
    for k, v in d.items():
        new_key = f"{parent_key}.{k}" if parent_key else k
        if isinstance(v, dict):
            items.update(flatten(v, new_key))
        else:
            items[new_key] = v
    return items`,
   test:`flatten({"id": 1, "user": {"name": "Li", "address": {"city": "SF"}}})`,
   explain:`Recursively flattening nested JSON/dict structures into dot-notation keys is a routine step before loading semi-structured API/log data into a relational table.`},
  {id:'pyde4', cat:'python', difficulty:'Medium', title:'Merge Overlapping Event Windows',
   prompt:`Given a list of [start, end] time windows representing when a sensor/event was active, merge all overlapping windows into the minimal set of non-overlapping windows.
Example: [[1,3],[2,6],[8,10]] -> [[1,6],[8,10]]`,
   solution:`def merge_windows(windows):
    windows.sort(key=lambda w: w[0])
    merged = [windows[0]]
    for start, end in windows[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged`,
   test:`merge_windows([[1,3],[2,6],[8,10]])`,
   explain:`Sort by start time, then a single linear pass — this exact logic underlies session-stitching (turning raw event timestamps into user sessions), a common data engineering task.`},
  {id:'pyde5', cat:'python', difficulty:'Easy', title:'Validate and Clean a Raw Row',
   prompt:`Given a raw dict row like {"id": "7", "amount": "12.5", "email": " A@B.com "} from a messy CSV, write clean_row(row) that: casts id to int, amount to float, strips/lowercases email. Return None if id or amount can't be parsed.`,
   solution:`def clean_row(row):
    try:
        return {
            "id": int(row["id"]),
            "amount": float(row["amount"]),
            "email": row["email"].strip().lower(),
        }
    except (ValueError, KeyError):
        return None`,
   test:`clean_row({"id": "7", "amount": "12.5", "email": " A@B.com "})`,
   explain:`Wrapping type coercion in try/except and returning None (to be filtered out later) is the standard "quarantine bad rows, don't crash the pipeline" pattern.`},
);

const sqlBasics = [
  {id:'sqb1', cat:'sql', difficulty:'Easy', title:'SELECT all columns',
   prompt:`Table employees(id, name, department, salary).
Write a query to select all columns and all rows.`,
   schema:[
     `CREATE TABLE employees(id INT, name TEXT, department TEXT, salary INT)`,
     `INSERT INTO employees VALUES (1,'Alice','Sales',60000),(2,'Bob','Eng',90000),(3,'Cara','Eng',75000)`,
   ],
   solution:`SELECT * FROM employees;`,
   explain:`* is fine for exploring data, but in production code prefer listing explicit columns.`},
  {id:'sqb2', cat:'sql', difficulty:'Easy', title:'WHERE filter',
   prompt:`Table employees(id, name, department, salary).
Select the names of employees earning more than 70000.`,
   schema:[
     `CREATE TABLE employees(id INT, name TEXT, department TEXT, salary INT)`,
     `INSERT INTO employees VALUES (1,'Alice','Sales',60000),(2,'Bob','Eng',90000),(3,'Cara','Eng',75000)`,
   ],
   solution:`SELECT name FROM employees WHERE salary > 70000;`,
   explain:`WHERE filters rows before any grouping/aggregation happens.`},
  {id:'sqb3', cat:'sql', difficulty:'Easy', title:'ORDER BY',
   prompt:`Table employees(id, name, department, salary).
List all employees ordered by salary descending.`,
   schema:[
     `CREATE TABLE employees(id INT, name TEXT, department TEXT, salary INT)`,
     `INSERT INTO employees VALUES (1,'Alice','Sales',60000),(2,'Bob','Eng',90000),(3,'Cara','Eng',75000)`,
   ],
   solution:`SELECT * FROM employees ORDER BY salary DESC;`,
   explain:`Default sort order is ASC; DESC must be explicit.`},
  {id:'sqb4', cat:'sql', difficulty:'Easy', title:'LIMIT / Top N',
   prompt:`Table employees(id, name, department, salary).
Return the 3 highest-paid employees.`,
   schema:[
     `CREATE TABLE employees(id INT, name TEXT, department TEXT, salary INT)`,
     `INSERT INTO employees VALUES (1,'Alice','Sales',60000),(2,'Bob','Eng',90000),(3,'Cara','Eng',75000),(4,'Dan','Sales',82000)`,
   ],
   solution:`SELECT * FROM employees ORDER BY salary DESC LIMIT 3;`,
   explain:`LIMIT after ORDER BY is the standard "top N" pattern (TOP N in SQL Server, ROWNUM in Oracle).`},
  {id:'sqb5', cat:'sql', difficulty:'Easy', title:'DISTINCT',
   prompt:`Table employees(id, name, department, salary).
List all unique department names.`,
   schema:[
     `CREATE TABLE employees(id INT, name TEXT, department TEXT, salary INT)`,
     `INSERT INTO employees VALUES (1,'Alice','Sales',60000),(2,'Bob','Eng',90000),(3,'Cara','Eng',75000)`,
   ],
   solution:`SELECT DISTINCT department FROM employees;`,
   explain:`DISTINCT removes duplicate rows from the result set, applied after SELECT column evaluation.`},
  {id:'sqb6', cat:'sql', difficulty:'Easy', title:'Basic aggregates',
   prompt:`Table employees(id, name, department, salary).
Find the total number of employees, and the average salary.`,
   schema:[
     `CREATE TABLE employees(id INT, name TEXT, department TEXT, salary INT)`,
     `INSERT INTO employees VALUES (1,'Alice','Sales',60000),(2,'Bob','Eng',90000),(3,'Cara','Eng',75000)`,
   ],
   solution:`SELECT COUNT(*) AS total_employees, AVG(salary) AS avg_salary FROM employees;`,
   explain:`COUNT(*) counts rows; COUNT(col) counts non-null values in that column — the distinction matters.`},
  {id:'sqb7', cat:'sql', difficulty:'Easy', title:'GROUP BY',
   prompt:`Table employees(id, name, department, salary).
Find the average salary per department.`,
   schema:[
     `CREATE TABLE employees(id INT, name TEXT, department TEXT, salary INT)`,
     `INSERT INTO employees VALUES (1,'Alice','Sales',60000),(2,'Bob','Eng',90000),(3,'Cara','Eng',75000)`,
   ],
   solution:`SELECT department, AVG(salary) AS avg_salary
FROM employees
GROUP BY department;`,
   explain:`Every non-aggregated column in SELECT must appear in GROUP BY.`},
  {id:'sqb8', cat:'sql', difficulty:'Easy', title:'HAVING',
   prompt:`Table employees(id, name, department, salary).
Find departments with more than 1 employee.`,
   schema:[
     `CREATE TABLE employees(id INT, name TEXT, department TEXT, salary INT)`,
     `INSERT INTO employees VALUES (1,'A','Sales',1),(2,'B','Sales',2),(3,'C','Eng',3)`,
   ],
   solution:`SELECT department, COUNT(*) AS cnt
FROM employees
GROUP BY department
HAVING COUNT(*) > 1;`,
   explain:`WHERE filters rows before grouping; HAVING filters groups after aggregation.`},
  {id:'sqb9', cat:'sql', difficulty:'Easy', title:'INNER JOIN',
   prompt:`Tables employees(id, name, dept_id) and departments(id, dept_name).
List each employee's name with their department name.`,
   schema:[
     `CREATE TABLE employees(id INT, name TEXT, dept_id INT)`,
     `CREATE TABLE departments(id INT, dept_name TEXT)`,
     `INSERT INTO employees VALUES (1,'Alice',10),(2,'Bob',20)`,
     `INSERT INTO departments VALUES (10,'Sales'),(20,'Eng')`,
   ],
   solution:`SELECT e.name, d.dept_name
FROM employees e
JOIN departments d ON e.dept_id = d.id;`,
   explain:`INNER JOIN only returns rows that have a match in both tables.`},
  {id:'sqb10', cat:'sql', difficulty:'Easy', title:'LEFT JOIN',
   prompt:`Tables employees(id, name, dept_id) and departments(id, dept_name).
List every employee and their department name, including employees with no department.`,
   schema:[
     `CREATE TABLE employees(id INT, name TEXT, dept_id INT)`,
     `CREATE TABLE departments(id INT, dept_name TEXT)`,
     `INSERT INTO employees VALUES (1,'Alice',10),(2,'Bob',NULL)`,
     `INSERT INTO departments VALUES (10,'Sales')`,
   ],
   solution:`SELECT e.name, d.dept_name
FROM employees e
LEFT JOIN departments d ON e.dept_id = d.id;`,
   explain:`LEFT JOIN keeps every row from the left table; unmatched right-side columns come back NULL.`},
  {id:'sqb11', cat:'sql', difficulty:'Easy', title:'Simple subquery',
   prompt:`Table employees(id, name, department, salary).
Find employees who earn more than the average salary.`,
   schema:[
     `CREATE TABLE employees(id INT, name TEXT, department TEXT, salary INT)`,
     `INSERT INTO employees VALUES (1,'Alice','Sales',60000),(2,'Bob','Eng',90000),(3,'Cara','Eng',30000)`,
   ],
   solution:`SELECT name FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);`,
   explain:`A scalar subquery (returns one value) can be used anywhere a single value is expected.`},
  {id:'sqb12', cat:'sql', difficulty:'Easy', title:'IS NULL',
   prompt:`Table employees(id, name, department, manager_id).
Find employees who have no manager (manager_id is null).`,
   schema:[
     `CREATE TABLE employees(id INT, name TEXT, department TEXT, manager_id INT)`,
     `INSERT INTO employees VALUES (1,'Alice','Sales',NULL),(2,'Bob','Eng',1)`,
   ],
   solution:`SELECT name FROM employees WHERE manager_id IS NULL;`,
   explain:`Never use "= NULL" — NULL comparisons always return unknown, so IS NULL / IS NOT NULL is required.`},
  {id:'sqb13', cat:'sql', difficulty:'Easy', title:'BETWEEN and IN',
   prompt:`Table employees(id, name, department, salary).
Find employees with salary between 50000 and 80000 who work in "Sales" or "Marketing".`,
   schema:[
     `CREATE TABLE employees(id INT, name TEXT, department TEXT, salary INT)`,
     `INSERT INTO employees VALUES (1,'Alice','Sales',60000),(2,'Bob','Marketing',90000),(3,'Cara','Eng',30000)`,
   ],
   solution:`SELECT name FROM employees
WHERE salary BETWEEN 50000 AND 80000
  AND department IN ('Sales', 'Marketing');`,
   explain:`BETWEEN is inclusive on both ends; IN is shorthand for multiple OR conditions.`},
  {id:'sqb14', cat:'sql', difficulty:'Easy', title:'LIKE pattern match',
   prompt:`Table employees(id, name, department, salary).
Find employees whose name starts with "A".`,
   schema:[
     `CREATE TABLE employees(id INT, name TEXT, department TEXT, salary INT)`,
     `INSERT INTO employees VALUES (1,'Alice','Sales',60000),(2,'Anna','Eng',90000),(3,'Bob','Eng',30000)`,
   ],
   solution:`SELECT name FROM employees WHERE name LIKE 'A%';`,
   explain:`% matches any sequence of characters, _ matches exactly one character.`},
  {id:'sqb15', cat:'sql', difficulty:'Easy', title:'CASE WHEN',
   prompt:`Table employees(id, name, salary).
Label each employee "High" if salary > 100000, "Mid" if > 50000, else "Low".`,
   schema:[
     `CREATE TABLE employees(id INT, name TEXT, salary INT)`,
     `INSERT INTO employees VALUES (1,'Alice',120000),(2,'Bob',60000),(3,'Cara',30000)`,
   ],
   solution:`SELECT name,
  CASE
    WHEN salary > 100000 THEN 'High'
    WHEN salary > 50000 THEN 'Mid'
    ELSE 'Low'
  END AS salary_band
FROM employees;`,
   explain:`CASE WHEN evaluates conditions top to bottom and stops at the first match, like if/elif/else.`},
];

const sqlInterview = [
  {id:'sqi1', cat:'sql', difficulty:'Medium', title:'Second Highest Salary',
   prompt:`Table Employee(id, salary).
Write a query to return the second highest distinct salary. Return NULL if it doesn't exist.`,
   schema:[
     `CREATE TABLE Employee(id INT, salary INT)`,
     `INSERT INTO Employee VALUES (1,100),(2,200),(3,300)`,
   ],
   solution:`SELECT (
  SELECT DISTINCT salary FROM Employee
  ORDER BY salary DESC
  LIMIT 1 OFFSET 1
) AS SecondHighestSalary;`,
   explain:`Wrapping in a subquery ensures NULL is returned (instead of an empty result) when there is no second value.`},
  {id:'sqi2', cat:'sql', difficulty:'Medium', title:'Nth Highest Salary',
   prompt:`Table Employee(id, salary).
Write a query to return the 3rd highest distinct salary, or NULL if none.`,
   schema:[
     `CREATE TABLE Employee(id INT, salary INT)`,
     `INSERT INTO Employee VALUES (1,100),(2,200),(3,300),(4,300)`,
   ],
   solution:`SELECT salary FROM (
  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
  FROM (SELECT DISTINCT salary FROM Employee) t
) ranked
WHERE rnk = 3;`,
   explain:`DENSE_RANK handles ties correctly (two people tied for #1 both count as rank 1, next distinct salary is rank 2).`},
  {id:'sqi3', cat:'sql', difficulty:'Easy', title:'Duplicate Emails',
   prompt:`Table Person(id, email).
Find all emails that appear more than once.`,
   schema:[
     `CREATE TABLE Person(id INT, email TEXT)`,
     `INSERT INTO Person VALUES (1,'a@x.com'),(2,'b@x.com'),(3,'a@x.com')`,
   ],
   solution:`SELECT email FROM Person
GROUP BY email
HAVING COUNT(*) > 1;`,
   explain:`GROUP BY + HAVING is the standard pattern for "find values that repeat."`},
  {id:'sqi4', cat:'sql', difficulty:'Medium', title:'Employees Earning More Than Their Managers',
   prompt:`Table Employee(id, name, salary, managerId).
Find employees who earn more than their manager.`,
   schema:[
     `CREATE TABLE Employee(id INT, name TEXT, salary INT, managerId INT)`,
     `INSERT INTO Employee VALUES (1,'Joe',70000,3),(2,'Henry',80000,4),(3,'Sam',60000,NULL),(4,'Max',90000,NULL)`,
   ],
   solution:`SELECT e1.name AS Employee
FROM Employee e1
JOIN Employee e2 ON e1.managerId = e2.id
WHERE e1.salary > e2.salary;`,
   explain:`Self-join: treat the same table as two roles (employee and manager) via aliases.`},
  {id:'sqi5', cat:'sql', difficulty:'Medium', title:'Department Highest Salary',
   prompt:`Tables Employee(id, name, salary, departmentId), Department(id, name).
Find the employee(s) with the highest salary in each department.`,
   schema:[
     `CREATE TABLE Employee(id INT, name TEXT, salary INT, departmentId INT)`,
     `CREATE TABLE Department(id INT, name TEXT)`,
     `INSERT INTO Employee VALUES (1,'Joe',85000,1),(2,'Jim',85000,1),(3,'Henry',80000,2)`,
     `INSERT INTO Department VALUES (1,'IT'),(2,'Sales')`,
   ],
   solution:`SELECT d.name AS Department, e.name AS Employee, e.salary
FROM Employee e
JOIN Department d ON e.departmentId = d.id
WHERE e.salary = (
  SELECT MAX(salary) FROM Employee WHERE departmentId = e.departmentId
);`,
   explain:`Correlated subquery recomputes MAX(salary) per department for each row — handles ties naturally.`},
  {id:'sqi6', cat:'sql', difficulty:'Easy', title:'Rising Temperature',
   prompt:`Table Weather(id, recordDate, temperature).
Find all ids whose temperature is higher than the previous (calendar) day.`,
   schema:[
     `CREATE TABLE Weather(id INT, recordDate TEXT, temperature INT)`,
     `INSERT INTO Weather VALUES (1,'2015-01-01',10),(2,'2015-01-02',25),(3,'2015-01-03',20),(4,'2015-01-04',30)`,
   ],
   solution:`SELECT w1.id
FROM Weather w1
JOIN Weather w2 ON w1.recordDate = date(w2.recordDate, '+1 day')
WHERE w1.temperature > w2.temperature;`,
   explain:`Self-join on date offset by 1 day is the classic way to compare each row to "yesterday". (SQLite uses date(col, '+1 day'); Postgres would use recordDate = w2.recordDate + INTERVAL '1 day'.)`},
  {id:'sqi7', cat:'sql', difficulty:'Easy', title:'Combine Two Tables',
   prompt:`Tables Person(personId, firstName, lastName), Address(addressId, personId, city, state).
Report firstName, lastName, city, state for every person (even if no address exists).`,
   schema:[
     `CREATE TABLE Person(personId INT, firstName TEXT, lastName TEXT)`,
     `CREATE TABLE Address(addressId INT, personId INT, city TEXT, state TEXT)`,
     `INSERT INTO Person VALUES (1,'Allen','Wong'),(2,'Bob','Smith')`,
     `INSERT INTO Address VALUES (1,1,'New York City','New York')`,
   ],
   solution:`SELECT p.firstName, p.lastName, a.city, a.state
FROM Person p
LEFT JOIN Address a ON p.personId = a.personId;`,
   explain:`LEFT JOIN from the "must always appear" table (Person) so nobody gets dropped.`},
  {id:'sqi8', cat:'sql', difficulty:'Easy', title:'Customers Who Never Order',
   prompt:`Tables Customers(id, name), Orders(id, customerId).
Find customers who never placed an order.`,
   schema:[
     `CREATE TABLE Customers(id INT, name TEXT)`,
     `CREATE TABLE Orders(id INT, customerId INT)`,
     `INSERT INTO Customers VALUES (1,'Alice'),(2,'Bob'),(3,'Cara')`,
     `INSERT INTO Orders VALUES (1,1),(2,1)`,
   ],
   solution:`SELECT c.name AS Customers
FROM Customers c
LEFT JOIN Orders o ON c.id = o.customerId
WHERE o.id IS NULL;`,
   explain:`LEFT JOIN + "WHERE right-side IS NULL" is the standard anti-join pattern.`},
  {id:'sqi9', cat:'sql', difficulty:'Easy', title:'Delete Duplicate Emails',
   prompt:`Table Person(id, email).
Delete duplicate rows by email, keeping only the one with the smallest id.`,
   schema:[
     `CREATE TABLE Person(id INT, email TEXT)`,
     `INSERT INTO Person VALUES (1,'john@example.com'),(2,'bob@example.com'),(3,'john@example.com')`,
   ],
   solution:`DELETE FROM Person
WHERE id NOT IN (SELECT MIN(id) FROM Person GROUP BY email);`,
   verifyQuery:`SELECT * FROM Person ORDER BY id;`,
   explain:`This portable form (NOT IN + subquery) runs on SQLite/Postgres/SQL Server. MySQL also allows a multi-table DELETE...JOIN syntax, but it's not standard SQL.`},
  {id:'sqi10', cat:'sql', difficulty:'Medium', title:'Rank Scores',
   prompt:`Table Scores(id, score).
Rank scores such that the highest score has rank 1; ties share the same rank and the next rank skips accordingly (like Olympic ranking, i.e. dense rank).`,
   schema:[
     `CREATE TABLE Scores(id INT, score REAL)`,
     `INSERT INTO Scores VALUES (1,3.5),(2,3.65),(3,4.0),(4,3.85),(5,4.0),(6,3.65)`,
   ],
   solution:`SELECT score,
  DENSE_RANK() OVER (ORDER BY score DESC) AS "rank"
FROM Scores;`,
   explain:`DENSE_RANK() is exactly the "no gaps after a tie" ranking behavior this question asks for.`},
  {id:'sqi11', cat:'sql', difficulty:'Medium', title:'Consecutive Numbers',
   prompt:`Table Logs(id, num).
Find all numbers that appear at least 3 times consecutively (by increasing id).`,
   schema:[
     `CREATE TABLE Logs(id INT, num INT)`,
     `INSERT INTO Logs VALUES (1,1),(2,1),(3,1),(4,2),(5,1),(6,2),(7,2)`,
   ],
   solution:`SELECT DISTINCT l1.num AS ConsecutiveNums
FROM Logs l1
JOIN Logs l2 ON l1.id = l2.id - 1 AND l1.num = l2.num
JOIN Logs l3 ON l2.id = l3.id - 1 AND l2.num = l3.num;`,
   explain:`Chain three self-joins on consecutive ids — a window-function LAG/LAG(2) version is a cleaner alternative.`},
  {id:'sqi12', cat:'sql', difficulty:'Easy', title:'Employees With Missing Information',
   prompt:`Tables Employees(employee_id, name), Salaries(employee_id, salary).
Find employee_ids that are missing either a name or a salary record.`,
   schema:[
     `CREATE TABLE Employees(employee_id INT, name TEXT)`,
     `CREATE TABLE Salaries(employee_id INT, salary INT)`,
     `INSERT INTO Employees VALUES (1,'A'),(2,'B'),(3,'C')`,
     `INSERT INTO Salaries VALUES (1,100),(2,200),(4,300)`,
   ],
   solution:`SELECT employee_id FROM (
  SELECT employee_id FROM Employees
  UNION ALL
  SELECT employee_id FROM Salaries
) t
GROUP BY employee_id
HAVING COUNT(*) = 1
ORDER BY employee_id;`,
   explain:`UNION ALL + GROUP BY count==1 finds ids that appear in only one of the two tables.`},
  {id:'sqi13', cat:'sql', difficulty:'Hard', title:'Trips and Users (Cancellation Rate)',
   prompt:`Tables Trips(id, client_id, driver_id, status, request_at), Users(users_id, banned).
For "2013-10-01" to "2013-10-03", find the cancellation rate of trips (status like %cancelled%) for unbanned users, rounded to 2 decimals, grouped by day.`,
   schema:[
     `CREATE TABLE Trips(id INT, client_id INT, driver_id INT, status TEXT, request_at TEXT)`,
     `CREATE TABLE Users(users_id INT, banned TEXT)`,
     `INSERT INTO Trips VALUES (1,1,10,'completed','2013-10-01'),(2,2,11,'cancelled_by_driver','2013-10-01'),(3,3,12,'completed','2013-10-01'),(4,4,10,'cancelled_by_client','2013-10-02'),(5,1,11,'completed','2013-10-02')`,
     `INSERT INTO Users VALUES (1,'No'),(2,'No'),(3,'No'),(4,'No'),(10,'No'),(11,'No'),(12,'Yes')`,
   ],
   solution:`SELECT t.request_at AS Day,
  ROUND(
    SUM(CASE WHEN t.status LIKE '%cancelled%' THEN 1 ELSE 0 END) * 1.0 / COUNT(*),
  2) AS "Cancellation Rate"
FROM Trips t
JOIN Users cu ON t.client_id = cu.users_id AND cu.banned = 'No'
JOIN Users du ON t.driver_id = du.users_id AND du.banned = 'No'
WHERE t.request_at BETWEEN '2013-10-01' AND '2013-10-03'
GROUP BY t.request_at;`,
   explain:`Classic "hard" SQL question, publicly documented as being used at Google/Meta/Amazon/Uber: join twice to exclude banned client/driver, then a conditional SUM for the rate.`},
  {id:'sqi14', cat:'sql', difficulty:'Hard', title:'Department Top Three Salaries',
   prompt:`Tables Employee(id, name, salary, departmentId), Department(id, name).
Find the top 3 distinct salaries in each department.`,
   schema:[
     `CREATE TABLE Employee(id INT, name TEXT, salary INT, departmentId INT)`,
     `CREATE TABLE Department(id INT, name TEXT)`,
     `INSERT INTO Employee VALUES (1,'Joe',85000,1),(2,'Henry',80000,2),(3,'Sam',60000,2),(4,'Max',90000,1),(5,'Janet',69000,1),(6,'Randy',85000,1),(7,'Will',70000,1)`,
     `INSERT INTO Department VALUES (1,'IT'),(2,'Sales')`,
   ],
   solution:`SELECT d.name AS Department, e.name AS Employee, e.salary AS Salary
FROM Employee e
JOIN Department d ON e.departmentId = d.id
WHERE (
  SELECT COUNT(DISTINCT e2.salary)
  FROM Employee e2
  WHERE e2.departmentId = e.departmentId AND e2.salary > e.salary
) < 3;`,
   explain:`Correlated subquery counts how many distinct salaries beat this one within the department — under 3 means top-3.`},
  {id:'sqi15', cat:'sql', difficulty:'Medium', title:'Exchange Seats',
   prompt:`Table Seat(id, student), ids are consecutive from 1. Swap the names of every pair of adjacent ids (1<->2, 3<->4...); if odd count, the last id keeps its own name.`,
   schema:[
     `CREATE TABLE Seat(id INT, student TEXT)`,
     `INSERT INTO Seat VALUES (1,'Abbot'),(2,'Doris'),(3,'Emerson'),(4,'Green'),(5,'Jeames')`,
   ],
   solution:`SELECT
  CASE
    WHEN id % 2 = 1 AND id = (SELECT MAX(id) FROM Seat) THEN id
    WHEN id % 2 = 1 THEN id + 1
    ELSE id - 1
  END AS id,
  student
FROM Seat
ORDER BY id;`,
   explain:`Compute the swapped id with CASE WHEN, handle the odd-count-last-row edge case explicitly, then reorder.`},
  {id:'sqi16', cat:'sql', difficulty:'Medium', title:'Game Play Analysis (First Login)',
   prompt:`Table Activity(player_id, device_id, event_date, games_played).
Find the first login date for each player.`,
   schema:[
     `CREATE TABLE Activity(player_id INT, device_id INT, event_date TEXT, games_played INT)`,
     `INSERT INTO Activity VALUES (1,2,'2016-03-01',5),(1,2,'2016-05-02',6),(2,3,'2017-06-25',1)`,
   ],
   solution:`SELECT player_id, MIN(event_date) AS first_login
FROM Activity
GROUP BY player_id;`,
   explain:`A simple GROUP BY + MIN — worth knowing since it is often step 1 of a longer, harder question.`},
  {id:'sqi17', cat:'sql', difficulty:'Medium', title:'Cumulative Sum with Window Function',
   prompt:`Table Sales(id, sale_date, amount).
For each row, compute a running total of amount ordered by sale_date.`,
   schema:[
     `CREATE TABLE Sales(id INT, sale_date TEXT, amount INT)`,
     `INSERT INTO Sales VALUES (1,'2026-01-01',100),(2,'2026-01-02',150),(3,'2026-01-03',50)`,
   ],
   solution:`SELECT id, sale_date, amount,
  SUM(amount) OVER (ORDER BY sale_date) AS running_total
FROM Sales;`,
   explain:`Window functions compute aggregates without collapsing rows — essential for running totals / moving averages.`},
  {id:'sqi18', cat:'sql', difficulty:'Medium', title:'Row Number Per Group',
   prompt:`Table Orders(id, customer_id, order_date, amount).
For each customer, number their orders in chronological order (1, 2, 3...).`,
   schema:[
     `CREATE TABLE Orders(id INT, customer_id INT, order_date TEXT, amount INT)`,
     `INSERT INTO Orders VALUES (1,1,'2026-01-01',10),(2,1,'2026-01-05',20),(3,2,'2026-01-02',30)`,
   ],
   solution:`SELECT id, customer_id, order_date,
  ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date) AS order_seq
FROM Orders;`,
   explain:`PARTITION BY resets the numbering for each customer_id group — the SQL analogue of a groupby + cumcount.`},
  {id:'sqi19', cat:'sql', difficulty:'Easy', title:'Count Duplicate Rows',
   prompt:`Table Orders(id, customer_id, product, quantity).
Find (customer_id, product) pairs that have more than one order row.`,
   schema:[
     `CREATE TABLE Orders(id INT, customer_id INT, product TEXT, quantity INT)`,
     `INSERT INTO Orders VALUES (1,1,'Pen',2),(2,1,'Pen',3),(3,2,'Pen',1)`,
   ],
   solution:`SELECT customer_id, product, COUNT(*) AS cnt
FROM Orders
GROUP BY customer_id, product
HAVING COUNT(*) > 1;`,
   explain:`GROUP BY on multiple columns treats the combination as the "key" for duplicate detection.`},
  {id:'sqi20', cat:'sql', difficulty:'Hard', title:'Median Employee Salary (per department)',
   prompt:`Table Employee(id, name, salary, departmentId).
Find the median salary in each department, using only standard window functions (no vendor-specific PERCENTILE_CONT).`,
   schema:[
     `CREATE TABLE Employee(id INT, name TEXT, salary INT, departmentId INT)`,
     `INSERT INTO Employee VALUES (1,'A',100,1),(2,'B',200,1),(3,'C',300,1),(4,'D',400,2),(5,'E',500,2)`,
   ],
   solution:`WITH ranked AS (
  SELECT departmentId, salary,
    ROW_NUMBER() OVER (PARTITION BY departmentId ORDER BY salary) AS rn,
    COUNT(*) OVER (PARTITION BY departmentId) AS cnt
  FROM Employee
)
SELECT departmentId, AVG(salary) AS median_salary
FROM ranked
WHERE rn IN ((cnt+1)/2, (cnt+2)/2)
GROUP BY departmentId;`,
   explain:`Postgres/Snowflake/BigQuery offer PERCENTILE_CONT(0.5), but it isn't standard everywhere (e.g. not in SQLite/older MySQL) — this ROW_NUMBER + middle-index trick works in any engine with window functions.`},
  {id:'sqi21', cat:'sql', difficulty:'Medium', title:'Pivot with CASE + SUM',
   prompt:`Table Sales(id, product, quarter, amount) where quarter is 'Q1'..'Q4'.
Pivot so each product is a row and each quarter is a column showing total amount.`,
   schema:[
     `CREATE TABLE Sales(id INT, product TEXT, quarter TEXT, amount INT)`,
     `INSERT INTO Sales VALUES (1,'Widget','Q1',100),(2,'Widget','Q2',150),(3,'Gadget','Q1',200)`,
   ],
   solution:`SELECT product,
  SUM(CASE WHEN quarter = 'Q1' THEN amount ELSE 0 END) AS Q1,
  SUM(CASE WHEN quarter = 'Q2' THEN amount ELSE 0 END) AS Q2,
  SUM(CASE WHEN quarter = 'Q3' THEN amount ELSE 0 END) AS Q3,
  SUM(CASE WHEN quarter = 'Q4' THEN amount ELSE 0 END) AS Q4
FROM Sales
GROUP BY product;`,
   explain:`CASE WHEN inside SUM() is the portable way to pivot rows into columns without vendor-specific PIVOT syntax.`},
  {id:'sqi22', cat:'sql', difficulty:'Medium', title:'Self Join for Pairs',
   prompt:`Table Friendship(user1, user2, since_date). Friendship is stored one direction only.
List all pairs of users who both became friends with a third user on the same date (i.e. "friend suggestions").`,
   schema:[
     `CREATE TABLE Friendship(user1 INT, user2 INT, since_date TEXT)`,
     `INSERT INTO Friendship VALUES (1,3,'2026-01-01'),(2,3,'2026-01-01'),(1,4,'2026-02-01')`,
   ],
   solution:`SELECT f1.user1 AS person_a, f2.user1 AS person_b, f1.user2 AS common_friend
FROM Friendship f1
JOIN Friendship f2 ON f1.user2 = f2.user2 AND f1.since_date = f2.since_date AND f1.user1 <> f2.user1;`,
   explain:`Self-join on the shared friend + shared date; the inequality guard avoids matching a row with itself.`},
  {id:'sqi23', cat:'sql', difficulty:'Medium', title:'Monthly Active Users',
   prompt:`Table Sessions(user_id, session_date).
Count distinct active users per calendar month.`,
   schema:[
     `CREATE TABLE Sessions(user_id INT, session_date TEXT)`,
     `INSERT INTO Sessions VALUES (1,'2026-01-05'),(2,'2026-01-10'),(1,'2026-02-01')`,
   ],
   solution:`SELECT strftime('%Y-%m', session_date) AS month, COUNT(DISTINCT user_id) AS mau
FROM Sessions
GROUP BY strftime('%Y-%m', session_date)
ORDER BY month;`,
   explain:`Bucketing timestamps into calendar periods is a core metric-query pattern; the function name varies by engine (strftime in SQLite, DATE_TRUNC in Postgres/Snowflake, DATE_FORMAT in MySQL) but the GROUP BY logic is identical.`},
  {id:'sqi24', cat:'sql', difficulty:'Medium', title:'Percentage of Active Users',
   prompt:`Tables Users(user_id, signup_date), Sessions(user_id, session_date).
What percentage of all signed-up users had at least one session in their signup month?`,
   schema:[
     `CREATE TABLE Users(user_id INT, signup_date TEXT)`,
     `CREATE TABLE Sessions(user_id INT, session_date TEXT)`,
     `INSERT INTO Users VALUES (1,'2026-01-01'),(2,'2026-01-15')`,
     `INSERT INTO Sessions VALUES (1,'2026-01-20')`,
   ],
   solution:`SELECT ROUND(
  100.0 * COUNT(DISTINCT s.user_id) / COUNT(DISTINCT u.user_id), 2
) AS pct_active
FROM Users u
LEFT JOIN Sessions s
  ON u.user_id = s.user_id
  AND strftime('%Y-%m', s.session_date) = strftime('%Y-%m', u.signup_date);`,
   explain:`LEFT JOIN with the date condition inside the ON clause (not WHERE) so non-matching users are not dropped from the denominator.`},
  {id:'sqi25', cat:'sql', difficulty:'Hard', title:'Consecutive Login Days',
   prompt:`Table Logins(user_id, login_date).
Find users who logged in on 3 or more consecutive calendar days.`,
   schema:[
     `CREATE TABLE Logins(user_id INT, login_date TEXT)`,
     `INSERT INTO Logins VALUES (1,'2026-01-01'),(1,'2026-01-02'),(1,'2026-01-03'),(2,'2026-01-01'),(2,'2026-01-05')`,
   ],
   solution:`WITH d AS (SELECT DISTINCT user_id, login_date FROM Logins),
ranked AS (
  SELECT user_id, login_date,
    julianday(login_date) - ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY login_date) AS grp
  FROM d
)
SELECT user_id, MIN(login_date) AS streak_start, COUNT(*) AS streak_len
FROM ranked
GROUP BY user_id, grp
HAVING COUNT(*) >= 3;`,
   explain:`The "date minus row_number" trick groups consecutive dates into the same bucket (grp) — a well-known streak-finding pattern. julianday() is SQLite's date-to-number function; Postgres would subtract a ROW_NUMBER()-day INTERVAL instead.`},
  {id:'sqi26', cat:'sql', difficulty:'Medium', title:'Compare with LAG',
   prompt:`Table Stock(id, trade_date, price).
For each row, show the price change compared to the previous trade_date.`,
   schema:[
     `CREATE TABLE Stock(id INT, trade_date TEXT, price REAL)`,
     `INSERT INTO Stock VALUES (1,'2026-01-01',10),(2,'2026-01-02',12),(3,'2026-01-03',9)`,
   ],
   solution:`SELECT id, trade_date, price,
  price - LAG(price) OVER (ORDER BY trade_date) AS price_change
FROM Stock;`,
   explain:`LAG() looks at the previous row's value without a self-join — much cleaner for "compare to prior row" questions.`},
  {id:'sqi27', cat:'sql', difficulty:'Easy', title:'Employee Bonus',
   prompt:`Tables Employee(empId, name, salary, managerId), Bonus(empId, bonus).
Find employees whose bonus is less than 1000, or who have no bonus record at all.`,
   schema:[
     `CREATE TABLE Employee(empId INT, name TEXT, salary INT, managerId INT)`,
     `CREATE TABLE Bonus(empId INT, bonus INT)`,
     `INSERT INTO Employee VALUES (1,'A',100,NULL),(2,'B',200,1),(3,'C',300,1)`,
     `INSERT INTO Bonus VALUES (2,500),(3,800)`,
   ],
   solution:`SELECT e.name, b.bonus
FROM Employee e
LEFT JOIN Bonus b ON e.empId = b.empId
WHERE b.bonus < 1000 OR b.bonus IS NULL;`,
   explain:`LEFT JOIN preserves employees with no bonus row; must explicitly OR in the IS NULL check since NULL < 1000 is unknown, not true.`},
  {id:'sqi28', cat:'sql', difficulty:'Easy', title:'Total Sales Per Product',
   prompt:`Table Sales(id, product_id, quantity, price).
Find total revenue (quantity * price) per product_id, highest revenue first.`,
   schema:[
     `CREATE TABLE Sales(id INT, product_id INT, quantity INT, price REAL)`,
     `INSERT INTO Sales VALUES (1,1,2,10),(2,1,1,10),(3,2,5,5)`,
   ],
   solution:`SELECT product_id, SUM(quantity * price) AS revenue
FROM Sales
GROUP BY product_id
ORDER BY revenue DESC;`,
   explain:`Compute the row-level expression (quantity * price) inside the aggregate, then GROUP BY the dimension.`},
  {id:'sqi29', cat:'sql', difficulty:'Medium', title:'First Order Per User',
   prompt:`Table Orders(order_id, user_id, order_date, amount).
For each user, return only their first order (earliest order_date).`,
   schema:[
     `CREATE TABLE Orders(order_id INT, user_id INT, order_date TEXT, amount INT)`,
     `INSERT INTO Orders VALUES (1,1,'2026-01-05',10),(2,1,'2026-01-01',20),(3,2,'2026-02-01',30)`,
   ],
   solution:`SELECT o.*
FROM Orders o
JOIN (
  SELECT user_id, MIN(order_date) AS first_date
  FROM Orders
  GROUP BY user_id
) f ON o.user_id = f.user_id AND o.order_date = f.first_date;`,
   explain:`Join the table back to a per-group MIN() subquery — a very common "first/last event per entity" pattern. ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY order_date) = 1 is the window-function alternative.`},
  {id:'sqi30', cat:'sql', difficulty:'Hard', title:'Three-Table Join: Order Details',
   prompt:`Tables Customers(id, name), Orders(id, customer_id, order_date), OrderItems(order_id, product_name, price).
For each customer, compute total amount spent across all their orders.`,
   schema:[
     `CREATE TABLE Customers(id INT, name TEXT)`,
     `CREATE TABLE Orders(id INT, customer_id INT, order_date TEXT)`,
     `CREATE TABLE OrderItems(order_id INT, product_name TEXT, price REAL)`,
     `INSERT INTO Customers VALUES (1,'Alice'),(2,'Bob')`,
     `INSERT INTO Orders VALUES (1,1,'2026-01-01'),(2,2,'2026-01-02')`,
     `INSERT INTO OrderItems VALUES (1,'Pen',5),(1,'Book',15),(2,'Pen',5)`,
   ],
   solution:`SELECT c.name, SUM(oi.price) AS total_spent
FROM Customers c
JOIN Orders o ON c.id = o.customer_id
JOIN OrderItems oi ON o.id = oi.order_id
GROUP BY c.name
ORDER BY total_spent DESC;`,
   explain:`Chaining two JOINs across three tables before aggregating is the norm in real analytics/interview schemas.`},
];

sqlInterview.push(
  {id:'sqde1', cat:'sql', difficulty:'Medium', title:'Deduplicate Rows, Keep Latest (Window Function)',
   prompt:`Table Events(id, user_id, payload, updated_at) has duplicate user_id rows from repeated syncs.
Return one row per user_id — the one with the latest updated_at.`,
   schema:[
     `CREATE TABLE Events(id INT, user_id INT, payload TEXT, updated_at TEXT)`,
     `INSERT INTO Events VALUES (1,1,'a','2026-01-01'),(2,1,'b','2026-01-02'),(3,2,'c','2026-01-01')`,
   ],
   solution:`SELECT * FROM (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY updated_at DESC) AS rn
  FROM Events
) t
WHERE rn = 1;`,
   explain:`ROW_NUMBER() PARTITION BY + rn=1 is the standard SQL way to collapse duplicates to "latest per key" — the SQL counterpart of the pandas drop_duplicates(keep="last") question.`},
  {id:'sqde2', cat:'sql', difficulty:'Medium', title:'Detect New or Changed Rows (Incremental Load)',
   prompt:`Tables staging_customers(id, name, email, updated_at) and prod_customers(id, name, email, updated_at).
Find rows in staging that are new (id not in prod) or changed (same id, different email) — the core logic of an incremental/upsert load.`,
   schema:[
     `CREATE TABLE staging_customers(id INT, name TEXT, email TEXT, updated_at TEXT)`,
     `CREATE TABLE prod_customers(id INT, name TEXT, email TEXT, updated_at TEXT)`,
     `INSERT INTO staging_customers VALUES (1,'A','a@x.com','2026-01-02'),(2,'B','b@x.com','2026-01-01'),(3,'C','c@x.com','2026-01-01')`,
     `INSERT INTO prod_customers VALUES (1,'A','a_old@x.com','2026-01-01'),(2,'B','b@x.com','2026-01-01')`,
   ],
   solution:`SELECT s.*
FROM staging_customers s
LEFT JOIN prod_customers p ON s.id = p.id
WHERE p.id IS NULL
   OR s.email <> p.email;`,
   explain:`LEFT JOIN + "no match OR changed column" is the standard change-detection query behind MERGE/UPSERT and CDC (change data capture) pipelines.`},
  {id:'sqde3', cat:'sql', difficulty:'Hard', title:'Slowly Changing Dimension (SCD Type 2) Lookup',
   prompt:`Table dim_customer(customer_id, name, tier, valid_from, valid_to, is_current) tracks history of tier changes (valid_to is NULL for the current row).
Find each customer's tier as of '2026-03-01'.`,
   schema:[
     `CREATE TABLE dim_customer(customer_id INT, name TEXT, tier TEXT, valid_from TEXT, valid_to TEXT, is_current INT)`,
     `INSERT INTO dim_customer VALUES (1,'Alice','Silver','2025-01-01','2026-02-01',0),(1,'Alice','Gold','2026-02-01',NULL,1),(2,'Bob','Silver','2025-06-01',NULL,1)`,
   ],
   solution:`SELECT customer_id, name, tier
FROM dim_customer
WHERE valid_from <= '2026-03-01'
  AND (valid_to IS NULL OR valid_to > '2026-03-01');`,
   explain:`SCD Type 2 tables store full history with valid_from/valid_to ranges; querying "as of a date" means matching the row whose range contains that date — a core data warehousing concept.`},
  {id:'sqde4', cat:'sql', difficulty:'Medium', title:'Data Quality Check: Nulls and Negatives',
   prompt:`Table Orders(id, customer_id, amount, order_date).
Write a data quality check query that counts, per column, how many rows have a NULL customer_id, a NULL order_date, or a negative amount.`,
   schema:[
     `CREATE TABLE Orders(id INT, customer_id INT, amount REAL, order_date TEXT)`,
     `INSERT INTO Orders VALUES (1,1,100,'2026-01-01'),(2,NULL,50,'2026-01-02'),(3,2,-10,NULL)`,
   ],
   solution:`SELECT
  SUM(CASE WHEN customer_id IS NULL THEN 1 ELSE 0 END) AS null_customer_id,
  SUM(CASE WHEN order_date IS NULL THEN 1 ELSE 0 END) AS null_order_date,
  SUM(CASE WHEN amount < 0 THEN 1 ELSE 0 END) AS negative_amount
FROM Orders;`,
   explain:`Conditional SUM(CASE WHEN ...) checks are the bread-and-butter of automated data quality / pipeline monitoring queries run before data is trusted downstream.`},
  {id:'sqde5', cat:'sql', difficulty:'Hard', title:'Find Missing Dates in a Sequence',
   prompt:`Table DailyMetrics(metric_date, value) should have exactly one row per day between '2026-01-01' and '2026-01-31', but some days are missing.
List the missing dates.`,
   schema:[
     `CREATE TABLE DailyMetrics(metric_date TEXT, value INT)`,
     `INSERT INTO DailyMetrics VALUES ('2026-01-01',5),('2026-01-02',6),('2026-01-04',7)`,
   ],
   solution:`WITH RECURSIVE spine(calendar_date) AS (
  SELECT date('2026-01-01')
  UNION ALL
  SELECT date(calendar_date, '+1 day') FROM spine WHERE calendar_date < date('2026-01-31')
)
SELECT s.calendar_date
FROM spine s
LEFT JOIN DailyMetrics m ON s.calendar_date = m.metric_date
WHERE m.metric_date IS NULL;`,
   explain:`A recursive CTE builds a complete calendar spine (works on any engine with recursive CTE support), then LEFT JOIN + IS NULL finds the gaps. Postgres/Snowflake/BigQuery also offer a built-in generate_series() shortcut for the same spine.`},
);

function zip(a, b){
  const out = [];
  const len = Math.max(a.length, b.length);
  for (let i=0;i<len;i++){
    if (i<a.length) out.push(a[i]);
    if (i<b.length) out.push(b[i]);
  }
  return out;
}
function assignDays(list, startDay, endDay){
  const days = endDay - startDay + 1;
  list.forEach((q, i)=>{
    q.day = startDay + Math.floor(i * days / list.length);
    q.phase = q.day <= 14 ? 'basics' : 'interview';
  });
}

const basicsCombined = zip(pythonBasics, sqlBasics);
const interviewCombined = zip(pythonInterview, sqlInterview);
assignDays(basicsCombined, 1, 14);
assignDays(interviewCombined, 15, 32);

const QUESTIONS = [...basicsCombined, ...interviewCombined];
