var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    articles: [{
        type: Schema.Types.ObjectId,
        ref: "Article"
    }]

}, {timestamps: true});

var User = mongoose.model("User", UserSchema);

// Export the model
module.exports = User;
