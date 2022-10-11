// Module générique de gestion des messages d'informations
const messages = {

    // Méthode permettant d'ajouter un message à l'intérieur d'un élément
    addMessageToElement: function(messageContent, parentElement) {
  
      // suppression des anciens messages
      messages.removeOldMessages(parentElement);
  
      // ajout du nouveau message
      const messageElement = document.createElement('p');
      messageElement.className = 'message';
      messageElement.textContent = messageContent;
      
      // on ajoute le message en premier enfant
      parentElement.prepend(messageElement);
    },
  
    removeOldMessages: function(parentElement) {
  
      const oldMessages = parentElement.querySelectorAll('.message');
  
      for (const oldMessage of oldMessages) {
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/remove
        console.log('suppr');
        oldMessage.remove();
      }
    }
  };