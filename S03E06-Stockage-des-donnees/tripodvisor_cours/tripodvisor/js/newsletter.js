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