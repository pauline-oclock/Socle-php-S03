# Correction

## DomContentLoaded

Expliquer:

```js
document.addEventListener('DOMContentLoaded', function(){  
}
```

## 1. Afficher l'encart de newsletter

### 1.1 Écouter l'évènement

```js
// On sélectionne l'élément du menu
const menuItemElement = document.querySelector('#newsletter-btn');
// On pose un écouteur de clic dessus qui appelle un handler
menuItemElement.addEventListener('click', handleClickNewsletterMenu);

// Définition du handler
function handleClickNewsletterMenu() {
  event.preventDefault();
  console.log('Clic sur le lien newsletter');
}
```

### 1.2 Afficher l'encart

```js
function handleClickNewsletterMenu() {
  event.preventDefault();
  // On sélectionne l'encart de la newsletter
  const newsletterPanel =  document.querySelector('.newsletter');

  // On lui ajoute une classe avec l'outil classList
  newsletterPanel.classList.add('newsletter--on');

}
```

### 1.3 Cacher l'encart

```js
// On sélectionne la croix
const closeElement = document.querySelector('.newsletter__close');
// On pose un écouteur dessus
closeElement.addEventListener('click', handleClickNewsletterCross);

// On définit le handler qui ferme l'encart
function handleClickNewsletterCross() {

   // On sélectionne l'encart de la newsletter
  const newsletterPanel =  document.querySelector('.newsletter');

  // On lui retire la classe avec l'outil classList
  newsletterPanel.classList.remove('newsletter--on');
}
```

## 2. Vérifier les données du formulaire

Pour cette étape, on va récupérer ce que l'utilisateur a tapé dans le formulaire de newsletter.

⚠️ Bien insister sur le fait que l'événement submit est déclenché par le form, pas par le bouton !

### 2.1 Intercepter l'envoi du formulaire

```js

// On sélectionne le formulaire et on place un écouteur de submit dessus
const formElement = document.querySelector('.newsletter form');
formElement.addEventListener('submit', handleNewsletterSubmit);


// Définition du handler appelé à chaque soumission du formulaire
function handleNewsletterSubmit(event) {
    event.preventDefault();
    console.log('Form submit');
}

```

### 2.2 Valider les données

```js
// On récupère le tableau des domaines interdits
const forbiddenDomains = [
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
];

// On sélectionne le formulaire et on place un écouteur de submit dessus
const formElement = document.querySelector('.newsletter form');
formElement.addEventListener('submit', handleNewsletterSubmit);


// Définition du handler appelé à chaque soumission du formulaire
function handleNewsletterSubmit(event) {

   // Une fois que le formulaire est soumis, on va chercher à récupérer
   // ce qui est tapé par l'utilisateur.
   // Notation raccourcie pour sélectionner l'input et
   // récupérer sa valeur d'un coup.
   const userValue = document.querySelector('#subscriber-email').value;

   // On passe cette valeur à une fonction dont le but est de vérifier
   // si le domaine est interdit.
   const isForbidden = isForbiddenEmail(userValue);
   
   // Si l'email est interdit
   if (isForbidden) {
     // On arrête l'envoi du formulaire
     event.preventDefault();

     // On affiche un message d'erreur
     // Création de l'élément P qui contient le message 
     const newError = document.createElement('p');
    
     // Ajout de la classe 'message'
     newError.classList.add('message');

     // Ajout du message
     newError.textContent = "Les adresses jetables ne sont pas autorisées";

     // Puis on sélectionne l'élément dans lequel on insère l'erreur
     const newsletterPanel = document.querySelector('.newsletter');
     newsletterPanel.prepend(newError);

   }
}


// Fonction dont le rôle est de vérifier si email est interdit.
// Renvoie true si c'est le cas, false sinon.
function isForbiddenEmail(email) {

    // Pour vérifier qu'un email est interdit,
    // on parcourt la liste des domaines interdits
    for (const domain of forbiddenDomains) {
      // La fonction includes permet de savoir si la string "email" contient
      // la string "domain". Donc si l'email contient le domaine testé.
      if (email.includes(domain)) {
        // Si oui, on est tombés sur un domaine interdit, on arrête là !
        return true;
      }
    }

    // Si on arrive ici, l'email de l'utilisateur ne fait pas partie
    // des domaines interdits !
    return false;
}

```

## Bonus :warning: NC :warning: 

:warning: Ne pas corriger le bonus slider en cours : 
- éventuellement fournir la correction
- on codera le slider différemment pour pratiquer les modules en fin de journée :star_struck: 

