const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const UserSchema = new mongoose.Schema(
 {
   
    event: [{type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true, unique: true} ]
    ,
    description: {
        type: String,
        required: true,
    },
    user: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true, unique: true} ]
        
    },
    points: {
        type: Number,
        required: true,

    }
}
);





   
