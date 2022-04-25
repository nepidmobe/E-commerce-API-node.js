const mongoose = require("mongoose");
const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "please provide review rating"],
    },
    title: {
      type: String,
      trim: true,
      required: [true, "please provide review title"],
      maxlength: 100,
    },
    comment: {
      type: String,
      required: [true, "please provide review comment"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);
//user can give not more than 1 review//another way in create review controller checking db with prodid & userid
ReviewSchema.index({ products: 1, user: 1 }), { unique: true };

//static method in mongoose can be call in obj of schema without instances made in controllers
ReviewSchema.statics.calculateAverageRating = async function (productId) {};

ReviewSchema.post("save", async function () {
  await this.constructor.calculateAverageRating(this.product); //calling static mongoose instance
  //no of review in product schema to increase
});

ReviewSchema.post("save", async function () {
  await this.constructor.calculateAverageRating(this.product); //calling static mongoose instance
  //number of review in product field to decrease
});

module.exports = mongoose.model("Review", ReviewSchema);
