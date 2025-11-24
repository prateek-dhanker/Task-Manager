import React, { useState } from 'react';
import axios from 'axios';
import { Link , useNavigate} from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { username, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard')
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Login failed';
      alert(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col text-white">
      <nav className="flex items-center justify-between p-6 bg-gray-800 shadow-md">
        <div className="text-2xl font-bold text-white">Task Manager</div>
        <div className=''>
            <ul className='flex space-x-3'>
            <Link to="/" className="hover:text-blue-400 transition">
                Home
            </Link>
            <Link to="/dashboard" className="hover:text-blue-400 transition">
                Dashboard
            </Link>
            </ul>

        </div>
        <div className="space-x-4">
        <button className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition">
            <Link to="/login" className="hover:text-blue-400 transition">
            Login
            </Link>
        </button>
        <button className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition">
            <Link to="/signup" className="hover:text-blue-400 transition">
            SignUp
            </Link>
        </button>
        </div>
      </nav>
      <div className="my-5 mx-auto w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Login to Your Account</h2>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username} 
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 px-4 rounded-lg">
            Log In
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-400 text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;