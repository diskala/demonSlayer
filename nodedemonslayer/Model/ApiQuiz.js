const mongoose=require('mongoose');
const {Schema}=mongoose;
const quizSchema=new Schema({
  id: { type: Number, required: true, unique: true },
  difficulty: { type: String, required: true },
  question: { type: String, required: true },
  options: { type: [String], required: true }, // tableau de strings
  answer: { type: String, required: true }
});
const Quiz = mongoose.model('apiQuiz', quizSchema);
module.exports=Quiz;