"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import axios from 'axios';

const Login = () => {

    const router = useRouter(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async (e) => {
      e.preventDefault();
      
      try {
    
        const response = await axios.post('http://localhost:8080/login', { email, password} );
        //console.log(response.data.user);
        if (response.status === 201) {
          console.log('Logged in successfully!');
          localStorage.setItem('userId', JSON.stringify(response.data.user.user_id));
          router.push('/home');
        } else {
          console.error('Failed to Login User:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error During login User:', error);
      }
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
  