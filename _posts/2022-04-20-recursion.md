---
title: "C EXAMPLES: RECURSION"
date: 2022-04-19 21:31:06 +0900
categories: [Programming, C/C++]
tags: [c, c++]
math: true
---

필자의 대학 코스 Advanced Programming에서 사용된 예시를 발췌, 정리했습니다.

# Calculate Power

> Base Case (y = 0) 
> : $$ x^{0} = 1 $$

> Recursive Case (y >= 1) 
> : $$ x^{y} = x \times x^{y-1} $$

```c++
unsigned long power(unsigned int x, unsigned int y)
{
    if (y == 0)
        return 1;
    else
        return x * power(x, y - 1);
}
```

하지만 이 코드는 `y`만큼의 스택을 생성하기에 Stack Overflow가 발생할 가능성이 다분하다. 따라서 다음과 같이 코드를 작성하여 해결할 수도 있다.

> Base Case (y = 0)
> : $$ x^{0} = 1 $$

> Recursive Case (y >= 1)
> : $$ x^{y} = \begin{cases} x \times x^{y-1} & \text{ if y = odd } \\ x^{y/2} \times x^{y/2} & \text{ if y = even } \end{cases} $$

```c++
unsigned long power(unsigned int x, unsigned int y)
{
    if (y == 0)
        return 1;
    else
        if (y % 2 == 0)
            unsigned long x_y2 = power(x, y / 2);
            return x_y2 * x_y2;
        else
            return x * power(x, y - 1);
}
```

> **가능하면 Reduce by RATIO, not by CONSTANT.**
{: .prompt-tip }

# Calculate Nth Fibonacci Number

> Base Case (n = 0 or 1)
> : $$ \text{fib(0)} = 0 $$
> : $$ \text{fib(1)} = 1 $$

> Recursive Case (n >= 2)
> : $$ \text{fib(n)} = \text{fib(n - 1)} + \text{fib(n - 2)} $$

```c++
unsigned long fib(int n)
{
    if (n <= 1)
        return n;
    return fib(n - 1) + fib(n - 2);
}
```

# Calculate N Factorial

> Base Case (n = 0)
> : $$ \text{fac(0)} = 1 $$

> Recursive Case (n >= 1)
> : $$ \text{fac(n)} = \text{n} \times \text{fac(n - 1)} $$

```c++
unsigned long fac(int n)
{
    if (n == 0)
        return 1;
    return n * fac(n - 1);
}
```

# Find a Square Root using a Binary Search

> **What is Binary Search or Bisection Method?**
> - Choose an initial lower boundary and an upper boundary for the ANSWER.
> - Progressively narrow boundaries, until they are narrow enough for our purpose.
{: .prompt-info }

예를 들어, 7의 제곱근을 찾는다고 해보자. 

1. 7의 제곱근은 0에서 7 사이에 있을거야.
2. Midpoint(= 3.5)를 시도해보자. \\
$$ 3.5^{2} = 12.25 $$
3. 12.25는 7보다 크므로 7의 제곱근은 0에서 3.5 사이에 있을거야.
4. Midpoint(= 1.75)를 시도해보자. \\
$$ 1.75^{2} = 3.0625 $$
5. 3.0625는 7보다 작으므로 7의 제곱근은 1.75에서 3.5 사이에 있을거야.
6. Midpoint(= 2.625)를 시도해보자. \\
$$ 2.625^{2} = 6.890625 $$
7. 6.890625는 7보다 작으므로 7의 제곱근은 2.625에서 3.5 사이에 있을거야.
8. Midpoint(= 3.0625)를 시도해보자. \\
$$ 3.0625^{2} = 9.37890625 $$
9. 9.37890625는 7보다 크므로 7의 제곱근은 2.625에서 3.0625 사이에 있을거야.
10. Midpoint를 시도해보자.
11. ...

이러한 과정이 바로 Binary Search 이다!

> Base Case (close enough to answer)
> : $$ \text{return midpoint;} \text{ if } \text{midpoint}^{2} = \text{n} $$

