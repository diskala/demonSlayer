const mongoose = require('mongoose');
const {Schema} =mongoose;
const sessionQuizSchema = new Schema({
  codeSession: { type: String, required: true, unique: true },
  participants: [
    {
      username: { type: String, required: true },
      photo: { type: String },
      order: { type: Number },
      score: {type: Number}
      
      
      
    }
  ],
 questions: {
  type: [
    {
      textQuestionId: { type: Schema.Types.ObjectId, ref: "choiceQuiz", required: true },
      answers: [
        {
          participant: { type: String, required: true },
          choice: { type: String, required: true },
          isCorrect: { type: Boolean, default: false }
          
        }
      ]
    }
  ],
  default: [] // ← tableau vide par défaut
},
  status: { type: String, default: "waiting" },
  isValided: {type: Boolean},
 
  date: { type: Date, default: Date.now }
});

const SessionQuiz = mongoose.model('sessionQuiz', sessionQuizSchema);
module.exports = SessionQuiz;