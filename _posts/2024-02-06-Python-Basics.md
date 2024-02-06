## Les différents types natifs
Il existe plusieurs types natifs comme les chaînes de caractères (qui sont en fait tout simplement du texte), les nombres et les booléens (qui vont nous permettre de travailler par la suite avec des conditions).

Il existe d'autres types natifs qui peuvent être construits à partir de ces trois types de base.

👉 On retrouve par exemple les listes et les tuples qui nous permettent de représenter une séquence de différents éléments ([1, 2, 3, 4]).

👉 Les types d'ensembles comme les sets et frozen set, qui permettent de réaliser des opérations d'union, de différences ou encore d'intersection

👉 Les types de correspondances avec les dictionnaires, qui sont un autre moyen d'organiser des données avec un système de clés et de valeurs.

Dans les prochaines parties, on va s'intéresser aux types natifs de base que sont les chaînes de caractères, les nombres et les booléens.

Les autres types natifs que je viens d'énoncer sont un peu plus complexes et disposent de formations qui leur sont entièrement dédiés et ce ne sont finalement que des façons d'organiser et d'agencer dans d'autres structures ces trois types natifs de base que l'on va voir dans les prochaines parties.

## Les chaînes de caractères
Une chaîne de caractères, c'est ce qu'on appelle communément du texte.

Elle peut contenir autant de caractères que nécessaire. On pourrait donc sans problème stocker, par exemple, un livre entier dans une chaîne de caractères.

Il est également possible de créer des chaînes de caractères vides sans que cela ne pose de problème à Python.

Une chaîne de caractères elle est délimitée par des guillemets. Ces guillemets peuvent être simples ou doubles. Le guillemet simple, c'est l'équivalent de ce qu'on appelle en français une apostrophe.

Quelques exemples de chaînes de caractères

`code`
une_chaine_vide = ''
une_chaine_vide_guillemets_doubles = ""
lorem = "Lorem ipsum dolor sit amet..."
`code`

Personnellement, je vous conseille d'utiliser principalement des guillemets doubles. Pourquoi ? Eh bien, tout simplement parce qu'avec des guillemets simples, c'est assez embêtant si vous souhaitez mettre des apostrophes dans votre texte. Prenons l'exemple de cette chaîne de caractères délimitée par des guillemets doubles :

phrase = "Je m'appelle Patrick"
L'apostrophe du mot « m'appelle » ne pose ici pas de problème, car notre chaîne de caractères est définie avec des guillemets doubles. Si, par contre, je remplace les guillemets doubles par des guillemets simples, on se retrouve avec un problème qui est indiqué par la coloration syntaxique :

phrase = 'Je m'appelle Patrick'
L'apostrophe du mot « m'appelle » met fin à la chaîne de caractères qui est initiée avec le premier guillemet simple. Si vous essayez de faire ceci dans un interpréteur Python, vous aurez donc une erreur de syntaxe.

Une des solutions à ce problème, c'est d'utiliser un antislash. L'antislash permet en effet de faire ce qu'on appelle un échappement, c'est-à-dire signifier à un caractère qu'il ne doit pas être utilisé pour sa fonction première, dans ce cas-ci, délimiter une chaîne de caractères, mais qu'il doit tout simplement être utilisé comme un caractère textuel.

Si vous essayez ce code dans un interpréteur Python, vous n'aurez cette fois plus d'erreur et vous voyez que l'antislash ne se retrouve pas dans la chaîne de caractères affichée :

phrase = 'Je m\'appelle Patrick'
On a donc bien l'apostrophe qui se retrouve correctement au milieu de notre chaîne de caractères.

Mais la façon la plus simple de procéder reste donc d'utiliser des guillemets doubles. Vous pourrez ainsi insérer des apostrophes dans votre chaîne de caractères sans vous soucier de devoir les échapper avec un antislash.

Le dernier type de chaîne de caractères que l'on peut créer, c'est une chaîne de caractères qu'on appelle multiligne. Pour cela, il suffit d'utiliser trois guillemets au début et à la fin de la chaîne de caractères en question :

instructions = """
1. Battre les oeufs
2. Mettre le sucre
3. Rajouter la crème
4. « Attendez la crème... »
"""
À noter que là encore, vous pouvez très bien utiliser des guillemets simples à la place des guillemets doubles. Et pour une chaîne de caractères multiligne, les apostrophes à l'intérieur de votre texte ne posent pas de problème.

Dernier point important à aborder certains caractères sont interprétés de façon particulière lorsqu'ils sont précédés d'un antislash.

Par exemple, \n sera interprété comme un retour à la ligne :

>>> print("Bonjour\nTout le monde")
Bonjour
Tout le monde
Et si vous souhaitez faire un cœur, vous pouvez utiliser \u, suivi du numéro correspondant au symbole dans la base de données des caractères Unicode :

>>> print("\u2764")
❤
Pour éviter que ces caractères soient interprétés par Python, on peut utiliser ce qu'on appelle les « raw-string », que l'on pourrait traduire en français par « chaîne de caractères brute ».

Ça peut être très pratique, par exemple quand vous travaillez avec des chemins de dossier, notamment sur Windows. Dans le cas du chemin de dossier suivant, on a un \t et un \n qui, par défaut, vont être interprétés comme une tabulation et un retour à la ligne :

>>> print("c:\dossiers\thibault\nouveautes")
c:\dossiers    hibault
ouveautes
Pour éviter qu'il soit interprété, il suffit de rajouter la lettre « r » devant les guillemets de la chaîne de caractères. Ainsi, la chaîne de caractères sera interprétée de façon brute et \t et \n seront insérés tel quel :

>>> print(r"c:\dossiers\thibault\nouveautes")
c:\dossiers\thibault\nouveautes
Pour finir, voici donc une liste non exhaustive des caractères qui sont interprétés de façon spéciale par Python lorsqu'ils sont précédés d'un antislash. Il faudra donc porter attention aux chaînes de caractères qui peuvent contenir ces suites de caractères et, le cas échéant, envisager d'utiliser une chaîne de caractères brute en la précédant de la lettre r :

\a 👉 caractère d'appel (BEL)
\b 👉 caractère de retour arrière
\f 👉 saut de page
\n 👉 retour à la ligne
\r 👉 retour chariot
\t 👉  tabulation horizontale
\v 👉 tabulation verticale
