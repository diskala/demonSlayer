const express = require('express');
const path = require('path');
const multer = require('multer');
const router = express.Router();
const {createParticipant, getAllParticipants, ParticipantByUsername} = require('../Controller/ParticipantController');

const storages = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/photoProfil');
    },
    filename: function (req, file, cb) {
        // Utiliser un horodatage pour éviter les conflits de noms de fichiers
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Configurer l'upload avec Multer
const uploads = multer({ storage: storages });
router.post('/participant',  uploads.single('photo'), createParticipant);
router.get('/allparticipant', getAllParticipants);
router.get('/participant/:codeSession', ParticipantByUsername);


module.exports = router;