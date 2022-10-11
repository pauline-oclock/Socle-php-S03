const theme = {

    init: function() {

        // On sélectionne le bouton de changement de thème
        const themeSwitchElement = document.querySelector('#theme-switch');

        // On place un écouteur d'événement sur le bouton
        themeSwitchElement.addEventListener('click', theme.toggleDark);

        // Au chargement de la page, on vérifie si le localStorage contient une valeur pour le theme sombre/clair
        theme.initLocalState();

    },
    
    initLocalState: function() {

        // On récupère la valeur du thème dans le localStorage
        const localSave = localStorage.getItem('darkMode');

        // On transforme la chaîne de caractères en booléen
        const isDark = JSON.parse(localSave);

        // Si "isDark" contient true, c'est que le thème est en mode dark
        if (isDark) {
            // On applique le thème dark
            document.body.classList.add('theme-dark');
        }
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
         
        // [...]

        // On sauvegarde le thème dans le localStorage

        // On vérifie si le body contient le theme dark
        // contains renvoie true si la classe est présente, false sinon.
        const isDark = document.body.classList.contains('theme-dark');

        // On transforme la valeur booléenne en chaîne de caractères
        const newLocalSave = JSON.stringify(isDark);

        // On sauvegarde le theme dans le localStorage
        localStorage.setItem('darkMode', newLocalSave);

    },
    toggleOther: function(event) {     
        const color = event.currentTarget.id;
        theme.toggleColor(color);
    },
    toggleColor: function(color) {
        const body = document.querySelector('body');

        // On nettoie au préalable les autres classes
        theme.resetClasses(body);
        // Si non, on l'ajoute
        body.classList.add(color);
    },
    resetClasses: function(body) {
        for(color of theme.colors) {
            body.classList.remove(color);
        }
    }



};

// On n'oublie pas d'initialiser notre "module" pour qu'il soit actif
document.addEventListener('DOMContentLoaded', theme.init);