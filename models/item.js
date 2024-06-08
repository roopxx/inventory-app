const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  item_name: {
    type: String,
    required: true,
    maxLength: 50,
  },
  description: {
    type: String,
    required: true,
    maxLength: 100,
  },
  imageURL: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  price: { type: Number, required: true },
  stock_availability: { type: Boolean },
  stock_in_hand: {
    type: Number,
    required: true,
  },
});

ItemSchema.virtual("url").get(function () {
  return `/store/item/${this._id}`;
});

module.exports = mongoose.model("Item", ItemSchema);
