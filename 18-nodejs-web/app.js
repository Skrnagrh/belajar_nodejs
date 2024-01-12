const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { loadContact, findContact, addContact, cekDuplikat} = require('./utils/contacts');
const {body, validationResult, check} = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const app = express();
const port = 3000

// gunakan ejs
app.set('view engine', 'ejs');
// thrid-party middleware
app.use(expressLayouts);
// built in middleware
app.use(express.static('public')); //untuk akses file public
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

app.get('/', (req, res) => {
    // res.sendFile('./index.html', { root: __dirname})
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

app.get('/about', (req, res) => {
    res.render('about', {
        layout: 'layouts/main-layout',
        title: 'Halaman About',
    });
});

app.get('/contact', (req, res) => {
    const contacts = loadContact();
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

// proses data contact
app.post('/contact', [
    body('nama').custom((value) => {
        const duplikat = cekDuplikat(value);
        if(duplikat){
            throw new Error('Nama Contact sudah digunakan')
        } return true;
    }),
    check('email', 'Email tidak Valid!').isEmail(),
check('nohp', 'No Hp tidak Valid!').isMobilePhone('id-ID'),
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        // return res.status(400).json({errors: errors.array()});
        res.render('add-contact', {
        layout: 'layouts/main-layout',
        title: 'Form Tambah Data Contact',
            errors: errors.array()
        })
    }else{
        addContact(req.body);
        // kirimkan flas message
        req.flash('msg', 'Data Contact berhasil ditambahkan!')
        res.redirect('/contact');
    }
});

// Buat Detail Kontak
app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama);

    res.render('detail', {
        layout: 'layouts/main-layout',
        title: 'Halaman Detail Contact',
        contact,
    })
});

app.use((req, res) => {
    res.status(404)
  res.send('<h1>404</h1>')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