Dans ce bonus, on fait en sorte de faire fonctionner le slider. Pour cela : 
- On commence par se créer une fonction dont le but est de changer de slide en lui passant le numéro de la slide.
- Puis on l'appelle dans la console pour tester.

```js 

// On récupère dans un tableau toutes les images du slider
// Chaque image est identifiée par son index
const sliderImages = document.querySelectorAll('.slider__img');

// Fonction qui permet de changer l'image courante en fonction
// de la nouvelle position reçue en argument.
// newPosition = l'index de l'image qu'on veut afficher dans le tableau.
function goToSlide(newPosition) {

    // On vérifie que la nouvelle image à afficher existe
    if (newPosition >= 0 && newPosition < sliderImages.length) {

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
        const newSliderImage = sliderImages[newPosition];

        // On lui ajoute la classe pour l'afficher dans le slider
        newSliderImage.classList.add('slider__img--current');

        // On met à jour la position courante
        currentPosition = newPosition;

    } else {
        console.warn('Le slide à afficher n\'existe pas');
    }
}

// On appelle la fonction dans la console pour changer de slide :
goToSlide(1);

```

Dans un second temps, on peut ajouter les écouteurs d'événement et le code permettant de gérer la position de l'image actuelle :

```js 

// On récupère dans un tableau toutes les images du slider
// Chaque image est identifiée par son index
const sliderImages = document.querySelectorAll('.slider__img');

// On compte le nombre d'images du slider
const sliderImagesNumber = sliderImages.length;

// On définit une variable qui contiendra l'index de l'image courante,
// par défaut, c'est la première donc 0.
let currentPosition = 0;

// On sélectionne les boutons suivant et précédent
// pour poser un écouteur d'événement dessus/
const sliderButtons = document.querySelectorAll('.slider__btn');
// Le premier bouton trouvé est le bouton précédent
const previousSliderButton = sliderButtons[0];
// Le second bouton trouvé est le bouton suivant
const nextSliderButton = sliderButtons[1];

// On place un écouteur d'événement sur le bouton précédent
previousSliderButton.addEventListener('click', previousSlide);

// On place un écouteur d'événement sur le bouton suivant
nextSliderButton.addEventListener('click', nextSlide);


// La fonction previousSlide est appelée
// lorsqu'on clique sur le bouton précédent.
// Elle permet de calculer la nouvelle position de l'image courante
// et de l'afficher.
function previousSlide() {

    // On détermine la nouvelle position de la slide
    // en diminuant le compteur de 1.
    let newPosition = currentPosition - 1;

    // Si la nouvelle position est inférieure à 0,
    // c'est qu'on est arrivés à la première image.
    // On le place alors sur la dernière pour faire boucler le slider.
    if (newPosition < 0) {
        // On définit la nouvelle position comme étant
        // le nombre de slides moins une (car les index commencent à 0)
        newPosition = sliderImagesNumber - 1;
    }

    // On appelle la fonction qui va modifier l'image courante
    // en lui passant la position de la nouvelle slide à afficher.
    goToSlide(newPosition);

}

// La fonction nextSlide est appelée
// lorsqu'on clique sur le bouton suivant.
// Elle permet de calculer la nouvelle position de l'image courante et de l'afficher.
function nextSlide() {

    // On détermine la nouvelle position de la slide en augmentant le compteur de 1
    let newPosition = currentPosition + 1;

    // Si la nouvelle position est supérieure au nombre d'images,
    // c'est qu'on est arrivés à la dernière image.
    // On le place alors sur la première pour faire boucler le slider.
    if (newPosition > sliderImagesNumber - 1) {
        // On définit la nouvelle position comme étant 0
        newPosition = 0;
    }

    // On appelle la fonction qui va modifier l'image courante
    // en lui passant la position de la nouvelle slide à afficher.
    goToSlide(newPosition);
}


// Fonction qui permet de changer l'image courante en fonction
// de la nouvelle position reçue en argument.
// newPosition = l'index de l'image qu'on veut afficher dans le tableau.
function goToSlide(newPosition) {

    // On vérifie que la nouvelle image à afficher existe
    if (newPosition >= 0 && newPosition < sliderImages.length) {

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
        const newSliderImage = sliderImages[newPosition];

        // On lui ajoute la classe pour l'afficher dans le slider
        newSliderImage.classList.add('slider__img--current');

        // On met à jour la position courante
        currentPosition = newPosition;

    } else {
        console.warn('Le slide à afficher n\'existe pas');
    }
}

```

