var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({

  title: {
    type: String,
    // required: true
  },

  date: {
    type: Date,
    // required: true
  },

  url: {
    type: String
  },

  user: {
    type: String
  }
},
{
  timestamps: true
});

var Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;
