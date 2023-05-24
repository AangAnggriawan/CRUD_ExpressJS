const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Data Biodata
let biodata = [];

// Endpoint Create Biodata
app.post('/biodata', (req, res) => {
  const { nama, tempat_lahir, tanggal_lahir, alamat } = req.body;
  
  // Validasi data yang dibutuhkan
  if (!nama || !tempat_lahir || !tanggal_lahir || !alamat) {
    return res.status(400).json({ error: 'Nama, tempat_lahir, tanggal_lahir, dan alamat harus diisi.' });
  }
  
  // Buat objek biodata baru
  const newBiodata = {
    id: Date.now().toString(),
    nama,
    tempat_lahir,
    tanggal_lahir,
    alamat
  };
  
  // Tambahkan biodata baru ke array biodata
  biodata.push(newBiodata);
  
  return res.status(201).json(newBiodata);
});

// Endpoint Read Biodata
app.get('/biodata', (req, res) => {
  return res.status(200).json(biodata);
});

// Endpoint Update Biodata
app.put('/biodata/:id', (req, res) => {
  const { id } = req.params;
  const { nama, tempat_lahir, tanggal_lahir, alamat } = req.body;
  
  // Cari biodata berdasarkan ID
  const biodataToUpdate = biodata.find(b => b.id === id);
  
  // Jika biodata tidak ditemukan
  if (!biodataToUpdate) {
    return res.status(404).json({ error: 'Biodata tidak ditemukan.' });
  }
  
  // Perbarui data biodata
  biodataToUpdate.nama = nama || biodataToUpdate.nama;
  biodataToUpdate.tempat_lahir = tempat_lahir || biodataToUpdate.tempat_lahir;
  biodataToUpdate.tanggal_lahir = tanggal_lahir || biodataToUpdate.tanggal_lahir;
  biodataToUpdate.alamat = alamat || biodataToUpdate.alamat;
  
  return res.status(200).json(biodataToUpdate);
});

// Endpoint Delete Biodata
app.delete('/biodata/:id', (req, res) => {
  const { id } = req.params;
  
  // Cari index biodata berdasarkan ID
  const biodataIndex = biodata.findIndex(b => b.id === id);
  
  // Jika biodata tidak ditemukan
  if (biodataIndex === -1) {
    return res.status(404).json({ error: 'Biodata tidak ditemukan.' });
  }
  
  // Hapus biodata dari array
  const deletedBiodata = biodata.splice(biodataIndex, 1);
  
  return res.status(200).json(deletedBiodata[0]);
});

// Jalankan server
app.listen(3000, () => {
  console.log('Server berjalan di port 3000');
});
