const theme = {


    init: function() {

        // On sélectionne le bouton de changement de thème
        const themeSwitchElement = document.querySelector('#theme-switch');

        // On place un écouteur d'événement sur le bouton
        themeSwitchElement.addEventListener('click', theme.toggleDark);

        const buttonsColor = document.querySelectorAll('.theme-button');

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