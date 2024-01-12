const { error } = require('console');
const { MongoClient } =  require ('mongodb');
const { isObject } = require('util');

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'wpu';

const client = new MongoClient(url,{
    useNewUrlPaser: true,
    useUnifiedTopology: true,
});

client.connect((error, client) =>{
    if(error){
        return console.log('koneksi gagal!');
    }

    // pilih database
    const db = client.db(dbName);

    // Menambhakan 1 data ke collection mahasiswa
    // db.collection('mahasiswa').insertOne({
    //     nama: 'Fiki',
    //     email: 'fiki@gmail.com'
    // }, 
    // (error, result) => {
    //     if(error){
    //         return console.log('gagal menambahkan data');
    //     }
    //     console.log(result);
    // });

    // menambhakan lebih dari satu data
    // db.collection('mahasiswa').insertMany([
    //     {
    //         nama: "fiki",
    //         email: "fiki@gmail.com"
    //     },
    //     {
    //         nama: "apip",
    //         email: "apip@gmail.com"
    //     }
    // ],
    // (error, result) => {
    //         if(error){
    //             return console.log('gagal menambahkan data');
    //         }
    //         console.log(result);
    //     })

    // Menampilkan semua data yang ada di collection mahasiswa
    // console.log(db.collection('mahasiswa').find().toArray((error, result) => {
    //     console.log(result);
    // }));


    // Menampilkan  data yang berdasarkan kriteria
    // console.log(
    //     db
    //         .collection('mahasiswa')
    //         .find({ _id:  ObjectID('6584de4a551967259429be56')})
    //         .toArray((error, result) => {
    //             console.log(result);
    //     })
    // );

    // mengubah data berdasarkan id
    const updatePromise = db.collection('mahasiswa').updateOne({
            _id: ObjectID("657e926c50cd138de061dac2"),
    },
    {
        $set:{
            nama: 'samlawi',
        }
    });

    updatePromise.then((result)=>{
        console.log(result)
    }).catch((error) => {
        console.log(error);
    });
});