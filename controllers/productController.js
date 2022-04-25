const Product = require("../models/product");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};
const getAllProducts = async (req, res) => {
  const product = await Product.find({});

  res.status(StatusCodes.OK).json({ product, count: product.length });
};
const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new CustomError.NotFoundError(
      "product cannot found with specified id"
    );
  }

  res.status(StatusCodes.OK).json({ product });
};
const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    throw new CustomError.NotFoundError(
      "product cannot found with specified id"
    );
  }

  res.status(StatusCodes.OK).json({ product });
};
const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new CustomError.NotFoundError(
      "product cannot found with specified id"
    );
  }
  await product.remove();
  res.status(StatusCodes.OK).json({ msg: "product removed successfully" });
};
const uploadImage = async (req, res) => {
  res.send("uploadImage");
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
