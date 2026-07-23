import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login({ email, password });
      
      if (result.success) {
        if (isAdminLogin && result.user.role !== 'admin') {
          setError('You are not authorized as admin');
          setLoading(false);
          return;
        }

        if (isAdminLogin) {
          window.location.href = '/admin/dashboard';
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 md:p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            <span className="text-blue-600">LUXURY</span>
            <span className="text-gray-800"> MOTORS</span>
          </h1>
          <h2 className="text-2xl font-semibold mt-6 text-gray-800">
            {isAdminLogin ? 'Admin Sign In' : 'Sign In'}
          </h2>
        </div>

        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
          <button
            onClick={() => setIsAdminLogin(false)}
            className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
              !isAdminLogin 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            👤 Customer
          </button>
          <button
            onClick={() => setIsAdminLogin(true)}
            className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
              isAdminLogin 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            🔒 Admin
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 text-center">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              {isAdminLogin ? 'Admin Email' : 'Email Address'}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50"
              placeholder={isAdminLogin ? 'admin@luxurymotors.com' : 'Enter your email'}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-gray-50"
              placeholder={isAdminLogin ? 'Enter admin password' : 'Enter your password'}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <span className="ml-2 text-sm text-gray-600">Remember Me</span>
            </label>
            <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : (isAdminLogin ? 'LOGIN AS ADMIN' : 'LOGIN')}
          </button>
        </form>

        {isAdminLogin && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700 text-center">
              🔑 Default admin: admin@luxurymotors.com / admin123
            </p>
            <p className="text-xs text-blue-500 text-center mt-1">
              Only registered admin users can login
            </p>
          </div>
        )}

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or, continue with</span>
            </div>
          </div>

          <button className="w-full mt-4 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 shadow-sm hover:shadow-md">
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
            </svg>
            <span>Google</span>
          </button>
        </div>

        <p className="text-center mt-6 text-sm text-gray-600">
          {isAdminLogin ? (
            <>
              Switch to{' '}
              <button 
                onClick={() => setIsAdminLogin(false)}
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Customer Login
              </button>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-800 font-semibold">
                Register
              </Link>
            </>
          )}
        </p>

        {!isAdminLogin && (
          <p className="text-center mt-2 text-xs text-gray-400">
            Admin?{' '}
            <button 
              onClick={() => setIsAdminLogin(true)}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Login as Admin
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;