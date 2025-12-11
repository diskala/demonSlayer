const mongoose = require('mongoose');
const {Schema} =mongoose;

const ChoiceQuizBySessionSchema =new Schema({
    codeSession:{ type: String, required: true, unique: true},
    quizsSelectedId:[{type: Schema.Types.ObjectId, ref:'apiQuiz'}],
    createdAt: { type: Date, default: Date.now }

});
const choiceQuiz = mongoose.model('choiceQuiz', ChoiceQuizBySessionSchema);
module.exports =choiceQuiz;

