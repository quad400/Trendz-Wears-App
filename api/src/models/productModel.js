const { default: mongoose } = require("mongoose");

const ratingSchema = new mongoose.Schema({
  star: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    trim: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      // default: "gown",
      enum: [
        "gown", "t-shirt", "jogger","jacket","tops","jean", "shoe"
      ],
      required: true
    },
    detail: {
      type: String,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    colors: [String],
    sizes: [String],
    ratings: [ratingSchema],
    averageRating: Number,
    images: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
