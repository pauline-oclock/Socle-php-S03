# Correction

- https://github.com/O-clock-Lara/S03-E05-challenge-theme-module [MODIF_LIEN]

# Réorganisation du code gérant le changement de thème

> objets, méthodes, DOM lecture/écriture, évènements, conditions

## Etape 1

On crée le fichier `theme.js` et on déclare le "module" `theme`.

:warning: Ne pas oublier de l'inclure ! 

```js
const theme = {
    
};
```

## Etapes 2 et 3 

On crée notre écouteur d'événement et on a besoin de lui donner un handler. 
- +fonction qu'on a créé précédemment pour changer de thème.

```js 
const theme = {

    init: function() {

        // On sélectionne le bouton de changement de thème
        const themeSwitchElement = document.querySelector('#theme-switch');

        // On place un écouteur d'événement sur le bouton
        themeSwitchElement.addEventListener('click', theme.toggleDark);

    }

};

// On n'oublie pas d'initialiser notre "module" pour qu'il soit actif
document.addEventListener('DOMContentLoaded', theme.init);

```

## Etape 4 

Récupérer la fonction `changeTheme` récupérée précédemment, la renommer `toggleDark` et en faire une méthode du "module".

```js 
const theme = {

    init: function() {

        // On sélectionne le bouton de changement de theme
        const themeSwitchElement = document.querySelector('#theme-switch');

        // On place un écouteur d'événement sur le bouton
        themeSwitchElement.addEventListener('click', theme.toggleDark);

    },

    toggleDark: function() {

        // On commence par sélectionner la balise sur laquelle on va modifier la classe "theme-dark"
        const body = document.querySelector('body');
        // Sans querySelector (donc plus difficile à comprendre à cause du tableau en résultat) : 
        // const body = document.getElementsByTagName('body')[0];
     
         // On vérifie si l'élément a la classe "theme-dark"
         if (body.classList.contains('theme-dark')) {
             // Si oui, on la supprime
             body.classList.remove('theme-dark');
         }
         else {
             // Si non, on l'ajoute
             body.classList.add('theme-dark');
         }
         
         // On peut aussi utiliser la méthode toggle qui permet de changer l'état de la classe
         // body.classList.toggle('theme-dark');
     
     }
};

// On n'oublie pas d'initialiser notre "module" pour qu'il soit actif
document.addEventListener('DOMContentLoaded', theme.init);
```


## Bonus

- Crée un module `newsletter`

```js
const newsletter = {   
    
}
```

- Déplacer le code de script dedans:

```js
const newsletter = {
  forbiddenEmailExtensions: [
    '@yopmail.com',
    '@yopmail.fr',
    '@yopmail.net',
    '@cool.fr.nf',
    '@jetable.fr.nf',
    '@courriel.fr.nf',
    '@moncourrier.fr.nf',
    '@monemail.fr.nf',
    '@monmail.fr.nf',
    '@hide.biz.st',
    '@mymail.infos.st',
  ],
  init: function() {
    // On sélectionne l'élément du menu
    const menuItemElement = document.querySelector('#newsletter-btn');
    // On pose un écouteur de clic dessus qui appelle un handler
    menuItemElement.addEventListener('click', newsletter.handleClickNewsletterMenu);

    // On sélectionne le formulaire et on place un écouteur de submit dessus
    const formElement = document.querySelector('.newsletter form');
    formElement.addEventListener('submit', newsletter.handleNewsletterSubmit);
    
    // On sélectionne la croix
    const closeElement = document.querySelector('.newsletter__close');
    // On pose un écouteur dessus
    closeElement.addEventListener('click', newsletter.handleClickNewsletterCross);
  },


  // Définition du handler
  handleClickNewsletterMenu: function(event) {
    event.preventDefault();
    // On sélectionne l'encart de la newsletter
    const newsletterPanel =  document.querySelector('.newsletter');

    // On lui ajoute une classe avec l'outil classList
    newsletterPanel.classList.add('newsletter--on');
  },
  
  
  // On définit le handler qui ferme l'encart
  handleClickNewsletterCross: function() {
  
    // On sélectionne l'encart de la newsletter
    const newsletterPanel =  document.querySelector('.newsletter');

    // On lui retire la classe avec l'outil classList
    newsletterPanel.classList.remove('newsletter--on');
  }, 
  
  // Définition du handler appelé à chaque soumission du formulaire
  handleNewsletterSubmit: function(event) {
      event.preventDefault();
      console.log('Form submit');
  }
}

document.addEventListener('DOMContentLoaded', newsletter.init);
```

## Méga Bonus

- On veut utiliser les boutons en haut à droite pour changer de thème
- Regarder le code, on a une classe commune et des ids!


- Dans `theme.js` **ajouter** la propriété:

```js
colors: [],
```

- Dans `theme.js` ajouter dans le `init`:

```js
const buttonsColor = document.querySelectorAll('.theme-button');
for(button of buttonsColor) {
    theme.colors.push(button.id);
    button.addEventListener('click', theme.toggleOther);
}
```

- Dans `theme.js` **ajouter** les méthodes:

```js
    toggleOther: function(event) {     
        const color = event.currentTarget.id;
        theme.toggleColor(color);
    },
    toggleColor: function(color) {
        const body = document.querySelector('body');

        // On nettoie au préalable les autres classes
        theme.resetClasses(body);
        // Si non, on l'ajoute
        body.classList.add(color);
    },
    resetClasses: function(body) {
        for(color of theme.colors) {
            body.classList.remove(color);
        }
    }
```