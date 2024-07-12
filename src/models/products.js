//src/models/products.js
const { Schema, model } = require("mongoose");

const productsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required:true
  },
  place: {
    type: String,
    required:true
  }
});

module.exports = model("Mainstream", productsSchema);