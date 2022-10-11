const theme = {

    init: function() {
        // On sélectionne le bouton de changement de thème
        const themeSwitchElement = document.querySelector('#theme-switch');

        // On place un écouteur d'événement sur le bouton
        themeSwitchElement.addEventListener('click', theme.toggleDark);
        // On sélectionne tous les boutons de changement de theme

        const colorButtonsElements = document.querySelectorAll('.theme-button');

        // On place un écouteur d'événement sur chaque bouton
        for (const colorButtonElement of colorButtonsElements) {
            colorButtonElement.addEventListener('click', theme.handleThemeColorClick);
        }

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
        // On essaie aussi de voir si on a sauvegardé un thème de couleur dans le localStorage
        let colorTheme = localStorage.getItem('colorTheme');
        colorTheme = JSON.parse(colorTheme);

        // Si on a une valeur, on applique le thème de couleur
        if (colorTheme) {
            theme.changeColorTheme(colorTheme);
        }
    },

    handleThemeColorClick: function(event) {

        // On récupère l'id du bouton cliqué, il contient le nom du thème
        const themeColor = event.target.id;
    
        // On passe le nom du thème à la méthode qui va changer le thème
        theme.changeColorTheme(themeColor);
    
        // On enregistre le thème dans le localStorage.
        // On fait maintenant appel à la méthode générique de sauvegarde dans le localStorage
        theme.saveToLocalStorage('colorTheme', themeColor);
    
    },
     changeColorTheme: function(themeColor) {

        // On sélectionne le body
        const bodyElement = document.querySelector('body');
    
        // On supprime les potentielles classes de thème présentes sur le body
        bodyElement.classList.remove('theme-red', 'theme-blue', 'theme-green');
    
        // On ajoute la classe correspondant au thème choisi
        bodyElement.classList.add(themeColor);
        
        // On passe à la modification du logo. Donc on "reconstruit" son chemin
        const logoPath = "img/logo-" + themeColor.trim() + ".png";
    
        // On sélectionne le logo
        const logoElement = document.querySelector('.logo__image');
    
        // On modifie son attribut src
        logoElement.src = logoPath;
    
    },
    toggleDark() {

        // On commence par sélectionner la balise sur laquelle on va modifier la classe "theme-dark"
        const body = document.querySelector('body');
    
        body.classList.toggle('theme-dark');
    
        // On vérifie si le body contient le thème dark
        // contains renvoie true si la classe est présente, false sinon
        const isDark = document.body.classList.contains('theme-dark');
    
    
        // On fait appel à la méthode générique pour sauvegarder l'information dans le localStorage
        theme.saveToLocalStorage('darkMode', isDark);
    
    },
    saveToLocalStorage: function(keyToSave, valueToSave) {

        // On transforme la valeur reçue en JSON
        const jsonValue = JSON.stringify(valueToSave);
    
        // On la sauvegarde dans le localStorage, à la clé passée en paramètre
        localStorage.setItem(keyToSave, jsonValue);
    
    },
};