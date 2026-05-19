import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiShoppingCart, FiPackage, FiShield, FiLogOut, FiHeart, FiUser, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="bg-gradient-to-r from-primary-600 via-primary-500 to-accent-600 text-white shadow-2xl sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="group" onClick={closeMobileMenu}>
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 inline-block">
              Perfumology
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/products"
              className="hover:text-orange-200 transition-colors duration-300 font-medium relative group"
            >
              Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-200 group-hover:w-full transition-all duration-300"></span>
            </Link>

            <Link
              to="/contact"
              className="hover:text-orange-200 transition-colors duration-300 font-medium relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-200 group-hover:w-full transition-all duration-300"></span>
            </Link>

            {user ? (
              <>
                <Link
                  to="/wishlist"
                  className="hover:text-orange-200 transition-colors duration-300 font-medium relative group flex items-center gap-2"
                >
                  <FiHeart className="w-5 h-5" />
                  Wishlist
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-200 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link
                  to="/cart"
                  className="hover:text-orange-200 transition-colors duration-300 font-medium relative group flex items-center gap-2"
                >
                  <FiShoppingCart className="w-5 h-5" />
                  Cart
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-200 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link
                  to="/orders"
                  className="hover:text-orange-200 transition-colors duration-300 font-medium relative group flex items-center gap-2"
                >
                  <FiPackage className="w-5 h-5" />
                  Orders
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-200 group-hover:w-full transition-all duration-300"></span>
                </Link>
                {user.role === 'admin' && (
                  <Link
                    to="/admin/dashboard"
                    className="bg-gradient-to-r from-accent-500 to-primary-500 hover:from-accent-600 hover:to-primary-600 px-4 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
                  >
                    <FiShield className="w-5 h-5" />
                    Admin
                  </Link>
                )}
                <div className="flex items-center space-x-4">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 text-orange-200 hover:text-white font-medium transition-colors"
                  >
                    <FiUser className="w-5 h-5" />
                    {user.name}
                  </Link>
                  <button
                    onClick={logout}
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full font-semibold transition-all duration-300 border border-white/20 hover:border-white/40 flex items-center gap-2"
                  >
                    <FiLogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-orange-200 transition-colors duration-300 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-primary-900 hover:bg-orange-50 px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white hover:text-orange-200 transition-colors"
          >
            {mobileMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gradient-to-b from-primary-700 to-accent-700 pb-4 space-y-2 animate-slide-down">
            <Link
              to="/products"
              onClick={closeMobileMenu}
              className="block px-4 py-3 hover:bg-white/10 rounded-lg transition-colors font-medium"
            >
              Products
            </Link>

            <Link
              to="/contact"
              onClick={closeMobileMenu}
              className="block px-4 py-3 hover:bg-white/10 rounded-lg transition-colors font-medium"
            >
              Contact
            </Link>

            {user ? (
              <>
                <Link
                  to="/wishlist"
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 hover:bg-white/10 rounded-lg transition-colors font-medium flex items-center gap-2"
                >
                  <FiHeart className="w-5 h-5" />
                  Wishlist
                </Link>

                <Link
                  to="/cart"
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 hover:bg-white/10 rounded-lg transition-colors font-medium flex items-center gap-2"
                >
                  <FiShoppingCart className="w-5 h-5" />
                  Cart
                </Link>

                <Link
                  to="/orders"
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 hover:bg-white/10 rounded-lg transition-colors font-medium flex items-center gap-2"
                >
                  <FiPackage className="w-5 h-5" />
                  Orders
                </Link>

                {user.role === 'admin' && (
                  <Link
                    to="/admin/dashboard"
                    onClick={closeMobileMenu}
                    className="block px-4 py-3 hover:bg-white/10 rounded-lg transition-colors font-medium flex items-center gap-2 bg-white/10"
                  >
                    <FiShield className="w-5 h-5" />
                    Admin Dashboard
                  </Link>
                )}

                <Link
                  to="/profile"
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 hover:bg-white/10 rounded-lg transition-colors font-medium flex items-center gap-2"
                >
                  <FiUser className="w-5 h-5" />
                  {user.name}
                </Link>

                <button
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-white/10 rounded-lg transition-colors font-medium flex items-center gap-2"
                >
                  <FiLogOut className="w-5 h-5" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 hover:bg-white/10 rounded-lg transition-colors font-medium"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={closeMobileMenu}
                  className="block px-4 py-3 bg-white text-primary-900 hover:bg-orange-50 rounded-lg transition-colors font-medium mx-4"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
