const UserSchema = new Schema({
    userName: {
        type: String,
        // need to add *** UNIQUE 
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        // need to add *** UNIQUE 

        // need to add *** VALIDATION must match a valid email address (Mongoose's matching validation) 
    },
    thoughts: {
        type: String,
        //Array of _id values referencing the Thought model
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    friends: [
        {
            //Array of _id values referencing the User model (self-reference)
        }
    ]
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);
//create a virtual called 'friendCount' that retrieves the length of the user's 'frinds' array field on query
UserSchema.virtual('friendCount').get(function () {
    return this.friends.reduce((total, friends) => total + friends.length + 1, 0);
});


//vreate the User model using the UserSchema
const User = model('User', UserSchema);

//export the User Model
module.exports = User;