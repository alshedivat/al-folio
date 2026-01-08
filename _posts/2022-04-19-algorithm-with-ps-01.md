---
title: "문제로 풀어보는 알고리즘 01장: 재귀적 프로그래밍"
date: 2022-04-19 22:40:43 +0900
categories: [Problem Solving, 문제로 풀어보는 알고리즘]
tags: [ps, book]
math: true
---

# n! 계산하기

## 반복문을 이용하여 n! 계산하기

n!은 다음과 같이 정의된다.

$$ n! = 1 \times 2 \times \cdots \times n $$

```c++
int factorial(int n)
{
    int r = 1;
    for(int i = 1; i <= n; i++)
        r *= i;
    return r;
}
```

일정한 규칙을 가진 곱셈을 반복하므로, 반복문을 사용하면 쉽게 작성할 수 있다.

## 재귀함수를 이용하여 n! 계산하기

재귀함수를 이용하여 n!을 구하기 위해서는, 재귀적으로 n!을 정의해야 한다.

> 재귀적으로 함수를 정의한다는 뜻, 함수 내부에서 동일한 함수를 호출한다는 것을 의미한다. 즉 수학적 관점에서는 점화식과 유사한 개념이라고 볼 수 있다.
{: .prompt-info }

> 재귀함수를 정의하기 위해서는, 두 가지를 찾아야한다. 첫번째는 Base Case이고, 두번째는 Recursive Case이다.
> - Base Case: 동일한 함수가 계속해서 호출되다 보면, 함수를 끝낼 (즉 함수를 호출하지 않고 정적인 값만을 반환할) 조건이 필요함이 자명해보인다. 따라서 우리는 Base Case가 필요하다. 이 녀석은 호출되었을 때 값을 반환하기 위해 새로운 함수를 호출하던 함수의 궤도를 끝내는 역할을 해줄 것이다.
> - Recursive Case: 이 경우가 바로 점화식과 같이 필요한 함수값을 동일한 함수값을 이용하여 표현하는 것이다. 대부분 `f(n)`을 `f(n - 1)`을 이용해서 표현하거나, `f(n // 2)`를 이용해서 표현한다. (전자를 많이 사용하지만, 뒤에서 후자에 대한 예시도 함께 다룰 것이다.)
> - **재귀함수의 근간: 재귀함수는 재귀, 즉 동일한 함수의 호출을 반복함에 따라 Base Case에 점점 수렴해가야만 한다.** (상식적으로, 그렇지 않다면 재귀함수가 어떻게 종료되겠는가? 스택 오버플로우를 야기할 것이다.)
{: .prompt-tip }

> 이름 붙이기에 따라 다르겠지만, 재귀함수는 크게 두 가지로 나뉜다. 바로 **값을 반환하기 위한 재귀**와 **특정 행동을 위한 재귀**로 말이다.
> - **값을 반환하기 위한 재귀**: Recursive Case에서 `return`에 재귀함수가 호출된다. Base Case는 특정 값을 `return`한다.
> - **특정 행동을 위한 재귀**: Recursive Case에서 `return`을 하지 않으며, 그저 일반 라인에서 재귀함수를 호출한다. Base Case는 프로그램의 종료만을 위한 것으로, `return ;`과 같이 간단하게 적는다.
> - 밑에 다양한 예시가 있다. 이러한 범주에서 구분하며 서술할 테이니, 잘 이해해놓자!
{: .prompt-tip }

n!은 다음과 같이 정의된다.

$$ 1! = 1 \\ n! = n \times (n-1)! \:\:\:\:\:\: : n > 1 $$

따라서 코드를 이렇게 쓸 수 있다.

```c++
int factorial2(int n)
{
    if (n == 1)
        return 1;
    else
        return n * factorial2(n - 1);
}
```

이는 **값을 반환하기 위한 재귀**에 해당한다.

위 함수의 Base Case는 n에 1이 들어왔을 때이다. 1이 아닌 n이 들어왔을 때, Recursive Case를 타고 `factorial2(n - 1)` 함수를 호출할 것이고, `n - 1`이 1이 아니라면 또 Recursive Case를 타고 `factorial2(n - 2)` 값을 만들 것이다. 그렇게 파라메터의 값이 쭉 줄어들다가 만약 `factorial2(1)` 함수가 호출되면 1을 반환하고, 이전 놈한테 1 값을 넘겨 새로운 값을 계산하고, 그 새로운 값을 다시 이전 놈에게 넘겨 새로운 값을 계산하고... 이런 식으로 `factorial2(n)`의 값을 계산해 낼 수 있다.

