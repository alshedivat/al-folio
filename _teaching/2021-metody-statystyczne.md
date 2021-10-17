---
layout: page
title: Metody statystyczne (ćwiczenia)
description: WFAIS.IF-XO323.0  
img: /assets/img/matrix.jpg
# importance: 3
category: 21/22Z
show: true
---

Zajęcia są prowadzonę w sali `G-1-08` we wtorki od 10:00 do 13:00.
Ćwiczenia są na przemian z wykładem, proszę śledzić aktualne informację o
tym jakie zajęcie będzie w odpowiedni wtorek ewentualnie sprawdzać u [mnie](/)
lub [Profesorza Skibińskiego](mailto:roman.skibinski@uj.edu.pl).

Na każdych zajęciach będzie zbierana lista obecności. Dopuszczalne są dwie nieusprawiedliwione nieobecności. 
Studenci będą otrzymywały zestawy zadań (będą one też udostępniany na tej stronie). Minimalnym warunkiem zaliczenia jest wykonanie co najmniej 60 % zadań z każdego zestawu. Jednak liczba wykonanych zadań wpłynie na ocenę końcową, więc im więcej zadań zastanie wykonane, tym lepiej. Konkretna skala ocen będzie podana przed końcem semestru.

Zadania zaliczane są podczas trwania zajęć, wystarczy zademonstrować działanie odpowiedniego programu oraz krótko o nim opowiedzieć. <!--Studenci mają możliwość dorobić zadania w domu, ale ono muszą być oddane nie później niż na kolejnych zajęciach.--> Do wykonania zadania każdy może wybrać dowolny język lub środowisko programistyczne, jednak zabronione jest używanie jakichkolwiek bibliotek i funkcji statystycznych lub pomocniczych.

*Dodatkowo proszę pamiętać o częstej dezynfekcji rąk oraz monitorować bieżące zarządzenia związane z COVID.*

<!-- Warunkiem zaliczenia jest wykonanie minimum 80% zadań z każdego zestawu
i obecnośc na zajęciach () -->

### **Zestaw 1**

[Slajdy](/assets/teaching/2021_winter/1_Urbanevych_2021.pdf){:target="_blank"}

##### **Generator liczb losowych**

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
  


##### **Ruina gracza**
Ruina gracza dla 2 graczy: gracz **A** z kapitalem początkowym **a** i
gracz **B** z kapitalem początkowym **b**.
Dla każdego z problemów wyniki są pobierane z zaimplementowanej
symulacji gry(gier) ruiny gracza.  
**N** - parametr który wyznaćza iłość symulowanych gier.
Dla róźnych zadań ten parametr może być róźnym, ale generalnie
(im więcej tym lepiej). Ten parametr może być wybrany tak,
że by symulacją trwała nie za długo.

- **Problem B**  
  **a** = 50, **b** = 50  
  Symulacja **N** gier z róźnymi
  wartościami $$p_A$$. Dla każdej wartości obliczyć prawdopodobieństwo
  ruiny gracza **A**. 
  1. Wykres $$P_{ruiny}(p_A)$$ - zależności prawdopodobieństwa ruiny gracza A od 
    prawdopodobieństwa wygranej w jednej rozgrywce $$p_A$$
  2. Porównanie z wynikiem teoretycznym
  3. Spróbować dla róźnych wartościej **a** i **b**

- **Problem C**  
**a**+**b**=100;  
$$p_A = \frac{1}{2}$$  
Symulacja **N** gier z róźnymi
  wartościami **a**. Dla każdej wartości obliczyć prawdopodobieństwo
  ruiny gracza **A**. 
  1. Wykres $$P_{ruiny}(a)$$ - zależności prawdopodobieństwa ruiny gracza A od 
    początkowego kapitalu a
  2. Porównanie z wynikiem teoretycznym
  3. Spróbować dla róźnych wartościej $$p_A$$

- **Problem D**  
**L** - liczba rozgrywek do ukończenia gry  
$$p_A = \frac{1}{2}, \frac{1}{5}, \frac{4}{5}$$;  
**a** = **b**=50  
Proponowana całkowita liczba gier **N** = 20000
Symulacja **N** gier i dla każdej gry obliczyć iłość rozgrywek. 
  1.  Histogram prawdopodobieństwa P(L) - liczby rozgrywek do ukończenia gry
  2.  Wyliczyć średnią długość rozgrywki 

- **Problem E**  
**N** - wybrana wartość symulowanych gier  
Symulacja **N** gier z róźnymi wartościami $$p_A$$.
Dla każdej wartości $$p_A$$ obliczyć maksymalną iłość rozgrywek.
  1. Wykres $$L_{max}(p_A)$$ - maksymalna długość rozgrywek $$L_{max}$$ przy **N** rozgrywkach jako zależność od wartości $$p_A$$

- **Problem G** *(Nie obowiązkowe)*  
**n** = 2,10,20,...,100  
**a**=**b**=50  
$$p_A = \frac{1}{2}, \frac{1}{5}, \frac{4}{5}$$
Symylacja **n** rozgrywek **N** razy.
  1. Histogram prawdopodobieństwa **P(M)** - że gracz **A** ma kapitał **M** po **n** rozgrywkach

- **Problem H**  
  Symulacja kilku gier (do 10)  
  spróbować dla różnych wartościej $$p_A$$
  1. Wykres trajektorii **liczby wygranych**  jednego z graczy jako zależność od numera rozgrywki
  2. Wykres trajektorii **kapitału** jednego z graczy jako zależność od numera rozgrywki  


- **Problem I**  
  Problemy B, C, D, H dla kilku graczy  
  *(studenci dostają 1 punkt za każdy problem)*

---

<!-- ### **Zestaw 2** -->