// const nama = "Sukron Anurah";
// const cetakNama = (nama) => `hi, nama saya ${nama}`;
// console.log(cetakNama(nama));
// console.log(window);

// require('./coba');
// const fs = require('fs'); // untuk core module
// const cetakNama = require('./coba'); // local module, karena ada .slice
// const PI = require('./coba'); // local module, karena ada .slice
// const moment = require('moment'); // thrid party mmodule / npm module / node_modules

// console.log("ini yang kedua");
const coba = require('./coba'); // local module, karena ada .slice
// console.log(coba.cetakNama('Sukron'), coba.PI, coba.mahasiswa.cetakMhs());
// console.log(coba);
console.log(
    coba.cetakNama('Sukron'), 
    coba.PI, 
    coba.mahasiswa.cetakMhs(),
    new coba.Orang()
);