> Recursive Case (not close enough to answer)
> : $$ \begin{cases} \text{return binary_search(n, lower, midpoint)} & \text{ if } \text{midpoint}^{2} > \text{n} \\ \text{return binary_search(n, midpoint, upper)} & \text{ if } \text{midpoint}^{2} < \text{n} \end{cases} $$

```c++
double binary_search(double n, double lower, double upper)
{
    double mid = (lower + upper) / 2;
    double mid2 = mid * mid;
    if (fabs(mid2 - n) <= 0.001) // #include<cmath>
        return mid;
    else
    {
        if (mid2 > n)
            return binary_search(n, lower, mid);
        else
            return binary_search(n, mid, upper);
    }
}

double square_root(double val)
{
    return binary_search(val, 0, val);
}
```

> 위와 같은 방식으로 인자를 3개 받는 함수를 실행하기 위해서 그 함수를 실행시키는 것이 아니라, 인자를 하나 받는 함수를 구현한 후 인자를 3개 받는 함수를 호출할 수도 있다.
{: .prompt-tip }

# Is Palindrome?

Palindrome이란 앞으로, 뒤로 읽어도 동일한 문자열을 말한다. 예를 들어 'radar', 'noon' 등이 이에 속한다.

> **`c_str()` method**
>  : C 스타일의 `string`을 C++에서 사용할 수 있도록 해준다. 이들은 문자열의 첫번째 글자를 가리키는 포인터 `ptr`과 문자열의 길이 `len`으로 구성된다.
{: .prompt-info }

> Base Case (len <= 1)
> : $$ \text{ return True } \text{ if } \text{ len } <= 1 $$

> Recursive Case (len >= 2) (양끝이 동일 and 내부 문자열이 palindrome)
> : $$ \text{return (ptr[0] == ptr[len -1]) and is_palindrome(ptr + 1, len - 2)} $$

```c++
bool is_palindrome(char const* ptr, size_t len)
{
    if (len <= 1)
        return true;
    return (ptr[0] == ptr[len - 1] && is_palindrome(ptr + 1, len - 2));
}

int main()
{
    string x;
    getline(cin, x);
    cout << is_palindrome(x.c_str(), x.length()) << endl;
    return 0;
}
```

> `getline()`, `c_str()`, `length()` 메소드의 사용법을 잘 숙지해놓자.
{: .prompt-tip }

> `gdb [executable]`을 console에 입력함으로써 재귀함수의 스택을 추적할 수 있다.
{: .prompt-tip }


# Print Tower of Hanoi Solution

Tower of Hanoi은 한 봉에 있는 서로 다른 크기의 Disk들을 다른 봉으로 옮기는 문제이다.

Rules
1. 한 번에 하나의 Disk를 이동 가능
2. 쌓여있는 Disk들 중 가장 위의 Disk만 이동 가능
3. Disk는 자신보다 크기가 큰 Disk 위에만 놓일 수 있음

> Base Case (1 Disk)
> : $$ \text{print(from → to) } \text{ if } \text{1 Disk} $$

> Recursive Case
> : $$ \text{1. move(n - 1 disks from → other)} $$ \\
> : $$ \text{2. move(1 disk from → to)} $$ \\ 
> : $$ \text{3. move(n - 1 disks other → to)} $$ \\

```c++
void move_discs(int num_discs, int from, int to)
{
    if (num_discs == 1)
        cout << "from " << from << " to " << to << endl;
    else
    {
        // 0. other rod 찾기
        int other;
        for (other = 1; other == from || other == to; other++)
            ;
        // 1. move (n - 1 disks from → other)
        move_discs(num_discs - 1, from, other);
        // 2. move (1 disk from → to)
        cout << "from " << from << " to " << to << endl;
        // 3. move (n - 1 disks other → to)
        move_discs(num_discs - 1, other, to);
    }
}
```

ㄷㄷ 너무 소름돋는다...! 잘 보이지 않더라도 무지성으로 적으면 해결이 되다니!

# Solving Simple Sudoku

> **Backtracking에 대하여...**
> Backtracking (choose-explore-unchoose) : 어떤 경우가 나올지 모르는 경우를 선택 - 직접 해보며 되는지 안되는지 관찰 - 안되면 Undo하는 과정을 말한다.
{: .prompt-info }

