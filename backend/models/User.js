const mongoose = require('mongoose');
const { Schema } = mongoose;
// To createa a scheema go to mongoose oficail page  and copy the schema
const UserSchema = new Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true, 
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
    }
  });
// before using a scheema you have to create a  model and 
  module.exports = mongoose.model('Usser',UserSchema);