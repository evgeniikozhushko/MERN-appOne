const mongoose = require('mongoose')

// 1.	Local Authentication
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    age: Number,
    gender: String
})

module.exports = mongoose.model('User', UserSchema)