3X3 스도쿠가 있을 때,
1. 빈 칸에 특정 숫자(1~3)을 넣어보고
2. 오류가 있으면 (illegal state) 빡구 (backtrack)
3. 오류가 없으면 Winnning State, 종료

```c++
// BLANK는 -1로 채움
#define BLANK -1

// 각 행들에 중복되는 원소가 없는지 체크
bool has_invalid_row(int const** board)
{
    for (int row = 0; row < 3; row++)
    {
        // 등장한 원소는 true로 바꿀 거임
        bool seen[3] = { false, false, false };
        for (int col = 0; col < 3; col++)
        {
            if (board[row][col] != BLANK) // 채워져있는 칸에 대하여
                if (seen[board[row][col]]) // 만약 본 게 또 채워져 있으면
                    return true; // invalid
                else
                    seen[board[row][col]] = true; // 못 본 놈이면 봤다고 체크하기
        }
    }
    return false; // 모든 원소에 대하여 문제 없으면 valid
}

// 각 열들에 중복되는 원소가 없는지 체크
bool has_invalid_column(int const** board)
{
    for (int col = 0; col < 3; col++)
    {
        // 등장한 원소는 true로 바꿀 거임
        bool seen[3] = { false, false, false };
        for (int row = 0; row < 3; row++)
        {
            if (board[row][col] != BLANK) // 채워져있는 칸에 대하여
                if (seen[board[row][col]]) // 만약 본 게 또 채워져 있으면
                    return true; // invalid
                else
                    seen[board[row][col]] = true; // 못 본 놈이면 봤다고 체크하기
        }
    }
    return false; // 모든 원소에 대하여 문제 없으면 valid
}

bool is_invalid(int const** board)
{
    return has_invalid_row(board) || has_invalid_column(board);
}

bool rows_win(int const** board)
{
    for (int row = 0; row < 3; row++)
    {
        bool seen[3] = { false, false, false };
        for (int col = 0; col < 3; col++)
            if (board[row][col] != BLANK)
                seen[board[row][col]] = true; // 모든 원소에 대하여 본 놈들은 true로 바꾸기
        for (int i = 0; i < 3; i++)
            if (!seen[i]) // 만약 못 본 원소가 있다면 invalid
                return false;
    }
    return true; // 못 본 원소없이 모두 봤으면 win!
}

bool columns_win(int const** board)
{
    for (int col = 0; col < 3; col++)
    {
        bool seen[3] = { false, false, false };
        for (int row = 0; row < 3; row++)
            if (board[row][col] != BLANK)
                seen[board[row][col]] = true; // 모든 원소에 대하여 본 놈들은 true로 바꾸기
        for (int i = 0; i < 3; i++)
            if (!seen[i]) // 만약 못 본 원소가 있다면 invalid
                return false;
    }
    return true; // 못 본 원소없이 모두 봤으면 win!
}

bool wins(int const** board)
{
    return rows_win(board) && columns_win(board);
}

bool solve_puzzle(int** board)
{
    if (is_invalid((int const**)board))
        return false;
    if (wins((int const**)board))
        return true;
    for (int row = 0; row < 3; row++)
        for (int col = 0; col < 3; col++)
            if (board[row][col] == BLANK) // 모든 빈칸들에 대하여
            {
                for (int guess = 0; guess < 3; guess++)
                {
                    board[row][col] = guess;
                    if (solve_puzzle(board))
                        return true; // valid면 유지
                }
                board[row][col] = BLANK;
                return false; // invalid면 backtrack, false 반환
            }
    return false;
}

int main()
{
    int row1[] = {1, 2, 0};
    int row2[] = { BLANK, BLANK, BLANK };
    int row3[] = { BLANK, BLANK, BLANK };
    int* rows[] = { row1, row2, row3 };
    if (solve_puzzle(rows))
        for (int r = 0; r < 3; r++)
            for (int c = 0; c < 3; c++)
                cout << rows[r][c] << " ";
            cout << endl;
}
```