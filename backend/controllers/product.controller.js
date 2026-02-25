import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

// ---------------------- CREATE PRODUCT ----------------------
export const createProduct = async (req, res) => {
  try {
    let imageData = {};
    if (req.file) {
      // multer + cloudinary uploaded file
      imageData = {
        public_id: req.file.filename,
        url: req.file.path,
      };
    }

    const { name, description, price, stock, category } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      image: imageData,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// ---------------------- GET ALL PRODUCTS ----------------------
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// ---------------------- GET SINGLE PRODUCT ----------------------
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// ---------------------- UPDATE PRODUCT ----------------------
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const { name, description, price, stock, category, isActive } = req.body;

    // Update fields
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (category) product.category = category;
    if (isActive !== undefined) product.isActive = isActive;

    // Update image if new file uploaded
    if (req.file) {
      // Delete old image from Cloudinary if exists
      if (product.image.public_id) {
        await cloudinary.uploader.destroy(product.image.public_id);
      }

      product.image = {
        public_id: req.file.filename,
        url: req.file.path,
      };
    }

    await product.save();
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// ---------------------- DELETE PRODUCT ----------------------
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });

   
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------------- SEARCH PRODUCTS ----------------------
export const searchProducts = async (req, res) => {
  try {
    const { q } = req.query; // search query

    if (!q) return res.status(400).json({ message: "Query is required" });

    // Search by name or category (case-insensitive)
    const products = await Product.find({
      isActive: true, // optional: only active products
      $or: [
        { name: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
      ],
    });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
