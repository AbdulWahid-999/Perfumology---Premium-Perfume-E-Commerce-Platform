import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithGoogle } = useAuth();
  const [dots, setDots] = useState('');

  useEffect(() => {
    // Animated dots for loading
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    // Timeout after 5 seconds
    const timeoutId = setTimeout(() => {
      navigate('/auth-error?message=' + encodeURIComponent('Authentication is taking too long. Please try again.'));
    }, 5000);

    const token = searchParams.get('token');
    const userStr = searchParams.get('user');

    if (token && userStr) {
      try {
        const userData = JSON.parse(decodeURIComponent(userStr));
        loginWithGoogle(token, userData);
        clearTimeout(timeoutId);
        clearInterval(dotsInterval);

        // Wait 3 seconds then redirect and refresh
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
      } catch (error) {
        console.error('Failed to process auth:', error);
        clearTimeout(timeoutId);
        clearInterval(dotsInterval);
        navigate('/auth-error?message=' + encodeURIComponent('Failed to process authentication. Please try again.'));
      }
    } else {
      clearTimeout(timeoutId);
      clearInterval(dotsInterval);
      navigate('/auth-error?message=' + encodeURIComponent('Invalid authentication response. Please try again.'));
    }

    return () => {
      clearTimeout(timeoutId);
      clearInterval(dotsInterval);
    };
  }, [searchParams, navigate, loginWithGoogle]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600 mb-4"></div>
        <p className="text-xl text-gray-600 font-semibold">Logging you in{dots}</p>
        <p className="text-sm text-gray-500 mt-2">This should only take a moment</p>
      </div>
    </div>
  );
};

export default AuthSuccess;
