const Enigma = require("./enigma2");

// console.log(myModule.hello("Medha Pandey"));
// console.log(myModule.goodMorning("Medha Pandey"));

const eni = new Enigma("qwertyuioplkjhgfdsazxcvbnmlkjhgf");

let encodeString = eni.encode("My name is Med ");
let decodeString = eni.decode(encodeString);
//let qrGen = eni.qrImage("http://www.google.com", "QR_Google.png");
console.log(encodeString);
console.log(decodeString);
//console.log(qrGen);
