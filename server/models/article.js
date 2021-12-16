const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let articleSchema = new Schema({
  title: {
    type: String,
    required: [true, "El titulo es obligatorio"],
  },
  content: {
    type: String,
    required: [true, "El contenido es obligatorio"],
  },
  author: {
    type: String,
    required: [true, "El autor es obligatorio"],
  },
  date:{
    type: Date,
    default: new Date()
  },
  views: {
    type: Number,
    default: 0
  }
});

articleSchema.methods.toJSON = function () {
  let article = this;
  let articleObject = article.toObject();
  return articleObject;
};

articleSchema.plugin(uniqueValidator, { message: "{PATH} debe ser único" });

module.exports = mongoose.model("Article", articleSchema);

