import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiMail, FiLock, FiArrowLeft } from 'react-icons/fi';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-500 to-accent-600 flex items-center justify-center py-12 px-4 animate-fade-in">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8 animate-slide-up">
          <h1 className="text-4xl font-bold text-white mb-2">Join Perfumology</h1>
          <p className="text-orange-200">Create your account and start shopping</p>
        </div>

        {/* Register Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 animate-scale-in">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Create Your Account
          </h2>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center animate-scale-in">
              <span className="text-xl mr-2">⚠️</span>
              <span className="font-semibold">{error}</span>
            </div>
          )}

          {/* Google Signup Button */}
          <button
            onClick={handleGoogleSignup}
            className="w-full bg-white border-2 border-gray-200 text-gray-800 py-4 rounded-xl hover:border-primary-500 hover:bg-orange-50 font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-md mb-6 flex items-center justify-center gap-3"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign up with Google
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500 font-semibold">OR</span>
            </div>
          </div>

          {/* Email/Password Form */}
          {!showEmailForm ? (
            <button
              onClick={() => setShowEmailForm(true)}
              className="w-full bg-gray-100 text-gray-800 py-3 rounded-xl hover:bg-gray-200 font-semibold text-base transition-all duration-300 mb-4"
            >
              Continue with Email
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center gap-2">
                <FiUser className="w-4 h-4 text-primary-600" />
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center gap-2">
                <FiMail className="w-4 h-4 text-primary-600" />
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center gap-2">
                <FiLock className="w-4 h-4 text-primary-600" />
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center gap-2">
                <FiLock className="w-4 h-4 text-primary-600" />
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
                required
              />
            </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white py-4 rounded-xl hover:from-primary-700 hover:to-accent-700 disabled:from-gray-400 disabled:to-gray-500 font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>

              <button
                type="button"
                onClick={() => setShowEmailForm(false)}
                className="w-full text-gray-600 hover:text-gray-800 font-semibold text-sm transition-colors"
              >
                Back to Google Signup
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-800 font-bold">
                Login
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-white hover:text-orange-200 font-semibold flex items-center justify-center gap-2">
            <FiArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
