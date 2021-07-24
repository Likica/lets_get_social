const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    thoughts: {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    },
    friends: [
        {
            //Array of _id values referencing the User model (self-reference)
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    ],
},
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);
//create a virtual called 'friendCount' that retrieves the length of the user's 'frinds' array field on query
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});


//create the User model using the UserSchema
const User = model('User', userSchema);

//export the User Model
module.exports = User;