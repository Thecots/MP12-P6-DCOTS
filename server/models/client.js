const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let clientSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "El nom d'usuari és obligatori"],
  },
  name: {
    type: String,
    required: [true, "El nom d'usuari és obligatori"],
  },
  lastname: {
    type: String,
    required: [true, "Els cognoms son obligatoris"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "El correu electrònic és obligatori"],
  },
  password: {
    type: String,
    required: [true, "La contrasenya és obligatoria"],
  },
  phone: {
    type: Number,
    required: [true, "El tlèfon és obligatori"],
  },
  adress: {
    type: String,
    required: [true, "La adreça és obligatoria"],
  }
});

clientSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

clientSchema.plugin(uniqueValidator, { message: "{PATH} debe ser único" });

module.exports = mongoose.model("Client", clientSchema);
