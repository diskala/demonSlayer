const express = require("express");
const router = express.Router();
const multer = require("multer");

const { sessionPostQuiz, getParCodeSessionQuiz } = require("../Controller/sessionQuizController");
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
 
router.post("/sessionquiz/:codeSession", uploads.single('photo'), sessionPostQuiz);
router.get("/getSessionParCode/:codeSession", getParCodeSessionQuiz);
module.exports = router;