const mongoose=require('mongoose');
const {Schema}=mongoose;
const participantSchema=new Schema({
  codeSessions: { type: String, required: true, unique: true },
  participantId:[{
  username: { type: String, required: true, unique: true },
  photo: { type: String },
  order: { type: Number},
  },
  ],
  status: { type: String, default: "waiting" },
  createdAt: { type: Date, default: Date.now }
    
});
const participant=mongoose.model('participant', participantSchema);
module.exports=participant; 