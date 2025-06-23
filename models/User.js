const mongoose = require('mongoose')

// 1.	Local Authentication
const UserSchema = new mongoose.Schema({
    username: String,
    password: String
})

module.exports = mongoose.model('User', UserSchema)