---
layout: post
title: Python-Basics
date: 2024-02-06
description: Python basics
tags: python basics code
categories: code
featured: true
toc:
  sidebar: left
---



## Les différents types natifs
Il existe plusieurs types natifs comme les chaînes de caractères (qui sont en fait tout simplement du texte), les nombres et les booléens (qui vont nous permettre de travailler par la suite avec des conditions).

Il existe d'autres types natifs qui peuvent être construits à partir de ces trois types de base.

👉 On retrouve par exemple les listes et les tuples qui nous permettent de représenter une séquence de différents éléments ([1, 2, 3, 4]).

👉 Les types d'ensembles comme les sets et frozen set, qui permettent de réaliser des opérations d'union, de différences ou encore d'intersection

👉 Les types de correspondances avec les dictionnaires, qui sont un autre moyen d'organiser des données avec un système de clés et de valeurs.

Dans les prochaines parties, on va s'intéresser aux types natifs de base que sont les chaînes de caractères, les nombres et les booléens.

Les autres types natifs que je viens d'énoncer sont un peu plus complexes et disposent de formations qui leur sont entièrement dédiés et ce ne sont finalement que des façons d'organiser et d'agencer dans d'autres structures ces trois types natifs de base que l'on va voir dans les prochaines parties.

---

## Les chaînes de caractères
Une chaîne de caractères, c'est ce qu'on appelle communément du texte.

Elle peut contenir autant de caractères que nécessaire. On pourrait donc sans problème stocker, par exemple, un livre entier dans une chaîne de caractères.

Il est également possible de créer des chaînes de caractères vides sans que cela ne pose de problème à Python.

Une chaîne de caractères elle est délimitée par des guillemets. Ces guillemets peuvent être simples ou doubles. Le guillemet simple, c'est l'équivalent de ce qu'on appelle en français une apostrophe.

Quelques exemples de chaînes de caractères

````markdown
```python
une_chaine_vide = ''
une_chaine_vide_guillemets_doubles = ""
lorem = "Lorem ipsum dolor sit amet..."
```
````

Personnellement, je vous conseille d'utiliser principalement des guillemets doubles. Pourquoi ? Eh bien, tout simplement parce qu'avec des guillemets simples, c'est assez embêtant si vous souhaitez mettre des apostrophes dans votre texte. Prenons l'exemple de cette chaîne de caractères délimitée par des guillemets doubles :

`phrase = "Je m'appelle Patrick"`
L'apostrophe du mot « m'appelle » ne pose ici pas de problème, car notre chaîne de caractères est définie avec des guillemets doubles. Si, par contre, je remplace les guillemets doubles par des guillemets simples, on se retrouve avec un problème qui est indiqué par la coloration syntaxique :

`phrase = 'Je m'appelle Patrick'`
L'apostrophe du mot « m'appelle » met fin à la chaîne de caractères qui est initiée avec le premier guillemet simple. Si vous essayez de faire ceci dans un interpréteur Python, vous aurez donc une erreur de syntaxe.

Une des solutions à ce problème, c'est d'utiliser un antislash. L'antislash permet en effet de faire ce qu'on appelle un échappement, c'est-à-dire signifier à un caractère qu'il ne doit pas être utilisé pour sa fonction première, dans ce cas-ci, délimiter une chaîne de caractères, mais qu'il doit tout simplement être utilisé comme un caractère textuel.

Si vous essayez ce code dans un interpréteur Python, vous n'aurez cette fois plus d'erreur et vous voyez que l'antislash ne se retrouve pas dans la chaîne de caractères affichée :

`phrase = 'Je m\'appelle Patrick'`
On a donc bien l'apostrophe qui se retrouve correctement au milieu de notre chaîne de caractères.

Mais la façon la plus simple de procéder reste donc d'utiliser des guillemets doubles. Vous pourrez ainsi insérer des apostrophes dans votre chaîne de caractères sans vous soucier de devoir les échapper avec un antislash.

Le dernier type de chaîne de caractères que l'on peut créer, c'est une chaîne de caractères qu'on appelle multiligne. Pour cela, il suffit d'utiliser trois guillemets au début et à la fin de la chaîne de caractères en question :

```python
instructions = """
1. Battre les oeufs
2. Mettre le sucre
3. Rajouter la crème
4. « Attendez la crème... »
"""
```

À noter que là encore, vous pouvez très bien utiliser des guillemets simples à la place des guillemets doubles. Et pour une chaîne de caractères multiligne, les apostrophes à l'intérieur de votre texte ne posent pas de problème.

Dernier point important à aborder certains caractères sont interprétés de façon particulière lorsqu'ils sont précédés d'un antislash.

Par exemple, \n sera interprété comme un retour à la ligne :