## 만약 Base Case가 없다면??

`Segmentation fault`가 발생한다. 이것은 스택 오버플로우가 발생했을 때 나타나는 오류로, **수많은 재귀함수 호출로 인하여 프로그램을 강제로 종료시킨 것이다.** 우리는 Base Case를 잘 작성해야만 하는 이유를 알았다!

# 연결 리스트 출력하기

지난 챕터에서 배웠던 연결리스트를 기억하는가? 연결리스트의 원소들을 출력하는 함수를 작성해보자.

> **지난 챕터 복습: 연결 리스트에 대하여**
> - `struct node_t`: `int key`와 `node_t* next`값이 정의된 구조체를 `node_t`로서 정의했다.
> - `int key`: 노드에 담겨있는 `int`값을 `key`라는 변수에 저장했다.
> - `node_t* next`: 다음 노드를 가리키고 있는 `node_t`형 포인터를 `next`로써 정의했다.
> - `node_t* head`: 처음 원소를 가리키는 `node_t`형 포인터를 `head`로써 정의했다.
> - `node_t* tail`: 마지막 원소를 가리키는 `node_t`형 포인터를 `head`로써 정의했다.
{: .prompt-info }

`node_t* from`을 인자로 받고, `from`이 가리키는 노드부터 마지막 노드까지 노드의 값들을 출력하는 함수를 작성해보자.

## 반복문을 이용하여 연결 리스트 출력하기

```c++
void print_list(node_t* from)
{
    node_t* node;
    node = from;
    while (node != NULL)
    {
        cout << node->key << endl;
        node = node->next;
    }
}
```

노드가 `NULL`값을 가질 때까지, 즉 `node`가 끝까지 순회할 때까지 `node->key`를 출력하고, `node`의 값을 `node->next`로 업데이트하는 과정을 반복한다.

## 재귀함수를 이용하여 연결 리스트 출력하기

재귀함수를 이용하여 연결 리스트를 출력하기 위해서는, 재귀적으로 연결 리스트 출력하기 함수를 정의해야 한다.

연결 리스트 출력하기 함수는 다음과 같이 정의된다.

> exit() : `from == NULL`
> print(`key`), print_list(`next`) : `from != NULL`

이렇게 함수를 정의하고 나면, Recursive Case를 반복하여 호출함에 따라 Base Case에 수렴함을 확인할 수 있다. 노드의 다음, 다음, 다음, 다음, ... 이 호출되며 연결 리스트의 마지막을 향해 달리는데 (Recursive Case), 연결 리스트의 마지막 값은 `NULL`이기 때문이다. (Base Case)

`from`값이 `NULL`이면 함수 호출을 종료하고, 아니라면 `key`값을 출력한 다음 이 함수를 호출하되 인자를 다음 노드의 포인터 `next`로 넣는 것이다. 이로써 연결 리스트를 타고 계속 노드의 `key` 값을 출력하고, 노드가 끝에 다다르면 함수 호출을 종료할 수 있다.

```c++
void print_list2(node_t* from)
{
    node_t* node;
    if (from == NULL)
        return;
    printf("%d ", from->key);
    print_list2(from->next);
}
```

이는 **특정 행동을 위한 재귀**에 해당한다.

## 재귀함수를 이용하여 연결 리스트 역순으로 출력하기

연결 리스트를 역순으로 출력하기 위해서는 어떻게 해야할까? 이를 반복문으로 구현하고자 한다면, 꽤 복잡할 것이다. 하지만 재귀함수를 이용하면 쉽게 해결할 수 있다.

