const express = require('express');
const router = express.Router();
const { ApiQuizPost, ApiQuizGet} = require('../Controller/RecupQuizController');
router.post('/quatreQuiz', ApiQuizPost);
router.get("/apiQuiz/:codeSession", ApiQuizGet);

module.exports=router;
