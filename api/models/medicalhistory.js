const mongoose = require("mongoose");

const MedicalHistorySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    procedure: {type: String},
    patientNo:{type:String},
    patientName:{type:String},
    dieases:{type:String},
    test:{type:String},
    fees:{type:String},
    prescribed:{type:String},
    reason:{type: String},
    medCenter:{type:String},
    doctor_name:{type:String},
    searchCount: {
        type: Number,
        default: 0,
      },
    //medCenter:{type:mongoose.Schema.Types.ObjectId, ref: "Facility"},
    date: {type: String}

   
    },
    {timestamps: true}
);


module.exports = mongoose.model("MedicalHistory",MedicalHistorySchema)