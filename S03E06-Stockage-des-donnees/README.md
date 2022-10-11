# 1. Cookie et localStorage

Intérêts des cookies et du local storage :
- Ce sont 2 moyens de mémoriser une information du côté de l'utilisateur (côté client/navigateur)
- [cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)
- [localStorage](https://developer.mozilla.org/fr/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API) + [ici](https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage)

- Enregistrer info sur client retrouvable après avoir fermé puis rouvert le navigateur => le serveur n'a rien à voir dedans!

- Intérêt: mémoriser préférences,(taille de police ou un thème sombre)

- Scripts JS: accès aux infos

- Le but est le même entre cookies et localStorage.

**Cependant**, il y a quelques différences :

**Cookie**

- :warning: Remarques importantes sur les cookies : 
  - Généralement: durée de vie limitée :hourglass_flowing_sand: 
  - Taille limitée
  - Transmis dans chaque requête HTTP (peu alourdir communication client et le serveur) => uniquement données utiles côté serveur

- Les cookies peuvent être créés : 
  - Soit côté client: JS exécuté dans le navigateur
  - Soit côté serveur: PHP (par exemple), par ex conserver authentification : AUTRE SAISON
- Possibles cookies **tiers**, liés à d'autres domaines, pour de la pub, pour des outils liés à un service vidéo comme Youtube
- :information_source: Cookies => consentement : on envoie des données perso sur un serveur ! Voir [CNIL](https://www.cnil.fr/fr/cookies-et-traceurs-que-dit-la-loi)

**LocalStorage**

- Lié au **domaine** qui fait tourner notre application, on ne peut pas récupérer des infos qui auraient été mises de coté sur Facebook alors qu'on est sur Youtube
- Plus pratique à utiliser que les cookies
- :no_entry_sign: LocalStorage ne vont pas dans requêtes HTTP
- Pas de limite de conservation des données

## Exemple

- Créer un dossier `cookies_exemple`
- Créer dedans `index.html` et `cookies.js`
- Appeler le fichier ``

## Cookie

:warning: Garder le maximum de temps pour le localStorage.

L'écriture est plutôt pratique :

```js
// document.cookie = 'cle=valeur';
// ajoute un cookie avec la clé lang et la valeur français
document.cookie = 'lang=français';
```

Dans inspecteur > Navigation / Storage Coorkis / Localhost (lancé depuis serveur web) observer

La lecture est un peu plus complexe :

```js
console.log(document.cookie); // donne toute la grande String contenant tous les cookie

// pour lire un cookie il faut "un peu" de logique
const cookiesAsArray = document.cookie.split('; ');
// on parcourt le tableau
for (const cookie of cookiesAsArray) {
    // si la chaîne commence par le début du cookie qui nous intéresse
    if (cookie.startsWith('nomDuCookieRecherché')) {
        // on découpe le contenu du cookie
        const cookieInfo = cookie.split('=');
        // pour récupérer que la valeur
        const value = cookieInfo[1];
        // la valeur est trouvée
        console.log(value);
    }
}

// ou bien on peut faire cette logique une fois et la reporter dans une fonction paramétrable et réutilisable, et ça c'est beau !
```

## LocalStorage

Ecriture : 

```js
// l'objet localStorage est global, il est toujours disponible :
// - via la méthode setItem on sauvegarde une information, même si je quitte la page et que je reviens, l'information est persistante
// - on passe 2 arguments, la clé pour retrouver la valeur plus tard, et la valeur
localStorage.setItem('age', 31);
```

Lecture :

```js
// via la méthode getItem, on récupère la valeur, il faut passer la clé en argument
const userAge = localStorage.getItem('age');
console.log(userAge); // '31'
```

**:warning: Le localStorage ne gère que des String**

Si on veut stocker n'importe quel type de données (un objet, un tableau, un booléen, ...), on peut le transformer en String via :

```js
const valeurATransformer = true;
JSON.stringify(valeurATransformer);
```

**Le JSON (JavaScript Object Notation) est un format de données textuelles** dérivé de la notation des objets du langage JavaScript. Comme c'est du texte, on peut donc le stocker dans le localStorage :sunglasses:  

```js
const trucASauvegarder = {
    age: 31,
    color: 'orange',
};

const chaineDeCaractereASauvegarder = JSON.stringify(trucASauvegarder);
localStorage.setItem('data', chaineDeCaractereASauvegarder);
```

On peut ensuite faire machine arrière à la lecture et rendre le bon type à notre string via `JSON.parse`. On récupère alors des variables JS avec leur type originale (avant transformation en JSON) et directement utilisables dans notre code :ok_hand: 

```js
const dataAsString = localStorage.getItem('data');
const data = JSON.parse(dataAsString);

console.log(data.age);
console.log(data.color);
```

## SessionStorage

Différence avec localstorage: Si on ferme le navigateur, les données sont effacées.

Pour le reste, sessionStorage s'utilise quasiment de la même façon que le localStorage :
- **sauf** qu'on utilise `sessionStorage` au lieu de `localStorage`
- on pourra donc :
  - ajouter/modifier une information avec `sessionStorage.setItem('key','value');`
  - récupérer une information avec `sessionStorage.getItem('key');`
  - supprimer une information avec `sessionStorage.removeItem('key');`
  - supprimer toutes les informations avec `sessionStorage.clear();`

# 2. Fonctionnalité sur Trip'Odvisor

## Sauvegarder l'activation du dark mode

- Sondage:

```
Quelle solution utiliser pour sauvegarder l'état du dark mode ?
`cookie`
`localStorage`
`sessionsStorage`
`post-it collé sur l'écran`
```
- Résultat de la réflexion : 
  - cookie, non: pas utile côté serveur
  - sessionStorage, non: car on veut conserver la préférence de l'utilisateur même s'il ferme son navigateur
  - localStorage :ok_hand: 
- On code dans notre module dark

### Code

> JSON, localStorage, objets, méthodes, DOM lecture/écriture, évènements, classList, conditions

- On va ajouter la méthode `saveToLocalStorage` qui sauvegarde l'état du thème dans le localStorage
- On crée la méthode `initLocalState` qui vérifie le thème sauvegardé et on l'appelle au chargement de la page dans `init`

:information_source: **Montrer le contenu du localStorage** via les Devtools/Application/Storage/LocalStorage.

:warning: Comme on utilise le domaine **localhost**, il y aura d'autres valeurs présentes dans le localStorage et pas seulement celles de notre site. 
En production: notre propre nom de de domaine donc pas ce souci.

`theme.js` ajouter:

```js
// Initialisation du localstorage au chargement de la page

// Récupération du localstorage et application de sa valeur sur le body

// Enregistrement de la valeur du thème à chaque changement

```

```js
const theme = {

    // Initialisation du localstorage au chargement de la page
    init: function() {
        // [...]

        // Au chargement de la page, on vérifie si le localStorage contient une valeur pour le theme sombre/clair
        theme.initLocalState();

    },
    
    // Récupération du localstorage et application de sa valeur sur le body
    initLocalState: function() {

        // On récupère la valeur du thème dans le localStorage
        const localSave = localStorage.getItem('darkMode');

        // On transforme la chaîne de caractères en booléen
        const isDark = JSON.parse(localSave);

        // Si "isDark" contient true, c'est que le thème est en mode dark
        if (isDark) {
            // On applique le thème dark
            document.body.classList.add('theme-dark');
        }
    },

    // Enregistrement de la valeur du thème à chaque changement
    toggleDark() {

        // [...]

        // On sauvegarde le thème dans le localStorage

        // On vérifie si le body contient le theme dark
        // contains renvoie true si la classe est présente, false sinon.
        const isDark = document.body.classList.contains('theme-dark');

        // On transforme la valeur booléenne en chaîne de caractères
        const newLocalSave = JSON.stringify(isDark);

        // On sauvegarde le theme dans le localStorage
        localStorage.setItem('darkMode', newLocalSave);

    }
};

document.addEventListener('DOMContentLoaded', theme.init);
```

# Challenge

- https://github.com/O-clock-Lara/S03-E06-challenge-theme-color [MODIF_LIEN]