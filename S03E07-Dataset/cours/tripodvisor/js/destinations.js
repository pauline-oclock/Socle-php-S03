// Module de gestion des actions possibles pour les destinations
const destinations = {

    // un module est un objet, il peut aussi contenir des propriétés
    notLoggedInUserMessage: 'Vous devez être connecté pour gérer vos favoris',

    // méthode permettant d'initialiser le module destination,
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
