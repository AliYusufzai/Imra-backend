const mongoose = require("mongoose");

const MedicationhistorySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    medicine : {type: String, },
    reason: {type: String, },
    prescribed: {type: String,
     // mongoose.Schema.Types.ObjectId, ref: "Doctor" 
    patientNo:{type:String},
    patientName:{type:String},
    dieases:{type:String},
    test:{type:String},
    fees:{type:String},
    reason:{type: String},
    medCenter:{type:String},
    doctor_name:{type:String},
    },
   datefrom:{
    type:String
   },
   dateto:{
    type:String
   }

},{timestamps: true})
module.exports = mongoose.model("MedicationHistory", MedicationhistorySchema);