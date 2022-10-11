// document.cookie = 'cle=valeur';
// ajoute un cookie avec la clé lang et la valeur français
document.cookie = 'lang=français';
console.log(document.cookie);

const cookiesAsArray = document.cookie.split('; ');

for (const cookie of cookiesAsArray) {
    // si la chaîne commence par le début du cookie qui nous intéresse
    if (cookie.startsWith('lang')) {
        // on découpe le contenu du cookie
        const cookieInfo = cookie.split('=');
        // pour récupérer que la valeur
        const value = cookieInfo[1];
        // la valeur est trouvée
        console.log(value);
    }
}