> **특정 행동을 위한 재귀**에서는 `행동`과 `호출`의 순서가 중요하다!
> 1. 위 예시에서 연결 리스트의 값을 순서대로 출력하기 위해서, 우리는 `행동`을 한 후에 다음 함수를 `호출`하는 방식으로 코드를 짰다. 하지만 `호출`을 한 후에 `행동`을 하는 식으로 순서를 바꾸면 어떤 결과가 나올까?
> 2. 우선 스택에 대한 개념이 필요한데, 우리가 A 스택에서 특정 함수를 호출하게 되면 A에서 진행되던 모든 작업이 멈추고 (정확히는 코드의 독해가 함수를 호출한 행에서 멈추고), B라는 새로운 스택에서 작업을 진행하게 된다. 그리고 B 스택에서 함수 값이 반환되면 B 스택을 빠져나온 후 다시 A 스택으로 회귀하여 작업을 재개한다.
> 3. 이러한 관점에서 보았을 때, `호출` 후 `행동`은 약간 기이하다. `호출` 바로 `행동`을 하지 않기 때문이다. 하지만 `호출` 후 함수값이 바로 반환되었다면, 곧바로 `행동`을 한다고 전제할 수 있을 것이다. 이제 느낌이 오는가? `호출`-`행동` 쌍을 넘버링한 후 실행되는 순서를 적어보겠다.
> 4. `호출₁`→`호출₂`→`호출₃`→…→`호출ⁿ`→`행동ⁿ`→…→`호출₃`→`호출₂`→`호출₁` (n번째 호출이 Base Case라 전제)
> 5. 느낌이 오는가? 그렇다면 우리는 역순으로 행동이 일어날 것이라 예상할 수 있다.
{: .prompt-info }

우리는 위에서 재귀함수를 작성할 때 `호출` 후 `행동`으로 작성하면 `행동`이 역순으로 수행된다는 것을 알았다.

```c++
void print_list2(node_t* from)
{
    node_t* node;
    if (from == NULL)
        return;
    print_list2(from->next);
    printf("%d ", from->key);
}
```

즉 순서만 바꿔준다면 연결 리스트의 값이 역순으로 출력될 것임을 기대할 수 있다.

## 몇 개의 원소를 넣어야 스택 오버 플로우가 발생할까? (작성 중)

## 디스크 드라이브의 모든 파일명을 출력하는 프로그램

# 이항계수

이항계수
$$ _{n}\textrm{C}_{r} $$
은 서로 다른 n개의 원소 중 r개의 원소를 순서를 고려하지 않고 뽑는 경우의 수를 말한다.

이는 공식
$$ _{n}\textrm{C}_{r} = \frac{n \times (n-1) \times (n-2) \times \cdots \times (n-r+1)}{r \times (r-1) \times (r-2) \times \cdots \times 1} $$
로 계산될 수 있다.

하지만 이를 재귀적으로 풀면 더 쉽게 쓸 수 있지 않을까?

## 재귀적으로 이항계수 계산하기

재귀함수를 이용하여 이항계수를 계산하기 위해서는, 재귀적으로 이항계수를 정의해야 한다.

이항계수는 다음과 같이 정의된다.

> Base Case
> $$ _{n}\textrm{C}_{0} = _{n}\textrm{C}_{n} = 1 $$
> Recursive Case (r > 0)
> $$ _{n}\textrm{C}_{r} = _{n-1}\textrm{C}_{r-1} + _{n-1}\textrm{C}_{r} $$

이는 Recursive Case를 호출할 때마다 n과 r의 값이 점점 줄어들어 Base Case에 수렴함을 확인할 수 있다.

```c++
long long choose(int n, int r)
{
    if (r == 0 || n == r)
        return 1;
    return choose(n - 1, r - 1)  choose(n - 1, r);
}
```

이는 **값을 반환하기 위한 재귀**에 해당한다.

> 이항계수의 값은 기하급수적으로 커지기 때문에 반환 타입을 `long long`으로 설정하였다.
{: .prompt-tip }

## 메모이제이션을 이용하여 이항계수 계산하기 (작성 중)

# 피보나치 수열

피보나치 수열은 대표적인 점화식 수열이다. 피보나치 수열은 수열의 값이 이전 두 수의 합으로 정의되는 수열이다.
$$ 1, 1, 2, 3, 5, 8, 13, \cdots $$
과 같이 정의된다.

## 재귀함수를 이용하여 피보나치 수 구하기

