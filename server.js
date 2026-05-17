const express = require('express');
const multer = require('multer');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;
const SECRET = 'UBOSS_DEMO_SECRET';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// STORAGE
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },

    filename: function (req, file, cb) {

        const uniqueName = Date.now() + '-' + file.originalname;

        cb(null, uniqueName);
    }
});

const upload = multer({ storage: storage });

// HELPERS
function readJson(file) {

    return JSON.parse(fs.readFileSync(file));
}

function writeJson(file, data) {

    fs.writeFileSync(file, JSON.stringify(data, null, 4));
}

// TOKEN API
app.post('/api/token', (req, res) => {

    const {
        client_id,
        client_secret,
        grant_type
    } = req.body;

    if (!client_id || !client_secret) {

        return res.status(400).json({
            success: false,
            message: 'Missing credentials'
        });
    }

    const token = jwt.sign(
        {
            client_id
        },
        SECRET,
        {
            expiresIn: '1h'
        }
    );

    const tokens = readJson('./database/tokens.json');

    tokens.push({
        token,
        created: new Date()
    });

    writeJson('./database/tokens.json', tokens);

    res.json({
        access_token: token,
        token_type: 'Bearer',
        expires_in: 3600,
        grant_type
    });
});

// AUTH MIDDLEWARE
function verifyToken(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {

        return res.status(401).json({
            success: false,
            message: 'Authorization header missing'
        });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, SECRET, (err, decoded) => {

        if (err) {

            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }

        req.user = decoded;

        next();
    });
}

// FILE UPLOAD API
app.post(
    '/api/upload',
    verifyToken,
    upload.single('file'),
    (req, res) => {

        if (!req.file) {

            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        const uploads = readJson('./database/uploads.json');

        const fileId = uuidv4();

        const fileData = {
            file_id: fileId,
            filename: req.file.filename,
            originalname: req.file.originalname,
            size: req.file.size,
            uploaded_at: new Date(),
            path: req.file.path
        };

        uploads.push(fileData);

        writeJson('./database/uploads.json', uploads);

        res.json({
            success: true,
            file_id: fileId,
            filename: req.file.originalname,
            download_url: `http://localhost:${PORT}/uploads/${req.file.filename}`
        });
    }
);

// CREATE RECORD API
app.post('/api/create-record', verifyToken, (req, res) => {

    const {
        file_id,
        callId,
        localNumber,
        remoteNumber,
        startTime,
        endTime
    } = req.body;

    const records = readJson('./database/records.json');

    const record = {
        record_id: uuidv4(),
        file_id,
        callId,
        localNumber,
        remoteNumber,
        startTime,
        endTime,
        created_at: new Date()
    };

    records.push(record);

    writeJson('./database/records.json', records);

    res.json({
        success: true,
        message: 'Record created successfully',
        data: record
    });
});

// GET ALL UPLOADS
app.get('/api/uploads', (req, res) => {

    const uploads = readJson('./database/uploads.json');

    res.json(uploads);
});

// GET ALL RECORDS
app.get('/api/records', (req, res) => {

    const records = readJson('./database/records.json');

    res.json(records);
});

// HEALTH CHECK
app.get('/', (req, res) => {

    res.send('Uboss External Recording API Running');
});

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);
});