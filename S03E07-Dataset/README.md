# S03E07 - Datasets

## 1. Dataset

Les **datasets** (attributs de données) sont des **attributs particuliers** : 
- ils servent à stocker des informations utiles pour certaines fonctionnalités de notre application
- ils n'ont pas de sens sémantique
- leur nommage est normalisé :
  - ils doivent être préfixés par `data-` suivi d'un nom d'attribut en kebab-case (exemple : `data-category-id`)

**Manipulation des dataset** : 
- [Doc MDN Dataset](https://developer.mozilla.org/fr/docs/Learn/HTML/Howto/Use_data_attributes)

- DEMO SUR INSPECTEUR

- Syntaxe HTML : 

```html
<article id="pain-au-chocolat-ou-chocolatine" data-post-id="548" data-category="Débat de société">
   Lorem ipsum...
</article>
```

- Syntaxe Javascript, pour accéder à un attribut dataset : 
  - on utilise la propriété `.dataset`
  - suivie du nom de l'attribut sans le préfixe `data`
  - puis on fournit le nom de l'attribut en camelCase
```js
const article = document.getElementById('pain-au-chocolat-ou-chocolatine');

// ---------------------------------------------
// Lecture d'un dataset
// ---------------------------------------------
// Pour accéder à la valeur de l'attribut data-post-id,
// on utilise .dataset.postId
const postId = article.dataset.postId;

// ---------------------------------------------
// Ajout/modification d'un dataset
// ---------------------------------------------
article.dataset.category = 'Chocopain';
```

## 2. Filtres sur les commentaires

:bulb: Astuces
- Grâce au dataset, on peut sélectionner un ensemble d'éléments selon la valeur d'un attribut dataset.
- Et avec `classList.toggle('ma-classe')` on peut facilement ajouter/supprimer une classe donnée.

- Créer un nouveau fichier js `reviewsFilter.js`
- L'appeler dans le HTML
- Créer le composant:

```js
const reviewsFilter = {

    // Initialisation du module
    // Pour le moment, on ne fait qu'ajouter les écouters évènements
    // mais si le code évolue, on sera déjà prêt à faire d'autres choses ici.
    init: function() {
        reviewsFilter.addEvents();
    },

    // Ajoute les écouteurs d'évènements au clic sur les cases à cocher
    // au dessus des commentaires.
    addEvents: function() {
        
        // On récupère les cases à cocher permettant de filtrer selon la note
        const ratingCheckboxes = document.querySelectorAll('.filter input[name="rating"]');

        // On parcourt chaque case à cocher
        for (const ratingCheckbox of ratingCheckboxes) {
            // et on lui ajoute un écouteur d'évènement au clic
            ratingCheckbox.addEventListener('click', reviewsFilter.handleClickOnRatingCheckbox);
        } 
         
    },

    // Lors d'un clic sur la case à cocher, on va filtrer les commentaires affichés
    handleClickOnRatingCheckbox: function(event) {

        // On récupère la case à cocher à l'origine de l'évènement
        const ratingCheckbox = event.currentTarget;
        
        // Cela nous permet ensuite de savoir sur quelle note on a cliqué
        const rating = ratingCheckbox.value;

        // Il reste alors à afficher ou cacher les commentaires ayant la même note
        reviewsFilter.toggleReviewsFromRating(rating);
        
    },

    // Sélectionne les commentaires ayant une note donnée,
    // et inverse sa visibilité : 
    // - si commentaire caché => on l'affiche 
    // - si commentaire affiché => on le cache
    toggleReviewsFromRating: function(rating) {

        // On commence par récupérer la liste des commentaires ayant la note donnée
        // => et grâce au dataset, c'est vraiment très pratique !
        const reviewsToFilter = document.querySelectorAll('.review[data-rating="'+ rating +'"]');

        // Reste à parcourir chaque commentaire pour inverser sa visibilité
        for (const reviewElement of reviewsToFilter) {
            // On peut faire ça directement avec toggle
            // - si la classe review--hidden est présente, toggle l'enlève
            // - si la classe review--hidden est absente, toggle la rajoute
            reviewElement.classList.toggle('review--hidden');
        }
    },
};

// On initialise les filtres une fois que le DOM est chargé
document.addEventListener('DOMContentLoaded', reviewsFilter.init);
```

## Bonus 

- Composant App qui initialise tous les autres objets:

```js
const app = {
    init: function() {
      // pour la gestion du mode sombre
      theme.init();
      // gestion du slider
      slider.init();
      // gestion des filtres par note
      destinations.init();
      // formulaire de newsletter
      newsletter.init();
      // gestion des filtres par note
      reviewsFilter.init();
    },
  };
  
  // dès que le DOM est prêt on commence à le manipuler pour nos différentes fonctionnalités
  document.addEventListener('DOMContentLoaded', app.init);
```

- Retirer les DOMContentLoaded des autres composants !

# Parcours

- Présenter le parcours: installer ma version et présenter les exos

- Ma version: https://github.com/O-clock-Lara/S03-parcours-pauline-oclock [MODIF_LIEN]
- O'challenge: https://kourou.oclock.io/o-challenge/?ref=Ty1jbG9jay1Tb2NsZS1QSFAvUzAzLXBhcmNvdXJzfE8tY2xvY2stTGFyYXxTMDMtcGFyY291cnN8MjAyMi0xMC0xMVQwOTowMHw= [MODIF_LIEN]