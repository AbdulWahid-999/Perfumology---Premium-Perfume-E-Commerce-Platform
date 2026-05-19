import { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import api from '../services/api';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart({ items: [] });
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/cart');
      setCart(data);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity) => {
    try {
      const { data } = await api.post('/cart', { productId, quantity });
      setCart(data);
    } catch (error) {
      throw error;
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      const { data } = await api.put(`/cart/${itemId}`, { quantity });
      setCart(data);
    } catch (error) {
      throw error;
    }
  };

  const removeItem = async (itemId) => {
    try {
      const { data } = await api.delete(`/cart/${itemId}`);
      setCart(data);
    } catch (error) {
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      await api.delete('/cart');
      setCart({ items: [] });
    } catch (error) {
      throw error;
    }
  };

  const getTotal = () => {
    return cart.items.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const value = {
    cart,
    loading,
    fetchCart,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    getTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
