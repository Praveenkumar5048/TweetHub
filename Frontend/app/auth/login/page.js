"use client";
import { useState } from 'react';
import Link from 'next/link';

// Import necessary modules and dependencies

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = (e) => {
      e.preventDefault();
      // Implement your login logic here using 'email' and 'password'
      console.log('Logging in with:', email, password);
    };
  
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Social Media App</h1>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-600">Email:</label>
              <input
                type="email"
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Password:</label>
              <input
                type="password"
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 focus:outline-none focus:ring focus:border-blue-300"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-gray-700">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-purple-500 hover:underline">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    );
  };
  
  export default Login;
  