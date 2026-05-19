import { FiTrash2 } from 'react-icons/fi';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    onUpdateQuantity(item._id, newQuantity);
  };

  return (
    <div className="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-primary-200">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Product Image */}
        <div className="relative">
          <img
            src={item.productId?.imageUrl}
            alt={item.productId?.name}
            className="w-32 h-32 object-cover rounded-xl shadow-md"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors">
            {item.productId?.name}
          </h3>
          <p className="text-sm text-gray-600 font-medium mb-2">{item.productId?.brand}</p>
          <div className="flex items-center justify-center md:justify-start space-x-2">
            <span className="text-lg font-semibold text-gray-500">Price:</span>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              ${item.price}
            </span>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex flex-col items-center space-y-3">
          <span className="text-sm font-semibold text-gray-600">Quantity</span>
          <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-2">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              className="bg-white hover:bg-orange-100 w-10 h-10 rounded-lg font-bold text-xl transition-all duration-300 shadow-sm hover:shadow-md"
            >
              -
            </button>
            <span className="w-12 text-center font-bold text-xl text-gray-800">{item.quantity}</span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              className="bg-white hover:bg-orange-100 w-10 h-10 rounded-lg font-bold text-xl transition-all duration-300 shadow-sm hover:shadow-md"
            >
              +
            </button>
          </div>
        </div>

        {/* Total & Remove */}
        <div className="text-center md:text-right space-y-3">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total</p>
            <p className="text-2xl font-bold text-gray-800">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
          <button
            onClick={() => onRemove(item._id)}
            className="bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 border border-red-200 hover:border-red-300 flex items-center gap-2 mx-auto md:mx-0"
          >
            <FiTrash2 className="w-4 h-4" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
