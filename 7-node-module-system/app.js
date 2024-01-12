// core module
// file system
const fs = require('fs');

// console.log(fs);
// menuliskan string ke file (synchronous)
// try{
//     fs.writeFileSync('data/test.text', 'Hello world secara Synchronous!');
// } catch(e){
//     console.log(e);
// }


// menuliskan string ke file (asynchronous)
// fs.writeFileSync('data/test.text', 'hello wolrd secara asynchronous', (e) => {
//     console.log(e);
// });

// membaca isi file (Synchronous)
// const data = fs.readFileSync('data/test.text', 'utf-8');
// console.log(data);

// membaca isi file (Asynchronous)
// fs.readFile('data/test.text', 'utf-8', (err, data) => {
//     if(err) throw err;
//     console.log(data);
// });

// Readline
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Masukan Nama Anda : ', (nama) => {
    rl.question('Masukan no HP anda : ', (noHP) =>{
        const contact = { nama, noHP };
        const file = fs.readFileSync('data/contacts.json', 'utf-8');
        const contacts = JSON.parse(file);
        
        contacts.push(contact);
        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

        console.log(`Terimakasih ${nama}, Sudah Memasukan Data Anda`);
        
        rl.close();
    })
});