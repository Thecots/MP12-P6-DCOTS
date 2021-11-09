const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let serveiSchema = new Schema({
  product: {
    type: String,
    required: [true, "product is required"],
  },
  amount: {
    type: Number,
    required: [true, "amount is required"],
  },
  selled: {
    type: Number,
    required: [true, "number of products selled is required"],
  },
  lastsell:{
    type: Date,
    required: [true, "las sell date is required"],
  },
  insell: {
    type: Boolean,
    required: [true, "state of sell product is requried"],
  },
});

serveiSchema.methods.toJSON = function () {
  let servei = this;
  let serveiObject = servei.toObject();
  return serveiObject;
};

serveiSchema.plugin(uniqueValidator, { message: "{PATH} debe ser único" });

module.exports = mongoose.model("Servei", serveiSchema);
