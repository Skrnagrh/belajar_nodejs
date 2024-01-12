// mengambil arument dari command line
// const command = process.argv[2];
// if ( command === 'add'){
    
// }else if(command === 'remove'){

// }else if(command === 'remove'){

// }

const { argv } = require('process');
const yargs = require('yargs');
const contacts = require('./contacts');

// console.log(yargs.argv);
yargs.command({
    command: 'add',
    describe: 'Menambahkan kontak baru',
    builder:{
        nama:{
            describe: "Nama Lengkap",
            demandOption: true,
            type: 'string',
        },
        email:{
            describe: "Nama Email",
            demandOption: false,
            type: 'string',
        },
        noHP:{
            describe: "Nama No Hp",
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv){
        contacts.simpanContact(argv.nama, argv.email, argv.noHP);
    }
}).demandCommand();


// untuk menampilkan daftar semua nama & no hp kontak
yargs.command({
    command: 'list',
    describe: 'menampilkan semua nama dan no HP contact',
    handler(){
        contacts.listContact();
    },
});

// menampilkan detail sebuah kontak
yargs.command({
    command: 'detail',
    describe: 'menampilkan detail sebuah contact berdasarkan nama',
    builder:{
        nama:{
            describe: "Nama Lengkap",
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv){
        contacts.detailContact(argv.nama);
    },
});

// menghapus conntact berdasarkan nama
yargs.command({
    command: 'delete',
    describe: 'mennghapus sebuah contact berdasarkan nama',
    builder:{
        nama:{
            describe: "Nama Lengkap",
            demandOption: true,
            type: 'string',
        },
    },
    handler(argv){
        contacts.deleteContact(argv.nama);
    },
});

yargs.parse();









// const contacts = require('./contacts.js');

// const main = async() => {
//     const nama  = await contacts.tulisPertanyaan('Masukan Nama Anda : ');
//     const email  = await contacts.tulisPertanyaan('Masukan email Anda : ');
//     const noHP  = await contacts.tulisPertanyaan('Masukan noHP Anda : ');
    
//     contacts.simpanContact(nama, email, noHP);
// }; 

// main();


