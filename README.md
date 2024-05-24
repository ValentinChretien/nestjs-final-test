# Rendu Final NestJS
Valentin CHRETIEN
Groupe 2
NestJS + MongoDB

## Commande de lancement de l'API (necessite: docker, windows)
npm run start:mongodb

## Commande de lancement des test
npm run test:e2e:mongodb

## Commentaires
J'ai remarquer qu'il arrive que le test ci-dessous ne passe pas et que j'obtienne le résultat suivant mais je n'ai pas trouver l'origine.
Logiquement si il arrive à un 201 c'est qu'il n'a pas trouver de doublon mais on a bien les await dans les tests.
J'ai lancer les test en boucle pour tester et c'est globalement aléatoire.
Le moment ou j'ai le moins le soucis c'est après la suppression de la DB complète.

● UserController › POST / › should return an HTTP error status 409 when given user already exists

    expect(received).toBe(expected) // Object.is equality

    Expected: 409
    Received: 201