재귀함수를 이용하여 피보나치 수를 구하기 위해서는, 재귀적으로 피보나치 수를 정의해야 한다. (사실 피보나치 수의 정의가 점화식의 형태이기에, 매우 쉽게 정의할 수 있다.)

피보나치 수는 다음과 같이 정의된다.

> Base Case
> $$ f_{1} = 1, f_{2} = 1 $$
> Recursive Case (n > 3)
> $$ f_{n} = f_{n-1} + f_{n-2} $$

이는 Recursive Case를 호출할 때마다 n의 값이 점점 줄어들어 Base Case에 수렴함을 확인할 수 있다.

```c++
long long fibo(int n)
{
    if (r == 0 || n == r)
        return 1;
    return choose(n - 1, r - 1)  choose(n - 1, r);
}
```

이는 **값을 반환하기 위한 재귀**에 해당한다.

## 메모이제이션을 이용하여 피보나치 수 구하기

# 금액을 지불하는 방법의 수 구하기

1만원, 2만원, 5만원, 10만원, 20만원, 50만원 총 6가지 종류의 지폐가 있을 때, 100만원을 지불하는 방법의 수는 총 몇 가지일까?

예를 들면
$$ 100 = 1 \times 10 + 10 \times 4 + 50 \times 1 $$
$$ 100 = 10 \times 2 + 20 \times 4 $$
$$ \vdots $$
등등이 있을 수 있다.

## 반복문으로 금액을 지불하는 방법의 수 구하기

가장 NAIVE하게 생각하기 위해, 지폐의 단위가 2가지 종류가 있다고 생각해보자.
그렇다면 그냥 한 지폐의 단위를 계속 금액에서 빼고, 빼진 금액이 남은 지폐의 단위를 이용하여 지불될 수 있는지 확인하면 된다. (즉 빼진 금액이 남은 지페의 단위로 나누어 떨어지는지 확인하면 된다.)

```c++
int main()
{
    int bills[2] = {20, 50};
    int count = 0;
    int money = 100;
    for (int i0 = money; i0 >= 0; i0 -= bills[0])
        if (i0 % bills[1] == 0)
            count++;
    cout << count << endl;
    return 0;
}
```

이를 6가지 지페의 단위로 확장시키면 다음과 같다.

```c++
int main()
{
    int bills[6] = {1, 2, 5, 10, 20, 50};
    int count = 0;
    int money = 100;
    for (int i0 = money; i0 >= 0; i0 -= bills[0])
        for (int i1 = i0; i1 >= 0; i1 -= bills[1])
            for (int i2 = i1; i2 >= 0; i2 -= bills[2])
                for (int i3 = i2; i3 >= 0; i3 -= bills[3])
                    for (int i4 = i3; i4 >= 0; i4 -= bills[4])
                        if (i4 % bills[5] == 0)
                            count++;
    cout << count << endl;
    return 0;
}
```

이 프로그램은 올바르고, 나름 빠르지만 유연하지 못하다. 우선 지폐의 단위의 종류 수가 6가지로 고정되어 있어, 지폐가 몇 종류인지 입력받고, 단위의 종류를 차례대로 입력받아 출력하는 문제에 적용이 불가능하다. (`for`문의 개수를 코드에서 조정하는 것은 불가능하기 때문이다.)

## 재귀함수로 금액을 지불하는 방법의 수 구하기

재귀함수를 이용하여 금액을 지불하는 방법의 수를 구하기 위해서는, 재귀적으로 금액을 지불하는 방법의 수를 정의해야 한다.

우선 금액을 지불하는 방법의 수를 반환하는 함수를 `pay(m, n)`으로 정의하자.

> `pay(m, n)`: `n`종류의 지폐 `bills[0]`, `bills[1]`, ..., `bills[n - 1]`을 사용하여 `m`원을 지불하는 방법의 수

그러면 `pay(m, n)`는 다음과 같이 정의된다.

> Base Case (n = 1)
> $$ \begin{cases} 1 & \text{ if } \text{m \% bills[0] == 0} \\ 0 & \text{ if } \text{m \% bills[0] != 0} \end{cases} $$
> Recursive Case (n >= 2)
> $$ \sum_{\text{i=0}}^{\text{m/bills[n-1]}} \text{pay(m-bills[n-1]} \times \text{i, n-1)} $$

