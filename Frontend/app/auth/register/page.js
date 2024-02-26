"use client";
import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation'

const Signup = () => {
  
    const router = useRouter(); 
    const [displayname, setDisplayName] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState('');
    const [bio, setBio] = useState('');
    
    const handleSignup = async (e) => {
      e.preventDefault();
      
      try {
    
        const response = await axios.post('http://localhost:8080/signUp', 
        {displayname, username, email, dob, bio, password} );
    
        if (response.status === 201) {
          console.log('User registerd successfully!');
          router.push('/home');
        } else {
          console.error('Failed to Failed to register User:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error Registering User:', error);
      }

    };
    
    
    
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-r from-pink-500 to-purple-500">
        <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Create Your Account</h1>
          <form className="space-y-4" onSubmit={handleSignup}>
            <div>
              <label className="block text-sm font-medium text-gray-600">Display Name:</label>
              <input
                type="text"
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your display name"
                value={displayname}
                onChange={(e) => setDisplayName(e.target.value)}
              ></input>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Username:</label>
              <input
                type="text"
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              ></input>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Email:</label>
              <input
                type="email"
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Date of Birth:</label>
              <input
                type="date"
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              ></input>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Bio:</label>
              <textarea
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Tell us about yourself"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Password:</label>
              <input
                type="password"
                className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 focus:outline-none focus:ring focus:border-blue-300"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-gray-700">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-purple-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    );
  };
  
  export default Signup;
  