import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Paths
const DATA_FILE = path.join(__dirname, '../src/data.json');
const PUBLIC_DIR = path.join(__dirname, '../public');

app.use(cors());
app.use(express.json({ limit: '50mb' })); // Support large JSON payloads if necessary

// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, PUBLIC_DIR);
  },
  filename: function (req, file, cb) {
    // Generate a unique filename using timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage: storage });

// API: Get Data
app.get('/api/data', (req, res) => {
  try {
    const rawData = fs.readFileSync(DATA_FILE, 'utf-8');
    res.json(JSON.parse(rawData));
  } catch (error) {
    console.error('Error reading data.json:', error);
    res.status(500).json({ error: 'Failed to read data file.' });
  }
});

// API: Save Data
app.post('/api/data', (req, res) => {
  try {
    const newData = req.body;
    fs.writeFileSync(DATA_FILE, JSON.stringify(newData, null, 2), 'utf-8');
    res.json({ success: true, message: 'Data saved successfully.' });
  } catch (error) {
    console.error('Error writing data.json:', error);
    res.status(500).json({ error: 'Failed to save data file.' });
  }
});

// API: Upload Image
app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }
    // Return the relative public path to the file (e.g., "/image-12345.png")
    const publicUrl = `/${req.file.filename}`;
    res.json({ success: true, url: publicUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file.' });
  }
});

app.listen(PORT, () => {
  console.log(`Local CMS server running at http://localhost:${PORT}`);
  console.log(`Ready to serve and update ${DATA_FILE}`);
});