```python
>>> print("Bonjour\nTout le monde")
Bonjour
Tout le monde
```
Et si vous souhaitez faire un cœur, vous pouvez utiliser \u, suivi du numéro correspondant au symbole dans la base de données des caractères Unicode :

```python
>>> print("\u2764")
❤
```

Pour éviter que ces caractères soient interprétés par Python, on peut utiliser ce qu'on appelle les « raw-string », que l'on pourrait traduire en français par « chaîne de caractères brute ».

Ça peut être très pratique, par exemple quand vous travaillez avec des chemins de dossier, notamment sur Windows. Dans le cas du chemin de dossier suivant, on a un \t et un \n qui, par défaut, vont être interprétés comme une tabulation et un retour à la ligne :

```python
>>> print("c:\dossiers\thibault\nouveautes")
c:\dossiers    hibault
nouveautes
```

Pour éviter qu'il soit interprété, il suffit de rajouter la lettre « r » devant les guillemets de la chaîne de caractères. Ainsi, la chaîne de caractères sera interprétée de façon brute et \t et \n seront insérés tel quel :

```python
>>> print(r"c:\dossiers\thibault\nouveautes")
c:\dossiers\thibault\nouveautes
```
Pour finir, voici donc une liste non exhaustive des caractères qui sont interprétés de façon spéciale par Python lorsqu'ils sont précédés d'un antislash. Il faudra donc porter attention aux chaînes de caractères qui peuvent contenir ces suites de caractères et, le cas échéant, envisager d'utiliser une chaîne de caractères brute en la précédant de la lettre r :

```python
\a 👉 caractère d'appel (BEL)
\b 👉 caractère de retour arrière
\f 👉 saut de page
\n 👉 retour à la ligne
\r 👉 retour chariot
\t 👉  tabulation horizontale
\v 👉 tabulation verticale
```

## Les nombres

Avec Python, on fait la distinction entre deux types de nombres que l'on va voir dans cette partie :

Les nombres entiers.
Les nombres décimaux.
Les nombres entiers, c'est tout simplement des nombres qui n'ont pas de décimales après la virgule. Ça peut être bien entendu, des nombres positifs comme des nombres négatifs.

Vous pouvez représenter, grâce au nombre entier, des nombres très importants. La seule limite vraiment, c'est la mémoire de votre ordinateur.

Depuis la version 3.6 de Python, il est également possible de rendre plus facile la lecture des nombres entiers avec la possibilité d'insérer des tirets du bas dans un nombre sans que cela ne cause d'erreur.

Vous pouvez placer ces tirets du bas où bon vous semble, mais généralement, on s'en sert pour séparer les milliers et rendre plus rapide l'identification d'un nombre.

```python
1000000
1_000_000
```

Le deuxième type de nombres qu'on utilise, ce sont les nombres décimaux que l'on appelle également nombres flottants.

Ce sont tout simplement des nombres qui contiennent des décimales après la virgule.

Pour définir un nombre décimal avec Python, on n'utilise pas la virgule, mais le point. Si vous utilisez une virgule à la place du point, Python vous retournera une erreur.

Là encore, les nombres peuvent être positifs comme négatifs. Et même si le nombre après la virgule est zéro ce nombre sera tout de même considéré par Python comme un nombre décimal et ne sera donc pas converti en nombre entier.

```python
10.0  # 10.0 est un nombre décimal
10    # 10 est un nombre entier
```
Dès que vous avez un point à l'intérieur d'un nombre, même si les décimales après le point sont zéro, ce nombre sera considéré comme un nombre décimal et non plus comme un nombre entier.

## Les booléens

Un booléen, c'est un objet qui ne peut prendre que deux valeurs : True et False, qui signifient vrai et faux.

Les booléens sont des types natifs qui sont une sous-classe des nombres entiers. True et l'équivalent du nombre 1 et False l'équivalent du nombre 0.

Vous pouvez vérifier cette affirmation avec la fonction isinstance. On voit bien avec cette fonction que le type natif bool qui correspond aux booléens est une sous-classe du type int qui représente les nombres entiers :

```python
>>> issubclass(bool, int)
True
```
On peut ainsi sans problème additionner des booléens avec des nombres :

```python
>>> True + 1
2
>>> False + 5
5
```

Pour l'instant, cela ne vous semble peut-être pas très utile, mais je vous assure que dans certains cas bien précis, ça peut être très intéressant.

Il faut savoir également que tous les objets peuvent être vrais ou faux. En anglais, on appelle ça des « truthy » ou « falsy ». Pour vérifier si un objet est vrai ou faux, on peut utiliser la fonction bool.

Vous pouvez lui passer n'importe quel objet, comme ici la chaîne de caractères "Bonjour" et la fonction bool vous retournera True ou False :

