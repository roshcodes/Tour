const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    description: String,
    Tour_Fees: String,
    Tour_Operator: String
});

module.exports = mongoose.model('Special', userSchema);