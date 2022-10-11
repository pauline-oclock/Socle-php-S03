# Correction challenge color switcher

- https://github.com/O-clock-Lara/S03-E06-challenge-theme-color [MODIF_LIEN]


## 1. Changer de thème

### 1.1 Pose des écouteurs

Dans la méthode `init`, rajouter : 

```js 
// On sélectionne tous les boutons de changement de theme
const colorButtonsElements = document.querySelectorAll('.theme-button');

// On place un écouteur d'événement sur chaque bouton
for (const colorButtonElement of colorButtonsElements) {
   colorButtonElement.addEventListener('click', theme.handleThemeColorClick);
}
    
```

### 1.2 Récupérer le thème choisi

On ajoute le handler qui appelle la méthode de changement de thème.
Si la récupération de l'ID en une ligne est difficile, ne pas hésiter à découper avec une variable intermédiaire

```js
handleThemeColorClick: function(event) {

    // On récupère l'id du bouton cliqué, il contient le nom du thème
    const themeColor = event.target.id;
    
    console.log(themeColor);

    // On passe le nom du thème à la méthode qui va changer le thème
    theme.changeColorTheme(themeColor);
},
```

### 1.3 Changer de thème et 1.4 Gestion du logo
On code la méthode de changement de thème. On pourrait passer par une boucle pour la suppression des anciennes classes mais ici, un simple `remove` suffit.

```js 
changeColorTheme: function(themeColor) {

    // On sélectionne le body
    const bodyElement = document.querySelector('body');

    // On supprime les potentielles classes de thème présentes sur le body
    bodyElement.classList.remove('theme-red', 'theme-blue', 'theme-green');

    // On ajoute la classe correspondant au thème choisi
    bodyElement.classList.add(themeColor);
    
    // On passe à la modification du logo. Donc on "reconstruit" son chemin
    const logoPath = "img/logo-" + themeColor + ".png";

    // On sélectionne le logo
    const logoElement = document.querySelector('.logo__image');

    // On modifie son attribut src
    logoElement.src = logoPath;

},
```

## 2. Sauvegarde des préférences

### 2.1 Sauvegarde du thème

Dans la méthode `handleColorThemeClick`, après l'appel à `changeColorTheme`, on ajoute la ligne qui sauvegarde le theme : 

```js
// On enregistre le thème dans le localStorage.
// Comme le nom du thème est une string, pas besoin de le convertir.
localStorage.setItem('colorTheme', themeColor);
```

### 2.2 Récupération du thème sauvegardé

On termine par la gestion du changement de thème au chargement, en ajoutant dans `initLocalState` : 
```js

// On essaie aussi de voir si on a sauvegardé un thème de couleur dans le localStorage
let colorTheme = localStorage.getItem('colorTheme');
colorTheme = JSON.parse(colorTheme);

// Si on a une valeur, on applique le thème de couleur
if (colorTheme) {
  theme.changeColorTheme(colorTheme);
}
```

## Bonus

2 modifs localstorage => on peut refacto

Créons une méthode générique `theme.saveToLocalStorage()` qui va:
- **recevoir une information**, 
- la **convertir** en JSON  (car on peut vouloir stocker des infos comme des tableaux, qui doivent être converties)
- la **sauvegarder** en localStorage.

Nos deux anciennes méthodes qui sauvegardaient les thèmes de couleur et luminosité feront maintenant appel à cette nouvelle méthode.

**Méthodes à modifier et créer :**

```js

// Nouvelle méthode à créer
// Cette méthode est générique, elle reçoit une valeur à sauvegarder ainsi qu'une clé pour l'identifier.
// Elle convertit la valeur en JSON (pour qu'on puisse lui passer n'importe quel type de donnée) puis la sauvegarde
saveToLocalStorage: function(keyToSave, valueToSave) {

    // On transforme la valeur reçue en JSON
    const jsonValue = JSON.stringify(valueToSave);

    // On la sauvegarde dans le localStorage, à la clé passée en paramètre
    localStorage.setItem(keyToSave, jsonValue);

},

/* --- Méthodes à modifier --- */


handleThemeColorClick: function(event) {

    // On récupère l'id du bouton cliqué, il contient le nom du thème
    const themeColor = event.target.id;

    // On passe le nom du thème à la méthode qui va changer le thème
    theme.changeColorTheme(themeColor);

    // On enregistre le thème dans le localStorage.
    // On fait maintenant appel à la méthode générique de sauvegarde dans le localStorage
    theme.saveToLocalStorage('colorTheme', themeColor);

},

toggleDark() {

    // On commence par sélectionner la balise sur laquelle on va modifier la classe "theme-dark"
    const body = document.querySelector('body');

    body.classList.toggle('theme-dark');

    // On vérifie si le body contient le thème dark
    // contains renvoie true si la classe est présente, false sinon
    const isDark = document.body.classList.contains('theme-dark');


    // On fait appel à la méthode générique pour sauvegarder l'information dans le localStorage
    theme.saveToLocalStorage('darkMode', isDark);

},

```
