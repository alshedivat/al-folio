---
layout: page
title: Metody statystyczne
description: ćwiczenia 
img: /assets/img/matrix.jpg
# importance: 3
category: zima 2021/2022
show: true
---

Zajęcia są prowadzonę w sali `G-1-08` we wtorki od 10:00 do 13:00.
Ćwiczenia są na przemian z wykładem, proszę śledzić aktualne informację o
tym jakie zajęcie będzie w odpowiedni wtorek ewentualnie sprawdzać u [mnie](/)
lub [Profesorza Skibińskiego](mailto:roman.skibinski@uj.edu.pl).

<!-- Warunkiem zaliczenia jest wykonanie minimum 80% zadań z każdego zestawu
i obecnośc na zajęciach () -->

### Zestaw 1

[Slajdy](/assets/teaching/2021_winter/1_Urbanevych_2021.pdf){:target="_blank"}

##### Generator liczb losowych

- **Problem A1**
  1. Implementacja generatoru liczb losowych z
    rozkładu normalnego $$N(0,1)$$ metodą polarną
  2. Narysowanie histogramu i porównanie ze wzorem analitycznym
  3. Obliczyć eksperymentalne wartości średniej oraz wariancji
- **Problem A2**
  1. Implementacja generatoru liczb losowych z rozkładu Cauchy'ego $$C(y_0,\gamma)$$, metodą odwróconej dystrybuanty:
$$
\begin{equation}
  f(y) = \frac{1}{\pi\gamma\left[1+\left(\frac{y-y_0}{\gamma}\right)^2\right]}, \qquad y \in (-\infty, \infty)\nonumber
\end{equation}
$$
  2. Narysowanie histogramu i porównianie ze wzorem analitycznym
    dla różnych wartościej $$y_0$$ i $$\gamma$$
  3. Obliczyć eksperymentalne wartości średniej oraz wariancji
  


##### Ruina gracza
Ruina gracza dla 2 graczy: gracz **A** z kapitalem początkowym **a** i
gracz **B** z kapitalem początkowym **b**.
Dla każdego z problemów wyniki są pobierane z zaimplementowanej
symulacji gry(gier) ruiny gracza.

- **Problem B**  
  a = 50, b = 50
  1. Wykres zależności prawdopodobieństwa ruiny gracza A od 
    prawdopodobieństwa wygranej w jednej rozgrywce $$p_A$$, $$P_{ruiny}(p_A)$$
  2. Porównanie z wynikiem teoretycznym
  3. Spróbować dla róźnych wartościej a i b

- **Problem C**  
a+b=100; $$p_A = \frac{1}{2}$$
  1. Wykres zależności prawdopodobieństwa ruiny gracza A od 
    początkowego kapitalu a, $$P_{ruiny}(a)$$
  2. Porównanie z wynikiem teoretycznym
  3. Spróbować dla róźnych wartościej $$p_A$$

- **Problem D**  
**L** - liczba rozgrywek do ukończenia gry  
$$p_A = \frac{1}{2}, \frac{1}{5}, \frac{4}{5}$$; a=b=50  
całkowita liczba gier = 20000 (im więcej tym lepiej)
  1.  Histogram prawdopodobieństwa liczby rozgrywek do ukończenia gry P(L)
  2.  Wyliczyć średnią długość rozgrywki 

- **Problem E**
  1. Wykres maksymalną długości rozgrywek $$L_{max}$$ przy N rozgrywkach
    jako zależność od wartości $$p_A$$ $$L_{max}(p_A)$$

- **Problem G** (Nie obowiązkowe)  
n = 2,10,20,...,100  
a=b=50  
$$p_A = \frac{1}{2}, \frac{1}{5}, \frac{4}{5}$$
  1. Histogram prawdopodobieństwa że gracz A ma kapitał M po n rozgrywkach P(M)

- **Problem H**  
  kilka gier (do 10)  
  różne wartości $$p_A$$
  1. Wykres trajektorii **liczby wygranych**  jednego z graczy jako zależność od numera rozgrywki
  2. Wykres trajektorii **kapitału** jednego z graczy jako zależność od numera rozgrywki  


- **Problem I**  
  Problemy B, C, D, H dla kilku graczy