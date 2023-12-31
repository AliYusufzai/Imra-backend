const mongoose= require('mongoose');
const bcrypt= require('bcrypt');

const receptionSchema= new mongoose.Schema({
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
   name: {
       type: String,
       //required: true,
     },
     email: {
       type: String,
       //required: true,
       unique: true,
     },
     phonenumber:{
       type: String,
       //required: true,
     },
     address:{
        type: String,
        //required: true,
      },
      avatar:{
        type:String
      } ,
     password: {
       type: String,
       //required: true,
     },
     
     tokens: [{ type: Object }],
    
    
});

receptionSchema.pre('save',function(next){
   if(this.isModified('password')){
       bcrypt.hash(this.password,8,(err, hash)=>{
           if(err) return next(err);
           this.password=hash;
           next();
       })
   }
});

receptionSchema.methods.comparepassword= async function(password){
   if (!password) throw new Error('Password is mission, can not compare!');
   try {
       const result = await bcrypt.compare(password, this.password);
       return result;
     } catch (error) {
       console.log('Error while comparing password!', error.message);
     }
};

receptionSchema.statics.isThisEmailInUse = async function (email){
   if (!email) throw new Error('Invalid Email');
   try {
     const reception = await this.findOne({ email });
     if (reception) return false;
 
     return true;
   } catch (error) {
     console.log('error inside isThisEmailInUse method', error.message);
     return false;
   }
};

module.exports= mongoose.model('Reception',receptionSchema);