```python
>>> bool("Bonjour")
True
```
Dans ce cas-ci, la fonction bool retourne True, car la chaîne de caractères contient au moins un caractère.

Tous les objets ont une valeur qui, par défaut, est considérée comme False et toutes les autres valeurs qui sont considérées comme True.

Par exemple pour les chaînes de caractères, seule une chaîne de caractères vide est considérée comme fausse. Dès que vous avez au moins un caractère, l'évaluation de la chaîne de caractères avec la fonction bool est vraie :

```python
>>> bool("")
False
>>> bool("1")
True
>>> bool("Docstring")
True
```
Pour les nombres, que ce soient les nombres entiers ou décimaux, c'est la valeur de zéro qui est considérée comme fausse. Toutes les autres valeurs, que ce soit un nombre négatif ou positif, sont considérées comme vraies :

```python
>>> bool(0)
False
>>> bool(0.0)
False
>>> bool(1)
True
>>> bool(-1)
True
>>> bool(287)
True
```
Pour les types séquentiels comme les listes ou les dictionnaires, ils sont considérés comme faux s'ils sont vides. Dès qu'ils contiennent au moins un élément, ils sont considérés comme vrais :

```python
>>> bool([])  # liste
False
>>> bool(())  # tuple
False
>>> bool({})  # dictionnaire
False
>>> bool([0])
True
>>> bool((0, 255, 255))
True
```
Les booléens, quand on voit ça tout seul, ça ne semble pas avoir beaucoup d'importance. C'est vraiment lorsque vous allez commencer à utiliser des conditions et à créer des expressions plus complexes qui pourront être évaluées comme vraies ou fausses, que vous verrez leur vraie utilité.

## Les constructeurs de types natifs

Avec Python, tous les types natifs de base peuvent être créés directement à partir de leur classe correspondante.

Il y a la classe str pour les chaînes de caractères, int pour les nombres entiers, float pour les nombres décimaux et bool pour les booléens. Ce sont des termes que vous retrouverez très souvent en anglais dans la documentation officielle de Python.

Le nom des classes est cependant raccourci. Les mots entiers en anglais sont string pour chaîne de caractères, integer pour les nombres entiers, float pour les nombres décimaux et boolean pour les booléens.

Tous les objets correspondant aux types natifs de base pourraient ainsi être créés avec ces classes.

```python
>>> str("bonjour")
'bonjour'
>>> int(5)
5
>>> float(10.7)
10.7
>>> bool(True)
True
```
Cependant, ce n'est pas très utile, car Python est suffisamment intelligent pour déterminer le type des objets, grâce par exemple aux guillemets pour les chaînes de caractères, ou au point de la décimale pour les nombres décimaux.

Quand on crée ces objets, on peut donc directement les écrire comme ceci.

```python
>>> "bonjour"
'bonjour'
>>> 5
5
>>> 10.7
10.7
>>> True
True
```
Ces classes sont également appelées des fonctions de conversion. Bien qu'elles puissent ressembler à des fonctions, ce sont dans les faits des classes. Mais là où elles ont un vrai intérêt, c'est qu'elles peuvent être utilisées pour convertir des objets d'un type à un autre.

Par exemple, vous pouvez convertir un nombre entier en chaîne de caractères en utilisant la classe str. Le résultat de l'utilisation de cette classe avec le nombre entier 5 nous donnera la chaîne de caractères "5".

```python
>>> str(5)
'5'
```
On a donc effectué une conversion d'un nombre entier en chaîne de caractères.

Si on veut être très précis, on ne fait pas vraiment une conversion. Concrètement, on crée un nouvel objet de type chaîne de caractères à partir du nombre entier 5. Mais dans les faits, c'est un peu comme si on convertissait un objet d'un type à un autre. C'est pour ça que vous retrouverez souvent ces classes sous le nom de fonctions de conversion.

À l'inverse, la classe int peut être utilisée pour convertir une chaîne de caractères qui contient un nombre, ou si vous préférez pour créer un nouvel objet de type nombre entier, à partir de la chaîne de caractères "2".

```python
>>> int("2")
2
```
Il faut cependant faire attention, car on peut parfois avoir des erreurs en essayant de créer des objets à partir de données que Python n'arrive pas à convertir.

Si vous essayez par exemple, de convertir la chaîne de caractères "bonjour" en nombre, avec la classe int, vous obtiendrez une erreur car Python ne sait pas comment convertir ce mot en nombre entier.

```python
>>> int("bonjour")
ValueError: invalid literal for int() with base 10: 'bonjour'
```
Et c'est assez logique, car il est difficile d'exprimer le mot bonjour sous la forme d'un nombre.

test
test
test
test
