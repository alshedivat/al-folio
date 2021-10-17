---
layout: page
title: Metody statystyczne (ćwiczenia)
description: WFAIS.IF-XO323.0  
img: /assets/img/matrix.jpg
# importance: 3
category: 21/22Z
show: true
---

<!-- - [Zestaw 1](#zestaw-1) -->
<!-- - [Zestaw 2](#zestaw-2) -->

---

Zajęcia są prowadzonę w sali `G-1-08` we wtorki `od 10:00 do 13:10`.
Ćwiczenia są na przemian z wykładem, proszę sprawdzać aktualne informacje o
tym jakie zajęcia będą w nadchodzącym tygodniu. 

Na każdych zajęciach będzie zbierana lista obecności. Dopuszczalne są dwie nieusprawiedliwione nieobecności. 
Zestawy zadań będą udostępniane na tej stronie.
Minimalnym warunkiem zaliczenia jest wykonanie wskazanych obowiązkowych zadań z każdego zestawu.
Jednak liczba wykonanych zadań wpłynie na ocenę końcową - im więcej zadań zostanie wykonane, tym lepiej.
Konkretna skala ocen będzie podana przed końcem semestru. 

Zadania zaliczane są podczas trwania zajęć, wystarczy zademonstrować działanie odpowiedniego programu oraz krótko omówić kod i otrzymywane wyniki. Do wykonania zadania można wybrać dowolny język lub środowisko programistyczne, jednak zabronione jest używanie jakichkolwiek bibliotek i funkcji statystycznych lub pomocniczych (do dyskusji na ćwiczeniach).

*Dodatkowo proszę pamiętać o częstej dezynfekcji rąk oraz monitorować bieżące zarządzenia związane z COVID.*

<!-- Warunkiem zaliczenia jest wykonanie minimum 80% zadań z każdego zestawu
i obecnośc na zajęciach () -->
---

### **Zestaw 1**

[Slajdy](/assets/teaching/2021_winter/1_Urbanevych_2021.pdf){:target="_blank"}

##### **Generator liczb losowych**

- **Problem A1** *(Obowiązkowe)*
  1. Implementacja generatoru liczb losowych z
    [rozkładu normalnego](https://pl.wikipedia.org/wiki/Rozk%C5%82ad_normalny){:target="_blank"} 
    $$N(0,1)$$ metodą polarną
  2. Narysowanie histogramu i porównanie ze wzorem analitycznym
  3. Obliczyć eksperymentalne wartości średniej oraz wariancji

- **Problem A2** *(Obowiązkowe)*
  1. Implementacja generatoru liczb losowych z 
  2. [rozkładu Cauchy'ego](https://pl.wikipedia.org/wiki/Rozk%C5%82ad_Cauchy%E2%80%99ego){:target="_blank"} $$C(y_0,\gamma)$$, metodą odwróconej dystrybuanty:
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
Po każdej rozgrywce wygrywający gracz otrzymuje jedną jednostkę kapitału od przegranego. Nie ma remisów.  
Dla każdego z problemów wyniki są pobierane z zaimplementowanej
symulacji gry(gier) ruiny gracza.  
**N** - parametr który wyznaćza iłość symulowanych gier, 
dla róźnych zadań ten parametr może być róźnym
(generalnie im więcej tym lepiej, może być wybrany tak,
żeby symulacją nie trwała za długo).

  - **Problem B** *(Obowiązkowe)*  
  **a** = 50, **b** = 50  
  Symulacja **N** gier z róźnymi
  wartościami $$p_A$$. Dla każdej wartości obliczyć prawdopodobieństwo
  ruiny gracza **A**. 
  1. Wykres $$P_{ruiny}(p_A)$$ - zależności prawdopodobieństwa ruiny gracza A od 
    prawdopodobieństwa wygranej w jednej rozgrywce $$p_A$$
  2. Porównanie z wynikiem teoretycznym
  3. Spróbować dla róźnych wartościej **a** i **b**

- **Problem C**  *(Obowiązkowe)*   
**a** + **b** = 100;  
$$p_A = \frac{1}{2}$$  
Symulacja **N** gier z róźnymi
  wartościami **a**. Dla każdej wartości obliczyć prawdopodobieństwo
  ruiny gracza **A**. 
  1. Wykres $$P_{ruiny}(a)$$ - zależności prawdopodobieństwa ruiny gracza A od 
    początkowego kapitalu a
  2. Porównanie z wynikiem teoretycznym
  3. Spróbować dla róźnych wartościej $$p_A$$

- **Problem D** *(Obowiązkowe)*    
**L** - liczba rozgrywek do ukończenia gry  
$$p_A = \frac{1}{2}, \frac{1}{5}, \frac{4}{5}$$;  
**a** = **b**=50  
Proponowana całkowita liczba gier **N** = 20000
Symulacja **N** gier i dla każdej gry obliczyć iłość rozgrywek. 
  1.  Histogram prawdopodobieństwa P(L) - liczby rozgrywek do ukończenia gry
  2.  Wyliczyć średnią długość rozgrywki 

- **Problem E** *(Obowiązkowe)*  
**N** - wybrana wartość symulowanych gier  
Symulacja **N** gier z róźnymi wartościami $$p_A$$.
Dla każdej wartości $$p_A$$ obliczyć maksymalną iłość rozgrywek.
  1. Wykres $$L_{max}(p_A)$$ - maksymalna długość rozgrywek $$L_{max}$$ przy **N** rozgrywkach jako zależność od wartości $$p_A$$

- **Problem G** *(Nie obowiązkowe)*  
**n** = 2,10,20,...,100  
**a** = **b** = 50  
$$p_A = \frac{1}{2}, \frac{1}{5}, \frac{4}{5}$$
Symylacja **n** rozgrywek **N** razy.
  1. Histogram prawdopodobieństwa **P(M)** - że gracz **A** ma kapitał **M** po **n** rozgrywkach

- **Problem H** *(Obowiązkowe)*  
  Symulacja kilku gier (do 10)  
  spróbować dla różnych wartościej $$p_A$$
  1. Wykres trajektorii **liczby wygranych**  jednego z graczy jako zależność od numera rozgrywki
  2. Wykres trajektorii **kapitału** jednego z graczy jako zależność od numera rozgrywki  


- **Problem I** *(Obowiązkowe częściowo)*  
  Problemy B, C, D, H dla kilku, np. pięciu,  graczy  
  *(studenci dostają 1 punkt za każdy problem)*

---

<!-- ### **Zestaw 2** -->