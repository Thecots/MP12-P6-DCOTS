const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let commentSchema = new Schema({
  comment: {
    type: String,
    required: [true, "El comentario es obligatorio"],
  },
  author: {
    type: String,
    required: [true, "El contenido es obligatorio"],
  },
  idArticle: {
    type: String,
    required: [true, "El autor es obligatorio"],
  },
  date:{
    type: Date,
    default: new Date()
  }
});

commentSchema.methods.toJSON = function () {
  let comment = this;
  let commentObject = comment.toObject();
  return commentObject;
};

commentSchema.plugin(uniqueValidator, { message: "{PATH} debe ser único" });

module.exports = mongoose.model("Comment", commentSchema);

