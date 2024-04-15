const mongoose = require('mongoose');
// To createa a scheema go to mongoose oficail page  and copy the schema
const NoteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usser'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    tag: {
        type: String,
       
    }
})
// before using a scheema you have to create a  model and 
module.exports = mongoose.model('notes', NoteSchema);