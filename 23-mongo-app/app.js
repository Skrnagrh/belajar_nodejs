const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const {body, validationResult, check, Result} = require('express-validator');
const methodeOverride = require('method-override');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

require('./utils/db');
const Contact = require('./model/contact');

const app = express();
const port = 3000;

// setup methode override
app.use(methodeOverride('_method'));

// gunakan ejs /menggunakan setup view angine
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({extended: true} ));

// konfigurasi flash
app.use(cookieParser('secret'));
app.use(session({
    cookie: {maxAge: 6000},
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));
app.use(flash());

// Halaman Home
app.get('/', (req, res) => {
    const mahasiswa = [
        {
            nama: 'sukron',
            email: 'sukron@gmail.com',
        },
        {
            nama: 'samsul',
            email: 'samsul@gmail.com',
        },
    ]
    res.render('index', {
        layout: 'layouts/main-layout',
        nama: 'Sukron Anugrah', 
        title: 'Halaman Home',
        mahasiswa,
    })
});

// Halaman About
app.get('/about', (req, res) => {
    res.render('about', {
        layout: 'layouts/main-layout',
        title: 'Halaman About',
    });
});

// Halaman Contact
app.get('/contact', async (req, res) => {

    // Contact.find().then((contact) =>{
    //     res.send(contact);
    // })
    const contacts = await Contact.find();

    res.render('contact', {
        layout: 'layouts/main-layout',
        title: 'Halaman Contact',
        contacts,
        msg: req.flash('msg'),
    })
});

// buat Tambah Data contact
app.get('/contact/add', (req, res) => {
    res.render('add-contact', {
        layout: 'layouts/main-layout',
        title: 'Form Tambah Data contact'
    })
});

// proses tambah data contact
app.post('/contact', [
    body('nama').custom(async (value) => {
        const duplikat = await Contact.findOne({nama: value});
        if(duplikat){
            throw new Error('Nama Contact sudah digunakan')
        } return true;
    }),
    check('email', 'Email tidak Valid!').isEmail(),
check('nohp', 'No Hp tidak Valid!').isMobilePhone('id-ID'),
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.render('add-contact', {
        layout: 'layouts/main-layout',
        title: 'Form Tambah Data Contact',
            errors: errors.array()
        })
    }else{
        Contact.insertMany(req.body, (erros, result) => {
            req.flash('msg', 'Data Contact berhasil ditambahkan!')
            res.redirect('/contact');
        });
    }
});

// buat delete kontak
// app.get('/contact/delete/:nama', async (req, res)=>{
//     const contact= await Contact.findOne({ nama: req.params.nama });

//     // jika kontak tidak ada
//     if(!contact){
//         res.status(404);
//         res.send('<h1>404</h1>');
//     }else{
//         Contact.deleteOne({_id : contact._id }).then((result) =>{
//             req.flash('msg', 'Data Contact berhasil dihapus!')
//             res.redirect('/contact');
//         });
//     }
// });
app.delete('/contact', (req, res) => {
    Contact.deleteOne({ nama : req.body.nama }).then((result) =>{
        req.flash('msg', 'Data Contact berhasil dihapus!')
        res.redirect('/contact');
    });
})


// buat ubah Data contact
app.get('/contact/edit/:nama', async (req, res) => {
    const contact = await Contact.findOne({nama: req.params.nama})

    res.render('edit-contact', {
        layout: 'layouts/main-layout',
        title: 'Form Ubah Data contact',
        contact,
    })
});

// proses ubah data
app.put('/contact', [
    body('nama').custom(async (value, { req }) => {
        const duplikat = await Contact.findOne({ nama: value });
        if(value !== req.body.oldNama && duplikat){
            throw new Error('Nama Contact sudah digunakan!');
        } 
        return true;
    }),
    check('email', 'Email tidak Valid!').isEmail(),
    check('nohp', 'No Hp tidak Valid!').isMobilePhone('id-ID'),
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.render('edit-contact', {
        layout: 'layouts/main-layout',
        title: 'Form Ubah Data Contact',
        errors: errors.array(),
        contact: req.body,
        })
    }else{
        Contact.updateOne({_id: req.body._id}, 
            {
                $set:{
                    nama: req.body.nama,
                    nohp: req.body.nohp,
                    email: req.body.email,
                        },
    }).then((result) =>{
        // kirimkan flas message
        req.flash('msg', 'Data Contact berhasil diubah!')
        res.redirect('/contact');
    })
    }
});

// Buat Detail Kontak
app.get('/contact/:nama', async (req, res) => {
    // const contact = findContact(req.params.nama);
    const contact = await Contact.findOne({nama: req.params.nama});

    res.render('detail', {
        layout: 'layouts/main-layout',
        title: 'Halaman Detail Contact',
        contact,
    })
});




app.listen(port, () => {
    console.log(`Mongo Contact App | listening at http://localhost:${port}`);
});