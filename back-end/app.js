const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');
const { FieldValue } = require('firebase-admin/firestore');

// Inisialisasi Firebase Admin SDK
const serviceAccount = require('./firebase-config.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://admin-wash-mac.firebaseio.com",
});

const db = admin.firestore();
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Endpoint: Membaca data dari Firebase Firestore

// API Employees
app.get('/get-data/:collectionName', async (req, res) => {
  try {
    const { collectionName } = req.params;

    // Validasi collectionName
    if (!collectionName) {
      return res.status(400).json({ message: 'Database tidak ditemukan' });
    }

    const snapshot = await db.collection(collectionName).get();

    // Validasi jika koleksi kosong
    if (snapshot.empty) {
      return res.status(404).json({ message: `Koleksi "${collectionName}" tidak ditemukan atau kosong.` });
    }

    const data = snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }));
    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
  }
});

app.get('/get-data/:collectionName/:id', async (req, res) => {
  try {
    const { collectionName, id } = req.params;

    // Validasi collectionName dan id
    if (!collectionName) {
      return res.status(400).json({ message: 'Nama koleksi tidak diberikan.' });
    }
    if (!id) {
      return res.status(400).json({ message: 'ID dokumen tidak diberikan.' });
    }

    // Mengambil dokumen berdasarkan id
    const docRef = db.collection(collectionName).doc(id);
    const docSnapshot = await docRef.get();

    // Validasi jika dokumen tidak ditemukan
    if (!docSnapshot.exists) {
      return res.status(404).json({ message: `Dokumen dengan ID "${id}" tidak ditemukan di koleksi "${collectionName}".` });
    }

    const data = { id: docSnapshot.id, ...docSnapshot.data() };

    res.status(200).json(data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
  }
});

app.post('/add-data', async (req, res) => {
  try {
    const employee = req.body;
    const employeeRef = await db.collection('employee').add(employee);
    res.status(201).json({ message: 'Employee berhasil ditambahkan', id: employeeRef.id });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menambahkan employee', error: error.message });
  }
});

app.delete('/delete-employee/:id', async (req, res) => {
  try {
    const { id } = req.params; // Mendapatkan ID dari parameter URL

    if (!id) {
      return res.status(400).json({ message: 'ID karyawan tidak valid' });
    }

    // Referensi dokumen karyawan di Firestore
    const employeeRef = db.collection('employee').doc(id);

    // Periksa apakah dokumen ada
    const docSnapshot = await employeeRef.get();
    if (!docSnapshot.exists) {
      return res.status(404).json({ message: `Karyawan dengan ID "${id}" tidak ditemukan` });
    }

    // Hapus dokumen
    await employeeRef.delete();

    res.status(200).json({ message: 'Karyawan berhasil dihapus', id });
  } catch (error) {
    console.error('Error saat menghapus karyawan:', error);
    res.status(500).json({
      message: 'Terjadi kesalahan saat menghapus karyawan',
      error: error.message,
    });
  }
});

app.put('/update-employee/:id', async (req, res) => {
  try {
    const { id } = req.params; // Mendapatkan ID dari parameter URL
    const data = req.body;

    if (!id) {
      return res.status(400).json({ message: 'ID karyawan tidak valid' });
    }

    // Referensi dokumen karyawan di Firestore
    const employeeRef = db.collection('employee').doc(id);

    // Periksa apakah dokumen ada
    const docSnapshot = await employeeRef.get();
    if (!docSnapshot.exists) {
      return res.status(404).json({ message: `Karyawan dengan ID "${id}" tidak ditemukan` });
    }

    // Hapus dokumen
    await employeeRef.update(data);

    res.status(200).json({ message: 'Karyawan berhasil dihapus', id });
  } catch (error) {
    console.error('Error saat menghapus karyawan:', error);
    res.status(500).json({
      message: 'Terjadi kesalahan saat menghapus karyawan',
      error: error.message,
    });
  }
});

// API Schedule
app.post('/add-schedule/:employeeId', async (req, res) => {
  
  try {
    const { employeeId } = req.params; // Mendapatkan ID karyawan dari parameter URL
    const data = req.body; // Mendapatkan data jadwal dari body request

    if (!employeeId || !data || !data.desc) {
      return res.status(400).json({ message: 'ID karyawan atau data jadwal tidak valid' });
    }

    // Referensi dokumen karyawan di Firestore
    const employeeRef = db.collection('employee').doc(employeeId);

    // Perbarui dokumen dengan menambahkan jadwal baru
    await employeeRef.update ({
      schedule: admin.firestore.FieldValue.arrayUnion({ desc: data.desc }),
    });

    res.status(200).json({ message: 'Jadwal berhasil ditambahkan' });
  } catch (error) {
    console.error('Error saat menambahkan jadwal:', error);
    res.status(500).json({
      message: 'Terjadi kesalahan saat menambahkan jadwal',
      error: error.message,
    });
  }
});

app.delete('/delete-schedule/:id', async (req, res) => {
  try {
    const { id } = req.params; // Mendapatkan ID dari parameter URL
    const data = req.body; // Mendapatkan data jadwal dari body request
    
    if (!id || !data || !data.desc) {
      return res.status(400).json({ message: 'ID karyawan atau data jadwal tidak valid' });
    }

    // Referensi dokumen karyawan di Firestore
    const employeeRef = db.collection('employee').doc(id);

    // Hapus schedule
    await employeeRef.update ({
      schedule: admin.firestore.FieldValue.arrayRemove({ desc: data.desc }),
    });

    res.status(200).json({ message: 'Jadwal berhasil dihapus', id });
  } catch (error) {
    console.error('Error saat menghapus jadwal:', error);
    res.status(500).json({
      message: 'Terjadi kesalahan saat menghapus jadwal',
      error: error.message,
    });
  }
});

app.put('/update-schedule/:employeeId/:scheduleId', async (req, res) => {
  const { employeeId, scheduleId } = req.params; // Mendapatkan ID karyawan dan jadwal dari parameter URL
  const { data } = req.body;  // Mendapatkan data deskripsi jadwal dari body request

  if (!data || !data.desc) {
    return res.status(400).json({ message: 'Deskripsi jadwal tidak valid' });
  }

  try {
    // Mendapatkan referensi dokumen karyawan di Firestore
    const employeeRef = db.collection('employee').doc(employeeId);
    const employeeSnap = await employeeRef.get();

    if (!employeeSnap.exists) {
      return res.status(404).json({ message: 'Karyawan tidak ditemukan' });
    }

    const employeeData = employeeSnap.data();
    const updatedSchedule = employeeData.schedule.map((item, index) => {
      // Membandingkan ID jadwal dan memperbarui jika sesuai
      if (index.toString() === scheduleId) {
        return { ...item, desc: data.desc };  // Update deskripsi jadwal
      }
      return item;  // Tidak diubah jika ID tidak cocok
    });

    // Memperbarui jadwal karyawan di Firestore
    await employeeRef.update({
      schedule: updatedSchedule,
    });

    res.status(200).json({ message: 'Jadwal berhasil diperbarui' });
  } catch (error) {
    console.error('Error saat memperbarui jadwal:', error);
    res.status(500).json({ message: 'Terjadi kesalahan saat memperbarui jadwal', error: error.message });
  }
});
// Jalankan server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend berjalan di http://localhost:${PORT}`);
});