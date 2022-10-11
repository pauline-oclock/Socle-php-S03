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