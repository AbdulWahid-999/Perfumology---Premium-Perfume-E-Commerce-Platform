const Product = require('../models/Product');

const getProducts = async (req, res) => {
  try {
    const { search, brand, scentType, minPrice, maxPrice, minRating, inStock, sortBy, page = 1, limit = 12 } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (brand) {
      query.brand = brand;
    }

    if (scentType) {
      query.scentType = scentType;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (minRating) {
      query.averageRating = { $gte: Number(minRating) };
    }

    if (inStock === 'true') {
      query.stock = { $gt: 0 };
    }

    let sortOptions = {};
    if (sortBy === 'price-low') {
      sortOptions = { price: 1 };
    } else if (sortBy === 'price-high') {
      sortOptions = { price: -1 };
    } else if (sortBy === 'rating') {
      sortOptions = { averageRating: -1 };
    } else if (sortBy === 'popularity') {
      sortOptions = { popularity: -1 };
    } else if (sortBy === 'name') {
      sortOptions = { name: 1 };
    } else {
      sortOptions = { createdAt: -1 };
    }

    const products = await Product.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort(sortOptions);

    const count = await Product.countDocuments(query);

    res.json({
      products,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, brand, scentType, imageUrl, stock, discount, onSale } = req.body;

    if (!name || !description || !price || !brand || !scentType) {
      return res.status(400).json({ message: 'Please add all required fields' });
    }

    const product = await Product.create({
      name,
      description,
      price,
      brand,
      scentType,
      imageUrl,
      stock: stock || 0,
      discount: discount || 0,
      onSale: onSale || false,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = req.body.name || product.name;
      product.description = req.body.description || product.description;
      product.price = req.body.price || product.price;
      product.brand = req.body.brand || product.brand;
      product.scentType = req.body.scentType || product.scentType;
      product.imageUrl = req.body.imageUrl || product.imageUrl;
      product.stock = req.body.stock !== undefined ? req.body.stock : product.stock;
      product.discount = req.body.discount !== undefined ? req.body.discount : product.discount;
      product.onSale = req.body.onSale !== undefined ? req.body.onSale : product.onSale;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search suggestions
const getSearchSuggestions = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query || query.length < 2) {
      return res.json([]);
    }

    const suggestions = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { brand: { $regex: query, $options: 'i' } },
      ],
    })
      .select('name brand imageUrl price')
      .limit(5);

    res.json(suggestions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get related products
const getRelatedProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const relatedProducts = await Product.find({
      _id: { $ne: product._id },
      $or: [
        { scentType: product.scentType },
        { brand: product.brand },
      ],
    })
      .limit(4)
      .sort({ createdAt: -1 });

    res.json(relatedProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getSearchSuggestions,
  getRelatedProducts,
};
