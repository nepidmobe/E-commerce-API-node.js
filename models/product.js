const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "please provide product name"],
      maxlength: [100, "name cannot be more than 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "please provide product price"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "please provide product description"],
      maxlength: [1000, "description cannot be more than 1000 characters"],
    },
    //if image is not provide use default image, image can be on server or front end,it's your choice
    image: {
      type: String,
      required: [true, "please provide product image"],
      default: "/uploads/example.jpeg",
    },
    category: {
      type: String,
      required: [true, "please provide product category"],
      enum: ["office", "kitchen", "bedroom"],
    },
    company: {
      type: String,
      required: [true, "please provide product company"],
      enum: {
        values: ["ikea", "liddy", "marcos"],
        message: "{VALUE} is not supported",
      },
    },
    colors: {
      type: [String],
      required: [true, "please provide product colors"],
      default: ["#2345"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,
      required: true,
      default: 15,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numberOfReviews: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

ProductSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  justOne: false,
  // match: { rating: 2 },
});
//reviews act as new field in product model. match matches and give rating with 2 review.
//just one give one review but product may have any number of list so, it is made false to get array of reviews
//local field should match foreign field in review.foreign field in review =local field in product
// now can populate in reverse if review has refrence to product and product donot have than ...
//with virtual populate you cannot query or filter reviews so, use controller and make routes for such operation.

ProductSchema.pre("remove", async function (next) {
  await this.model("Review").deleteMany({ product: this._id });
  //important of remove. once product deleted all associated review must be deleted too.
});

module.exports = mongoose.model("Product", ProductSchema);
