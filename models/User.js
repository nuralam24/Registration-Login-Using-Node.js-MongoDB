const mongoose = require('mongoose');
const valid = require('validator');
const Schema = mongoose.Schema;


const UserSchema = new Schema ({

    name: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        trim: true,
        required: true
    },

    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,

        validate: {
            validator: (v) => {
                valid.isEmail(v)
            },
            message: `{VALUE} is not a email`
        }
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    }

});

module.exports = mongoose.model('User', UserSchema);
