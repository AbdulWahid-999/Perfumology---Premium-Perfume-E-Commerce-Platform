const express = require('express');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getSearchSuggestions,
  getRelatedProducts,
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const upload = require('../config/multer');

const router = express.Router();

router.get('/', getProducts);
router.get('/search/suggestions', getSearchSuggestions);
router.get('/:id', getProductById);
router.get('/:id/related', getRelatedProducts);
router.post('/', protect, admin, createProduct);
router.post('/upload', protect, admin, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/products/${req.file.filename}`;
    res.status(200).json({ imageUrl });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload image', error: error.message });
  }
});
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;
