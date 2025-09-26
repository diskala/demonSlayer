const mongoose = require('mongoose');
const { Schema } = mongoose;
const sessionQuizSchema = new Schema({
   codeSession: { type: String, required: true, unique: true},
   participants: [
    {
      
      username: { type: String, required: true },
      photo: { type: String },
      order: { type: Number},
     
     
    }
  ],
  questions: [
    {
      apiQuizId: {type: Schema.Types.ObjectId, ref: "apiQuiz"},
      answers: [ { 
        username: String, 
        selectedChoice: String, 
        isCorrect: Boolean, 
        score: { type: Number, default: 0 } } ]
    }
  ],
  status: { type: String, default: "waiting" }, // waiting | ongoing | finished
  date: { type: Date, default: Date.now }
});
const SessionQuiz = mongoose.model('sessionQuiz', sessionQuizSchema);
module.exports = SessionQuiz;