const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    emailId: {
        type: String, required: true, unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v)
            },
            message: 'Please enter a valid email address'
        }
    },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    gender: {
        type: String, required: true,
        validate(value) {
            if (!['male', 'female', 'other'].includes(value.toLowerCase())) {
                throw new Error('Gender must be male, female, or other');
            }
        }
    },
    photo_url: {
        type: String, required: true,
        default: "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
    },
    about: {
        type: String,
        maxlength: 1000,
        minlength: 10,
        default: "this user has not added any about"
    },
    skills: {
        type: [String],
        validate(value) {
            if (value.length === 0) {
                throw new Error('Skills is required')
            }
        }
    }



}
    , { timestamps: true })

module.exports = mongoose.model('User', userSchema)