Recursive Case를 반복할수록 n의 값이 점점 줄어들기에, Base Case에 수렴함을 확인할 수 있다.

이를 코드로 작성하면 다음과 같다.

```c++
int pay(int money, int* bills, int n)
{
    int count = 0;
    if (n == 1)
        if (m % bills[0] == 0)
            return 1;
        else
            return 0;
    for (int i = 0; i <= (money / bills[n - 1]); i++)
        count += pay(money - bills[n - 1] * i, bills, n - 1);
    return count;
}
```

이는 **값을 반환하기 위한 재귀**에 해당한다.

# 수분할

n 수분할은 자연수 n을 순서에 상관 없이 하나 이상의 자연수의 합으로 나타내는 방법이다.

예를 들어

| 3수분할 | 4수분할 | 5수분할
|:-------|:--------|:----------
| 1+1+1  | 1+1+1+1 | 1+1+1+1+1
| 2+1    | 2+1+1   | 2+1+1+1
| 3      | 2+2     | 2+2+1
|        | 3+1     | 3+1+1
|        | 4       | 3+2
|        |         | 4+1
|        |         | 5

와 같은 형태로 나타낼 수 있다.

## 일반적인 수분할

n/m 수분할은 n을 순서에 상관 없이 하나 이상의 m 이하 자연수로만 나타내는 방법이다.

예를 들어

| 4/1     | 3/2     | 5/2       | 5/3       |
|:--------|:--------|:----------|:----------|
| 1+1+1+1 | 1+1+1   | 1+1+1+1+1 | 1+1+1+1+1 |
|         | 2+1     | 2+1+1+1   | 2+1+1+1   |
|         |         | 2+2+1     | 2+2+1     |
|         |         |           | 3+1+1     |
|         |         |           | 3+2       |

와 같은 형태로 나타낼 수 있다.

앞서 설명했던 n 수분할은 n/n 수분할이라고 할 수 있다.

n < m 이면 n/m 수분할은 n/n 수분할과 같다.

## 재귀함수로 수분할의 개수 구하기

재귀함수를 이용하여 수분할의 개수를 구하기 위해서는, 재귀적으로 수분할의 개수를 정의해야 한다.

우선 n/m 수분할의 개수를 반환하는 함수를 `partition(n, m)`으로 정의하자.

그러면 `partition(n, m)`는 다음과 같이 정의된다.

> Base Case (n = 0)
> $$ \text{partition(0,m)} = 1 $$
> Recursive Case (n >= 1)
> $$ \text{partition(n,m)} = \sum_{\text{i=1}}^{\text{m}} \text{partition(n-i,i)} $$

Recursive Case를 반복하여 호출할수록 n의 값이 점점 줄어들기에, Base Case에 수렴함을 확인할 수 있다.

```c++
int partition(int n, int m)
{
    int count = 0;
    if (n < m)
        m = n;
    if (n == 0)
        return 1;
    for (int i = 1; i <= m; i++)
        count += partition(n - i, i);
    return count;
}
```

이는 **값을 반환하기 위한 재귀**에 해당한다.

## 메모이제이션을 이용한 재귀함수로 수분할의 개수 구하기

## 재귀함수로 순서를 고려하는 수분할의 개수 구하기

순서를 고려한 수분할은 내림차순으로 정렬했던 이제까지와 다르게, 서로 다른 순서도 고려함을 의미한다.

예를 들어

| 3수분할  | 4수분할    
|:--------|:--------
| 1+1+1   | 1+1+1+1 
| 1+2     | 1+1+2   
| 2+1     | 1+2+1   
| 3       | 1+3     
|         | 2+1+1   
|         | 2+2     
|         | 3+1     
|         | 4       

와 같은 형태로 나타낼 수 있다.

재귀함수를 이용하여 순서를 수분할의 개수를 구하기 위해서는, 재귀적으로 순서를 고려한 수분할의 개수를 정의해야 한다.

우선 n/m 수분할의 개수를 반환하는 함수를 `partition2(n, m)`으로 정의하자.

그러면 `partition2(n)`는 다음과 같이 정의된다.

> Base Case (n = 1)
> $$ \text{partition2(1)} = 1 $$
> Recursive Case (n >= 2)
> $$ \text{partition2(n)} = \sum_{\text{i=1}}^{\text{n-1}} \text{partition2(n-i)} + 1 $$

