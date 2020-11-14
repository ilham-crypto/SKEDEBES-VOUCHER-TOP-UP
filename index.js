const express = require('express');
const mysql = require('mysql');
const hbs = require('hbs');
const bodyParser = require('body-parser');



const index = express();
const port = 1300;

// vuew engine hbs
index.set('view egine', 'hbs');

//setting parser data dari mysql ke indexjs
index.use(bodyParser.json());
index.use(bodyParser.urlencoded({ extended: false}));

const koneksi = mysql.createConnection({
    host: 'localhost',
    user: 'ilham',
    password: '0000',
    database: 'top_up'
});

koneksi.connect((err) => {
    if(err) throw err;
    console.log("koneksi database berhasil disambungkan");
})

index.get('/', (req, res) => {
    koneksi.query('use top_up', (err, hasil) => {
        if(err) throw err;
        res.render('login.hbs',{
            judulhalaman: 'DATA-DATA',
            data: hasil
        });
    });
});

index.get('/inputpembayaran', (req, res) => {
    koneksi.query('SELECT*FROM pembayaran', (err, hasil) => {
        if(err) throw err;
        res.render('inputpembayaran.hbs',{
            judulhalaman: 'DATA-PEMBAYARAN',
            data: hasil
        });
    });
});

index.post('/inputpembayaran', (req, res) =>{
    var nama_pelanggan = req.body.inputnama_pelanggan;
    var bulan = req.body.inputbulan;
    var jumlah = req.body.inputjumlah;
    var keterangan = req.body.inputketerangan;
    var jenis_top_up = req.body.inputjenis_top_up;
    var tanggan_top_up = req.body.inputtanggan_top_up;
    koneksi.query('INSERT INTO pembayaran(nama_pelanggan, bulan, jumlah, keterangan, jenis_top_up,tanggan_top_up)values(?,?,?,?,?,?)',
    [nama_pelanggan, bulan, jumlah, keterangan, jenis_top_up ,tanggan_top_up],
    (err, hasil) => {
        if(err) throw err;
        res.redirect('/inputpembayaran');
    }
    )
});

index.get('/hapus-id_pembayaran/:id_pembayaran', (req, res) => {
    var id_pembayaran = req.params.id_pembayaran;
    koneksi.query("DELETE FROM pembayaran WHERE id_pembayaran=?",
         [id_pembayaran], (err, hasil) => {
             if(err) throw err;
             res.redirect('/pembayaran');
         }
    )
});
// kosek
index.get('/pembayaran', (req, res) => {
    koneksi.query('SELECT*FROM pembayaran', (err, hasil) => {
        if(err) throw err;
        res.render('pembayaran.hbs',{
            judulhalaman: 'DATA-PEMBAYARAN',
            data: hasil
        });
    });
});

index.post('/pembayaran', (req, res) =>{
    var nama_pelanggan = req.body.inputnama_pelanggan;
    var bulan = req.body.inputbulan;
    var jumlah = req.body.inputjumlah;
    var keterangan = req.body.inputketerangan;
    var jenis_top_up = req.body.inputjenis_top_up;
    var tanggan_top_up = req.body.inputtanggan_top_up;
    koneksi.query('INSERT INTO pembayaran(nama_pelanggan, bulan, jumlah, keterangan, jenis_top_up,tanggan_top_up)values(?,?,?,?,?,?)',
    [nama_pelanggan, bulan, jumlah, keterangan, jenis_top_up ,tanggan_top_up],
    (err, hasil) => {
        if(err) throw err;
        res.redirect('/pembayaran');
    }
    )
});

index.get('/hapus-id_pembayaran/:id_pembayaran', (req, res) => {
    var id_pembayaran = req.params.id_pembayaran;
    koneksi.query("DELETE FROM pembayaran WHERE id_pembayaran=?",
         [id_pembayaran], (err, hasil) => {
             if(err) throw err;
             res.redirect("/pembayaran")
         }
    )
});

index.listen(port, () => {
    console.log(`app TOP_UP  berjalan pada port ${port}`);
});