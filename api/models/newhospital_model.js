const mongoose= require('mongoose');
const bcrypt= require('bcrypt');

const hospitalsSchema= new mongoose.Schema({
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
        type: Number, // Representing as a number
        default: 0,   // Default value (0 for false)
        enum: [0, 1],
      },
      manage_recption:{
        type: Number, // Representing as a number
        default: 0,   // Default value (0 for false)
        enum: [0, 1],
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
     password: {
        type: String,
        //required: true,
      },
      tokens: [{ type: Object }],
 });

hospitalsSchema.pre('save',function(next){
   if(this.isModified('password')){
       bcrypt.hash(this.password,8,(err, hash)=>{
           if(err) return next(err);
           this.password=hash;
           next();
       })
   }
});

hospitalsSchema.methods.comparepassword= async function(password){
   if (!password) throw new Error('Password is mission, can not compare!');
   try {
       const result = await bcrypt.compare(password, this.password);
       return result;
     } catch (error) {
       console.log('Error while comparing password!', error.message);
     }
};

hospitalsSchema.statics.isThisEmailInUse = async function (email){
   if (!email) throw new Error('Invalid Email');
   try {
     const hops = await this.findOne({ email });
     if (hops) return false;
 
     return true;
   } catch (error) {
     console.log('error inside isThisEmailInUse method', error.message);
     return false;
   }
};

module.exports= mongoose.model('Hospitals',hospitalsSchema);