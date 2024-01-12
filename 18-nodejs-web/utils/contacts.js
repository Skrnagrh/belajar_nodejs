const fs = require('fs');

// membuat folder data jika belum ada
const dirPath = './data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}

// membuat file contactjs jika belum ada
const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf-8');
}

// ambil semua data di contact.js
const loadContact = () => {
    const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(fileBuffer);
    return  contacts;
}

// cari contact berdasarka nama
const findContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find(
        (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
    );
    return contact;
}

// methode menimpa data file contacts.json dengan yang baru
const saveContacts = (contacts) => {
    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
}

// function untuk menambahkan data contact baru
const addContact = (contact) =>{
    const contacts = loadContact();
    contacts.push(contact);
    saveContacts(contacts);
}

// cek nama yang duplikat 
const cekDuplikat = (nama) =>{
    const contacts = loadContact();
    return contacts.find((contact) => contact.nama === nama)
}
module.exports = {loadContact, findContact, addContact, cekDuplikat}