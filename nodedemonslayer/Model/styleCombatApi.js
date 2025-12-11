const mongoose=require('mongoose');
const {Schema}=mongoose;

const styleCombatSchema=new Schema({
   id:{type:Number, required: true, unique: true},
   name:{type:String},
   description: { type: String }, // description longue
   img: { type: String },
   combat_style_character:[
   { 
    id:{type:Number, required: true},
    name:{type:String},
    description: { type: String },
   }, // description longue

   ],


},
{collection:"style_combats"}
);
module.exports=mongoose.model('style_combat', styleCombatSchema)

