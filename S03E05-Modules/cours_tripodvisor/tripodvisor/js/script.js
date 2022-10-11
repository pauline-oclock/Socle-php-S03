function changeTheme() {
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




// Définition du handler
function handleClickNewsletterMenu(event) {
  event.preventDefault();
  // On sélectionne l'encart de la newsletter
  const newsletterPanel =  document.querySelector('.newsletter');

  // On lui ajoute une classe avec l'outil classList
  newsletterPanel.classList.add('newsletter--on');
}

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



// Définition du handler appelé à chaque soumission du formulaire
function handleNewsletterSubmit(event) {
    event.preventDefault();
    console.log('Form submit');
}

document.addEventListener('DOMContentLoaded', function(){  

const darkModeButton = document.querySelector('#theme-switch');
darkModeButton.addEventListener('click', changeTheme);

// On sélectionne l'élément du menu
const menuItemElement = document.querySelector('#newsletter-btn');
// On pose un écouteur de clic dessus qui appelle un handler
menuItemElement.addEventListener('click', handleClickNewsletterMenu);


// On sélectionne le formulaire et on place un écouteur de submit dessus
const formElement = document.querySelector('.newsletter form');
formElement.addEventListener('submit', handleNewsletterSubmit);

});