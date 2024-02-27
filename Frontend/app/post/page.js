"use client";
import React, { useState } from 'react';
import Sidenav from "../../components/navigation/Sidenav";

const CreatePost = () => {

  const [content, setContent] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [hashtags, setHashtags] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(content,mediaFile,hashtags,location);
  };

  return (
    <div className="bg-black h-screen">
    <div className="flex">
      <div className="relative flex-shrink-0 w-1/5 px-4 py-8">
        <Sidenav />
      </div>
      <div className="flex-grow">
        <div className="container mt-10  mx-auto px-4 py-8 w-3/5 bg-white rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Create a Post</h1>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4 px-4 pb-8">
            <textarea
              className="rounded-md p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500 h-40"
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="flex items-center space-x-2">
              <label htmlFor="media" className="text-gray-600">Media (Optional):</label>
              <input
                id="media"
                type="file"
                className="hidden"
                onChange={(e) => setMediaFile(e.target.files[0])}
              />
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                onClick={() => document.getElementById('media').click()}
              >
                Upload
              </button>
              {mediaFile && <p className="text-blue-500">{mediaFile.name}</p>}
            </div>
            <input
              className="rounded-md p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter hashtags (separated by commas)"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              type="text"
            />
            <input
              className="rounded-md p-2 border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Your location (Optional)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default CreatePost;
