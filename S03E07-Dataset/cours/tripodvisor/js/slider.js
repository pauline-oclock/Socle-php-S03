const slider = {
    
    // On crée un tableau qui contiendra toutes les images du slider
    // Chaque image est identifiée par son index.
    sliderImages: [],

    // Sert à stocker le nombre d'images du slider
    sliderImagesNumber: 0,

    // On définit une variable qui contiendra l'index de l'image courante,
    // par défaut, c'est la première donc 0.
    currentPosition: 0,

    // La méthode init permet d'initialiser les propriétés du "module" slider
    // et d'ajouter les écouteurs d'évènement
    init: function() {
        
        // On génère les images du slider avec la fonction créée précédemment 
        slider.generateSliderImages();

        // On récupère toutes les slides de la page et on les stocke dans la propriété sliderImages pour pouvoir les réutiliser. 
        slider.sliderImages = document.querySelectorAll('.slider__img');

        // On stocke le nombre d'images du slider pour ne pas avoir à le recalculer plusieurs fois
        slider.sliderImagesNumber = slider.sliderImages.length;

        // On ajoute les écouteurs d'évènement
        slider.addEvents();
    },
    
    // La méthode addEvents permet d'ajouter tous les écouteurs d'évènements associés au slider
    addEvents: function() {

        // On récupère les boutons précédent et suivant
        const sliderButtons = document.querySelectorAll('.slider__btn');

        // On place un écouteur d'événement sur le bouton précédent
        const previousSliderButton = sliderButtons[0];
        previousSliderButton.addEventListener('click', slider.previousSlide);
    
        // On place un écouteur d'événement sur le bouton suivant
        const nextSliderButton = sliderButtons[1];
        nextSliderButton.addEventListener('click', slider.nextSlide);
         
    },
    
    // La fonction previousSlide est appelée
    // lorsqu'on clique sur le bouton précédent.
    // Elle permet de calculer la nouvelle position de l'image courante
    // et de l'afficher.
    previousSlide: function() {

        // On détermine la nouvelle position de la slide
        // en diminuant le compteur de 1.
        let newPosition = slider.currentPosition - 1;

        // Si la nouvelle position est inférieure à 0,
        // c'est qu'on est arrivés à la première image.
        // On le place alors sur la dernière pour faire boucler le slider.
        if (newPosition < 0) {
            // On définit la nouvelle position comme étant
            // le nombre de slides moins une (car les index commencent à 0)
            newPosition = slider.sliderImagesNumber - 1;
        }

        // On appelle la fonction qui va modifier l'image courante
        // en lui passant la position de la nouvelle slide à afficher.
        slider.goToSlide(newPosition);
    },

    // La fonction nextSlide est appelée
    // lorsqu'on clique sur le bouton suivant.
    // Elle permet de calculer la nouvelle position de l'image courante et de l'afficher.
    nextSlide: function() {

        // On détermine la nouvelle position de la slide en augmentant le compteur de 1
        let newPosition = slider.currentPosition + 1;

        // Si la nouvelle position est supérieure au nombre d'images,
        // c'est qu'on est arrivés à la dernière image.
        // On le place alors sur la première pour faire boucler le slider.
        if (newPosition > slider.sliderImagesNumber - 1) {
            // On définit la nouvelle position comme étant 0
            newPosition = 0;
        }

        // On appelle la fonction qui va modifier l'image courante
        // en lui passant la position de la nouvelle slide à afficher.
        slider.goToSlide(newPosition);
    },


    // Fonction qui permet de changer l'image courante en fonction
    // de la nouvelle position reçue en argument.
    // newPosition = l'index de l'image qu'on veut afficher dans le tableau.
    goToSlide: function(newPosition) {

        // On vérifie que la nouvelle image à afficher existe
        if (newPosition >= 0 && newPosition < slider.sliderImagesNumber) {

            // On récupère l'image actuellement affichée
            const currentSliderImage = document.querySelector('.slider__img--current');

            // /!\ Pour éviter toute erreur Javascript, avant d'enlever l'image courant,
            // on vérifie qu'elle existe car si l'utilisateur modifie le code HTML,
            // il se peut qu'on ne trouve pas d'image avec la classe slider__img--current,
            // et dans ce cas currentSliderImage vaudrait null
            // et le classList.remove() provoquerait une erreur dans notre script
            if (currentSliderImage) {
                currentSliderImage.classList.remove('slider__img--current');    
            } else {
                console.warn('Il n\'y avait aucun slide affiché dans le diaporama');
            }

            // On récupère l'élément correspond à la nouvelle image à afficher
            const newSliderImage = slider.sliderImages[newPosition];

            // On lui ajoute la classe pour l'afficher dans le slider
            newSliderImage.classList.add('slider__img--current');

            // On met à jour la position courante
            slider.currentPosition = newPosition;

        } else {
            console.warn('Le slide à afficher n\'existe pas');
        }
    },
    // génération des images dans une fonction pour pouvoir l'appeler facilement
    generateSliderImages : function() {
        const sliderImages = [
            'ocean.jpg',
            'ski.jpg',
            'city.jpg'
        ];
        
        // On sélectionne le parent qui accueille les images
        const sliderContainer = document.querySelector('.slider');
        
        // A l'aide d'une boucle for...of, on  parcourt tout le tableau d'images
        for (const currentImage of sliderImages) {
            // On créée l'image
            const newSliderImage = document.createElement('img');
            // On modifie son attribut src en concaténant le chemin et le nom de l'image
            newSliderImage.src = "./img/" + currentImage;
            // On ajoute les classes demandées par le guide de l'énoncé
            newSliderImage.classList.add('slider__img');
            // Modification de la balise alt
            newSliderImage.alt = "Image du slider";
            // On ajoute l'image créée au début du parent
            sliderContainer.prepend(newSliderImage);
        }

        // Une fois la boucle terminée, on sélectionne la première image du slider
        const firstSliderImage = document.querySelector('.slider__img');
        // On lui ajoute la classe pour l'afficher
        firstSliderImage.classList.add('slider__img--current');
    }
};