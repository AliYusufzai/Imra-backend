const mongoose= require('mongoose');
const bcrypt= require('bcrypt');

const hospitalSchema = new mongoose.Schema({
   fullname: {
       type: String,
       //required: true,
     },
     email: {
       type: String,
      // required: true,
       unique: true,
     },
     phonenumber:{
       type: String,
      // required: true,
     },
     address: {
       type: String,
      // required: true,
     },
     branch: {
      type: String,
      //required: true,
    },
    avatar: {
      type:String
     },
     add_recption:{
    
     },
     add_doctor:{
      type: Number, // Representing as a number
      default: 0,   // Default value (0 for false)
      enum: [0, 1],
    },
    manage_doctor:{
      type: Number, // Representing as a number
      default: 0,   // Default value (0 for false)
      enum: [0, 1],
    },
    
});




module.exports= mongoose.model('Hospital',hospitalSchema);