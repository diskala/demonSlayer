const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3002;
const morgan = require('morgan');
const multer = require("multer");
// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
// const xss = require('xss-clean');
// const hpp = require('hpp');
// const mongoSanitize = require('express-mongo-sanitize');
// const compression = require('compression');
const mongoose = require('mongoose');
// const swaggerUi = require('swagger-ui-express');
// const swaggerJsDoc = require('swagger-jsdoc');
const path = require('path');
require('dotenv').config();
const connectDB = require('./database');
connectDB();
const app = express();
 
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });

  
// const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
// const RATE_LIMIT_MAX = 100; // limit each IP to 100 requests per windowMs
// const SWAGGER_OPTIONS = {
//   swaggerDefinition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Node Demon Slayer API',
//       version: '1.0.0',
//         description: 'API documentation for Node Demon Slayer project',
//         contact: {
//             name: 'Seghir Ouali Nacime',
//             email: 'discarsLuxe@gmail.com',
//             url: 'https://yourwebsite.com',
//         },
//       servers: [{ url: `http://localhost:${PORT}` }],
      
      
      
//     },
    
//   },
//   apis: ['./routes/*.js'],
  

// };
// Utilisation du middleware body-parser pour analyser les données du formulaire
app.use(cors());
// app.use(helmet());
// app.use(xss());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

io.on('connection', (socket) => {
  console.log('New client connected');
    socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Configuration de Multer pour le stockage des photo
const storages = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/photoProfil/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const uploads = multer({ storages });

// Route pour gérer les téléchargements de fichiers avec Multer
app.post("/uploads", uploads.single("photo"), (req, res) => {
  res.json({ message: "Photo téléchargé avec succès !" });
});
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(SWAGGER_OPTIONS)));
// app.use(mongoSanitize());
// app.use(hpp());
// app.use(compression());
// Définir le dossier public pour servir les fichiers statiques
app.use(express.static(path.join(__dirname, "public")));
const routeUsers = require('./Route/UsersRoutes');
const routeParticipant = require('./Route/ParticipantRoute');
const routeSessionQuiz = require('./Route/SessionQuizRoute');
app.use(routeUsers);
app.use(routeParticipant);
app.use(routeSessionQuiz);
server.listen(port, () => {
  console.log(`Serveur demarre sur http://localhost:${port}`);
});
 
// app.listen(process.env.PORT, () => {
//   console.log(`Serveur demarre sur http://localhost:${process.env.PORT}`);
// });

 