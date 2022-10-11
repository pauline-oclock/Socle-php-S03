# S03E05 - Modules

## Correction Atelier

[correction](./correction_tripodvisor/README.md)

## 1. Organiser son code JS

### Avantages :
- code plus lisible
- minimiser les bugs
- => + maintenance + évolutivité sites :ok_hand: 

### Depuis le début de la formation, on sépare les concepts : 
- HTML d'un côté, CSS de l'autre
- PHP d'un côté, PHP à afficher en HTML de l'autre

### Or, jusqu'à présent cette saison : 
- Fichiers JS, mais fonctions "libres" (non regroupées) : c'est le bordel :cry: 

## 2. Comment s'organiser en JS ?

- Découper en plusieurs fichiers :scissors: 
- **Regrouper fonctions dans  "modules"** : 
  - "module" : regroupement de fonctions dans lequel on peut également déclarer des variables appelée **propriétés**
  - fonction de module = **méthode**
  - "module" = objet (mais à voir en s04)

## 3. Mise en module de l'affichage d'un message d'erreur

Tripodvisor : message d'erreur "Vous devez être connecté..." au clic sur l'icône :heart: favoris.

### Création du module messages

- Créer un fichier `messages.js`
- Créer le module

```js
const messages = {
}
```

- On commence par créer une fonction pour ajouter un message et une pour le retirer

> objets, propriétés, méthodes, DOM lecture/écriture, évènements, boucles, conditions

```js

// Module générique de gestion des messages d'informations
const messages = {

  // Méthode permettant d'ajouter un message à l'intérieur d'un élément
  addMessageToElement: function(messageContent, parentElement) {

    // suppression des anciens messages sinon ils vont s'ajouter les uns à la suite des autres
    messages.removeOldMessages(parentElement);

    // ajout du nouveau message
    const messageElement = document.createElement('p');
    messageElement.className = 'message';
    messageElement.textContent = messageContent;
    
    // on ajoute le message en premier enfant
    parentElement.prepend(messageElement);
  },

  removeOldMessages: function(parentElement) {

    const oldMessages = parentElement.querySelectorAll('.message');

    for (const oldMessage of oldMessages) {
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/remove
      oldMessage.remove();
    }
  }
};
```

### Création du module destinations

- Créer un fichier `destinations.js`
- Créer le module

```js
const destinations = {
}
```

- module = toute action sur les destinations
- mais pour le moment, ajout à sa liste de destinations favorites

:warning: Nouveauté : on lance le init() au DOMContentLoaded

```js

// Module de gestion des actions possibles pour les destinations
const destinations = {

    // un module est un objet, il peut aussi contenir des propriétés
    notLoggedInUserMessage: 'Vous devez être connecté pour gérer vos favoris',

    // Initialisation du module destination,
    // souvent la méthode init() sert à ajouter des écouteurs d'évènement
    init: function() {
        destinations.addLikeEvents();
    },

    // méthode permettant d'écouter les clics sur les boutons like    
    addLikeEvents: function () {

        // on récupère l'ensemble des boutons like
        const heartElements = document.querySelectorAll('.btn__like');

        // sur chaque bouton like, on écoute le clic
        for (const heartElement of heartElements) {
            heartElement.addEventListener('click', destinations.handleLikeClick);
        }

    },

    // création d'une erreur dans la carte la plus proche
    handleLikeClick: function (event) {
        // event.target récupère l'élément sur lequel l'évènement a eu lieu
        // => le bouton like
        // .closest('.card') récupère le premier ancêtre possédant la classe 'card'
        const destElement = event.target.closest('.card');

        // on fait appelle au module messages pour ajouter notre message d'information
        messages.addMessageToElement(destinations.notLoggedInUserMessage, destElement);
    }
};

// En appelant la méthode init() une fois le DOM chargé, cela permettra notamment d'ajouter les écouteurs
// d'évènement sur les boutons like :heart: de chaque destination
document.addEventListener('DOMContentLoaded', destinations.init);
```


## 4. Module slider

> algo+++, objets, propriétés, méthodes, DOM lecture/écriture, évènements, boucles, conditions

**Reprendre la fonction `generateSliderImages` créée en E02 et la ranger dans le module.**

Ne pas oublier de retirer l'appel de script.js

