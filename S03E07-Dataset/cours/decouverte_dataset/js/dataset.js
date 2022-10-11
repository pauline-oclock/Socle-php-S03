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