// const validator = require('validator');

// console.log(validator.isEmail('skrnagrh@gmail.com'));
// console.log(validator.isMobilePhone('0812345678', 'id-ID'));
// console.log(validator.isNumeric('0812345678'));

const chalk = require('chalk');

// console.log(chalk.italic.bgBlue.black('Hello, World!'));
const nama = 'Sukron';
const pesan = chalk`lorem lorem {bgRed.black lorem} lorem lorem {bgGreen.italic.black.strikethrough lorem} lorem. nama saya : ${nama} coba lagi yah apakah sudah berubah yah, ternyata {bold.italic sudah yah gas bismillah} semoga konsisten belajar node js sampai bisa. ini sudah bisa`;
console.log(pesan);
