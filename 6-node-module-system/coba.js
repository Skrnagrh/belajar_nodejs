// console.log("hello world!");
function cetakNama(nama){
    return `hallo nama saya ${nama}`;
}

// untuk menampilkan nama
// console.log(cetakNama('Sukron'));


const PI = 3.14

const mahasiswa = {
    nama: "Dody Ferdiansyah",
    umur: 20,
    cetakMhs(){
        return `hallo, nama saya ${this.nama} dan saya ${this.umur} tahun.`
    },
};

class Orang {
    constructor(){
        console.log('Objek orang telah dibuat!!');
    }
}

// untuk export nama / cteka /langkah 1
// module.exports.cetakNama = cetakNama;
// module.exports.PI = PI;
// module.exports.mahasiswa = mahasiswa;
// module.exports.Orang = Orang;

// untuk export nama / cteka /langkah 2
// module.exports = {
//     cetakNama: cetakNama,
//     PI: PI,
//     mahasiswa: mahasiswa,
//     Orang: Orang
// }

// untuk export nama / cteka /langkah 3
module.exports = {cetakNama, PI, mahasiswa, Orang};