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

## :warning: Pas de Bonus :warning: 

:warning: Ne pas corriger le bonus slider en cours : 
