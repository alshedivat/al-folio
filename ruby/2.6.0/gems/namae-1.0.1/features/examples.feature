Feature: Parse the names in the Readme file
	As a hacker who works with Namae
	I want to be able to parse all the examples in the Readme file

  Scenario Outline: Names Parsing
    When I parse the name "<name>"
    Then the parts should be:
      |  given  |  particle  |  family  |  suffix  |  title  |  appellation  |  nick  |
      | <given> | <particle> | <family> | <suffix> | <title> | <appellation> | <nick> |

    @readme @display
    Scenarios: Readme examples (display-order)
      | name                         | given        | particle | family       | suffix | title     | appellation | nick |
      | Charles Babbage              | Charles      |          | Babbage      |        |           |             |      |
      | Mr. Alan M. Turing           | Alan M.      |          | Turing       |        |           | Mr.         |      |
      | Yukihiro "Matz" Matsumoto    | Yukihiro     |          | Matsumoto    |        |           |             | Matz |
      | Sir Isaac Newton             | Isaac        |          | Newton       |        | Sir       |             |      |
      | Prof. Donald Ervin Knuth     | Donald Ervin |          | Knuth        |        | Prof.     |             |      |
      | Lord Byron                   |              |          | Byron        |        | Lord      |             |      |
      | Ms. Sofia Kovalevskaya       | Sofia        |          | Kovalevskaya |        |           | Ms.         |      |
      | Countess Ada Lovelace        | Ada          |          | Lovelace     |        | Countess  |             |      |
      | Augusta Ada King             | Augusta Ada  |          | King         |        |           |             |      |
      | Julia Herr                   | Julia        |          | Herr         |        |           |             |      |
      | Herr, Julia                  | Julia        |          | Herr         |        |           |             |      |

    @readme @sort
    Scenarios: Readme examples (sort-order)
      | name                         | given        | particle | family           | suffix | title | appellation | nick |
      | Carreño Quiñones, María-Jose | María-Jose   |          | Carreño Quiñones |        |       |             |      |

    @issues @appellation @nick @suffix
    Scenarios: Nicknames Appellations and Suffices
      | name                              | given        | particle | family       | suffix | title     | appellation | nick |
      | Mr. Yukihiro "Matz" Matsumoto     | Yukihiro     |          | Matsumoto    |        |           | Mr.         | Matz |
      | Yukihiro "Matz" Matsumoto Sr.     | Yukihiro     |          | Matsumoto    | Sr.    |           |             | Matz |
      | Mr. Yukihiro "Matz" Matsumoto Sr. | Yukihiro     |          | Matsumoto    | Sr.    |           | Mr.         | Matz |
