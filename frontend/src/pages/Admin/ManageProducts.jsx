import { useState, useEffect } from 'react';
import api from '../../services/api';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    brand: '',
    scentType: 'floral',
    imageUrl: '',
    stock: '',
    discount: 0,
    onSale: false,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products');
      setProducts(data.products);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingProduct) {
        await api.put(`/products/${editingProduct._id}`, formData);
        alert('Product updated successfully!');
      } else {
        await api.post('/products', formData);
        alert('Product created successfully!');
      }
      resetForm();
      fetchProducts();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to save product');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      brand: product.brand,
      scentType: product.scentType,
      imageUrl: product.imageUrl,
      stock: product.stock,
      discount: product.discount || 0,
      onSale: product.onSale || false,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await api.delete(`/products/${id}`);
      alert('Product deleted successfully!');
      fetchProducts();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete product');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      brand: '',
      scentType: 'floral',
      imageUrl: '',
      stock: '',
      discount: 0,
      onSale: false,
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setUploadingImage(true);

    try {
      const formDataUpload = new FormData();
      formDataUpload.append('image', file);

      const { data } = await api.post('/products/upload', formDataUpload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setFormData({ ...formData, imageUrl: data.imageUrl });
      alert('Image uploaded successfully!');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-orange-50 to-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600 mb-4"></div>
          <p className="text-xl text-gray-600 font-semibold">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-500 to-accent-600 text-white py-12 shadow-xl">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">📦 Manage Products</h1>
              <p className="text-orange-100">Add, edit, or remove products from your catalog</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-white text-primary-600 px-8 py-3 rounded-full hover:bg-orange-50 font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              {showForm ? '✕ Cancel' : '+ Add Product'}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {showForm && (
          <div className="bg-white p-8 rounded-3xl shadow-2xl mb-8 border-2 border-primary-100 animate-scale-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="mr-2">{editingProduct ? '✏️' : '➕'}</span>
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Chanel No. 5"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="e.g., Chanel"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    step="0.01"
                    placeholder="99.99"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="50"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    placeholder="0"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter 0 for no discount, or up to 100%</p>
                </div>

                <div className="flex items-center">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="onSale"
                      checked={formData.onSale}
                      onChange={(e) => setFormData({ ...formData, onSale: e.target.checked })}
                      className="w-5 h-5 text-primary-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-primary-500"
                    />
                    <span className="ml-3 text-gray-700 font-bold">
                      🏷️ Mark as On Sale
                    </span>
                  </label>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Scent Type
                  </label>
                  <select
                    name="scentType"
                    value={formData.scentType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
                    required
                  >
                    <option value="floral">🌸 Floral</option>
                    <option value="woody">🌲 Woody</option>
                    <option value="citrus">🍊 Citrus</option>
                    <option value="oriental">🌙 Oriental</option>
                    <option value="fresh">💨 Fresh</option>
                    <option value="spicy">🌶️ Spicy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Product Image
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploadingImage}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 disabled:opacity-50"
                      />
                      {uploadingImage && (
                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary-600 border-t-transparent"></div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">Upload PNG, JPG, GIF or WEBP (max 5MB)</p>
                    {formData.imageUrl && (
                      <div className="mt-2">
                        <img
                          src={formData.imageUrl}
                          alt="Preview"
                          className="w-32 h-32 object-cover rounded-xl border-2 border-gray-200"
                        />
                      </div>
                    )}
                    <div className="text-xs text-gray-500">
                      <span className="font-semibold">Or enter URL:</span>
                    </div>
                    <input
                      type="url"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Describe the perfume..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-8 py-3 rounded-xl hover:from-primary-700 hover:to-accent-700 font-bold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  {editingProduct ? '✓ Update Product' : '✓ Create Product'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-200 text-gray-800 px-8 py-3 rounded-xl hover:bg-gray-300 font-semibold transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-primary-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-primary-100 to-accent-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">
                    Product Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">
                    Brand
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">
                    Scent
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-orange-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-800">{product.name}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{product.brand}</td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-primary-600">${product.price}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        product.stock > 10
                          ? 'bg-green-100 text-green-800'
                          : product.stock > 0
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="capitalize text-gray-600">{product.scentType}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 font-semibold text-sm transition-colors"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="bg-red-100 text-red-700 px-4 py-2 rounded-lg hover:bg-red-200 font-semibold text-sm transition-colors"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProducts;
