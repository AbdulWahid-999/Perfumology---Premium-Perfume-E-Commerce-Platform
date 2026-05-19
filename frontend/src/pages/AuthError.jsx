import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { FiAlertCircle, FiArrowLeft } from 'react-icons/fi';

const AuthError = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const message = searchParams.get('message');
    if (message) {
      setErrorMessage(decodeURIComponent(message));
    } else {
      setErrorMessage('Authentication failed. Please try again.');
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-red-100 flex items-center justify-center py-12 px-4 animate-fade-in">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 animate-scale-in">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4 animate-pulse-slow">
              <FiAlertCircle className="w-10 h-10 text-red-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Authentication Failed
            </h2>
            <p className="text-gray-600 text-lg">
              {errorMessage}
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white py-4 rounded-xl hover:from-primary-700 hover:to-accent-700 font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Try Again
            </button>

            <Link
              to="/"
              className="w-full block text-center text-gray-600 hover:text-gray-800 font-semibold py-3 transition-colors flex items-center justify-center gap-2"
            >
              <FiArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>

          <div className="mt-6 p-4 bg-orange-50 rounded-xl border-2 border-orange-200">
            <p className="text-sm text-gray-700">
              <span className="font-bold">Common issues:</span>
            </p>
            <ul className="text-sm text-gray-600 mt-2 space-y-1 list-disc list-inside">
              <li>Account already exists with this email</li>
              <li>Google authentication was cancelled</li>
              <li>Network connection issue</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthError;
