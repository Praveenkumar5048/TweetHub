'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import axios from 'axios';
import Loader from "../../../components/Loader/loader.js";

const Login = () => {

    const router = useRouter(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
      e.preventDefault();
      
      try {
        setLoading(true);
        const response = await axios.post('http://localhost:8080/login', { email, password} );
        
        if (response.status === 201) {
            const { token, user } = response.data;
            localStorage.setItem('tweettoken', token);
            localStorage.setItem('tweetuserId', user.userId);
            router.push("/home");
        } else {
          setLoading(false);
          const errorData = await response.json();
          setErrorMessage(errorData.message || 'Login failed');
          console.error('Login failed');
        }
      } catch (error) {
        console.error('Error During login User:', error);
        setErrorMessage('Invalid Email or Password');
      }
    };
    
    if (loading) {
      return <Loader />;
    }

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
            <p className="text-red-500 mt-2">{errorMessage}</p>
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
  