```js
const slider = {
    
    // On crée un tableau qui contiendra toutes les images du slider
    // Chaque image est identifiée par son index.
    sliderImages: [],

    // Sert à stocker le nombre d'images du slider
    sliderImagesNumber: 0,

    // On définit une variable qui contiendra l'index de l'image courante,
    // par défaut, c'est la première donc 0.
    currentPosition: 0,

    // La méthode init permet d'initialiser les propriétés du "module" slider
    // et d'ajouter les écouteurs d'évènement
    init: function() {
        
        // On génère les images du slider avec la fonction créée précédemment 
        slider.generateSliderImages();

        // On récupère toutes les slides de la page et on les stocke dans la propriété sliderImages pour pouvoir les réutiliser. 
        slider.sliderImages = document.querySelectorAll('.slider__img');

        // On stocke le nombre d'images du slider pour ne pas avoir à le recalculer plusieurs fois
        slider.sliderImagesNumber = slider.sliderImages.length;

        // On ajoute les écouteurs d'évènement
        slider.addEvents();
    },
    
    // La méthode addEvents permet d'ajouter tous les écouteurs d'évènements associés au slider
    addEvents: function() {

        // On récupère les boutons précédent et suivant
        const sliderButtons = document.querySelectorAll('.slider__btn');

        // On place un écouteur d'événement sur le bouton précédent
        const previousSliderButton = sliderButtons[0];
        previousSliderButton.addEventListener('click', slider.previousSlide);
    
        // On place un écouteur d'événement sur le bouton suivant
        const nextSliderButton = sliderButtons[1];
        nextSliderButton.addEventListener('click', slider.nextSlide);
         
    },
    
    // La fonction previousSlide est appelée
    // lorsqu'on clique sur le bouton précédent.
    // Elle permet de calculer la nouvelle position de l'image courante
    // et de l'afficher.
    previousSlide: function() {

        // On détermine la nouvelle position de la slide
        // en diminuant le compteur de 1.
        let newPosition = slider.currentPosition - 1;

        // Si la nouvelle position est inférieure à 0,
        // c'est qu'on est arrivés à la première image.
        // On le place alors sur la dernière pour faire boucler le slider.
        if (newPosition < 0) {
            // On définit la nouvelle position comme étant
            // le nombre de slides moins une (car les index commencent à 0)
            newPosition = slider.sliderImagesNumber - 1;
        }

        // On appelle la fonction qui va modifier l'image courante
        // en lui passant la position de la nouvelle slide à afficher.
        slider.goToSlide(newPosition);
    },

    // La fonction nextSlide est appelée
    // lorsqu'on clique sur le bouton suivant.
    // Elle permet de calculer la nouvelle position de l'image courante et de l'afficher.
    nextSlide: function() {

        // On détermine la nouvelle position de la slide en augmentant le compteur de 1
        let newPosition = slider.currentPosition + 1;

        // Si la nouvelle position est supérieure au nombre d'images,
        // c'est qu'on est arrivés à la dernière image.
        // On le place alors sur la première pour faire boucler le slider.
        if (newPosition > slider.sliderImagesNumber - 1) {
            // On définit la nouvelle position comme étant 0
            newPosition = 0;
        }

        // On appelle la fonction qui va modifier l'image courante
        // en lui passant la position de la nouvelle slide à afficher.
        slider.goToSlide(newPosition);
    },


    // Fonction qui permet de changer l'image courante en fonction
    // de la nouvelle position reçue en argument.
    // newPosition = l'index de l'image qu'on veut afficher dans le tableau.
    goToSlide: function(newPosition) {

        // On vérifie que la nouvelle image à afficher existe
        if (newPosition >= 0 && newPosition < slider.sliderImagesNumber) {

            // On récupère l'image actuellement affichée
            const currentSliderImage = document.querySelector('.slider__img--current');

            // /!\ Pour éviter toute erreur Javascript, avant d'enlever l'image courant,
            // on vérifie qu'elle existe car si l'utilisateur modifie le code HTML,
            // il se peut qu'on ne trouve pas d'image avec la classe slider__img--current,
            // et dans ce cas currentSliderImage vaudrait null
            // et le classList.remove() provoquerait une erreur dans notre script
            if (currentSliderImage) {
                currentSliderImage.classList.remove('slider__img--current');    
            } else {
                console.warn('Il n\'y avait aucun slide affiché dans le diaporama');
            }

            // On récupère l'élément correspond à la nouvelle image à afficher
            const newSliderImage = slider.sliderImages[newPosition];

            // On lui ajoute la classe pour l'afficher dans le slider
            newSliderImage.classList.add('slider__img--current');

            // On met à jour la position courante
            slider.currentPosition = newPosition;

        } else {
            console.warn('Le slide à afficher n\'existe pas');
        }
    }
};

// Maintenant que le code est dans un "module" (objet), il ne faut pas oublier
// de l'initialiser pour que les interactions soient activées.
document.addEventListener('DOMContentLoaded', slider.init);
```

# Challenge

Challenge : https://github.com/O-clock-Lara/S03-E06-challenge-theme-color