Recursive Case를 반복하여 호출할수록 n의 값이 점점 줄어들기에, Base Case에 수렴함을 확인할 수 있다.

```c++
int partition2(int n)
{
    int count = 0;
    if (n == 1)
        return 1;
    for (int i = 1; i <= n - 1; i++)
        count += partition2(n - i);
    return count + 1;
}
```

---

# 다양한 재귀함수 예시

필자의 대학 코스 Advanced Programming에서 사용된 예시를 발췌, 정리했습니다.

## Calculate Power

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

## Calculate Nth Fibonacci Number

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

## Calculate N Factorial

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

## Find a Square Root using a Binary Search

> **What is Binary Search or Bisection Method?**
> - Choose an initial lower boundary and an upper boundary for the ANSWER.
> - Progressively narrow boundaries, until they are narrow enough for our purpose.
{: .prompt-info }

예를 들어, 7의 제곱근을 찾는다고 해보자. 

1. 7의 제곱근은 0에서 7 사이에 있을거야.
2. Midpoint(= 3.5)를 시도해보자.
$$ 3.5^{2} = 12.25 $$
3. 12.25는 7보다 크므로 7의 제곱근은 0에서 3.5 사이에 있을거야.
4. Midpoint(= 1.75)를 시도해보자.
$$ 1.75^{2} = 3.0625 $$
5. 3.0625는 7보다 작으므로 7의 제곱근은 1.75에서 3.5 사이에 있을거야.
6. Midpoint(= 2.625)를 시도해보자.
$$ 2.625^{2} = 6.890625 $$
7. 6.890625는 7보다 작으므로 7의 제곱근은 2.625에서 3.5 사이에 있을거야.
8. Midpoint(= 3.0625)를 시도해보자.
$$ 3.0625^{2} = 9.37890625 $$
9. 9.37890625는 7보다 크므로 7의 제곱근은 2.625에서 3.0625 사이에 있을거야.
10. Midpoint를 시도해보자.
11. ...

이러한 과정이 바로 Binary Search 이다!

> Base Case (close enough to answer)
> : $$ \text{return midpoint;} \text{ if } \text{midpoint}^{2} = \text{n} $$

> Recursive Case (not close enough to answer)
> : $$ \begin{cases} \text{return binary\_search(n, lower, midpoint)} & \text{ if } \text{midpoint}^{2} > \text{n} \\ \text{return binary\_search(n, midpoint, upper)} & \text{ if } \text{midpoint}^{2} < \text{n} \end{cases} $$

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

## Is Palindrome?

Palindrome이란 앞으로, 뒤로 읽어도 동일한 문자열을 말한다. 예를 들어 'radar', 'noon' 등이 이에 속한다.

> **`c_str()` method**
>  : C 스타일의 `string`을 C++에서 사용할 수 있도록 해준다. 이들은 문자열의 첫번째 글자를 가리키는 포인터 `ptr`과 문자열의 길이 `len`으로 구성된다.
{: .prompt-info }

> Base Case (len <= 1)
> : $$ \text{ return True } \text{ if } \text{ len } <= 1 $$

> Recursive Case (len >= 2) (양끝이 동일 and 내부 문자열이 palindrome)
> : $$ \text{return (ptr[0] == ptr[len -1]) and is\_palindrome(ptr + 1, len - 2)} $$

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


## Print Tower of Hanoi Solution

Tower of Hanoi은 한 봉에 있는 서로 다른 크기의 Disk들을 다른 봉으로 옮기는 문제이다.

Rules
1. 한 번에 하나의 Disk를 이동 가능
2. 쌓여있는 Disk들 중 가장 위의 Disk만 이동 가능
3. Disk는 자신보다 크기가 큰 Disk 위에만 놓일 수 있음

> Base Case (1 Disk)
> : $$ \text{print(from → to) } \text{ if } \text{1 Disk} $$

> Recursive Case
> : $$ \text{1. move(n - 1 disks from → other)}, \\ \text{2. move(1 disk from → to)}, \\ \text{3. move(n - 1 disks other → to)} $$

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

## Solving Simple Sudoku

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