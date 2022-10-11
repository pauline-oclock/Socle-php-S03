localStorage.setItem('age', 31);

const userAge = localStorage.getItem('age');
console.log(userAge); // '31'

const trucASauvegarder = {
    age: 31,
    color: 'orange',
};

const chaineDeCaractereASauvegarder = JSON.stringify(trucASauvegarder);
localStorage.setItem('data', chaineDeCaractereASauvegarder);

const dataAsString = localStorage.getItem('data');
const data = JSON.parse(dataAsString);

console.log(data.age);
console.log(data.color);