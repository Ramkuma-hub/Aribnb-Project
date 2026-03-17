import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
      
    },
 })


// const plugin = (typeof passportLocalMongoose === 'function') 
//                ? passportLocalMongoose 
//                : passportLocalMongoose.default;

// userSchema.plugin(plugin);
userSchema.plugin(passportLocalMongoose.default);
  const User = mongoose.model('User', userSchema);
   export default User;