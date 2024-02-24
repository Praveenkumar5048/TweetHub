import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, onImageChange }) => {
  const [imageFile, setImageFile] = useState(null); // Store selected image file

  const handleImageChange = (event) => {
    const newImageFile = event.target.files[0];
    // Basic image validation (replace with a robust validation for size, type, etc.)
    if (newImageFile && newImageFile.type.startsWith('image/')) {
      setImageFile(newImageFile);
      if (onImageChange) {
        onImageChange(newImageFile); // Call parent callback if provided
      }
    } else {
      alert('Please select a valid image file.');
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 transition-all duration-300 ease-in-out ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="mx-auto p-4 mt-20 bg-white rounded-md shadow-md w-1/2">
        <div className="flex items-center mb-4">
          {imageFile ? (
            <img
              src={'/sagarp.png'} 
              alt="Profile Picture preview"
              className="w-16 h-16 rounded-full mr-4"
            />
          ) : (
            <img
              src="/sagarp.png" 
              alt="Profile Picture"
              className="w-16 h-16 rounded-full mr-4"
            />
          )}
          <h2 className="text-xl font-bold">Edit Profile</h2>
        </div>
        <form>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium mb-2">
              Profile Picture
            </label>
            <input
              type="file"
              id="image"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              onChange={handleImageChange}
            />
          </div>
		  <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
               id="fullName"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
               placeholder="Sagar Athani"
             />
           </div>
           <div className="mb-4">
             <label htmlFor="username" className="block text-sm font-medium mb-2">
               Username
             </label>
             <input
               type="text"
               id="username"
               className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
               placeholder="sagarathani0418"
             />
          </div>
           <div className="mb-4">             <label htmlFor="bio" className="block text-sm font-medium mb-2">
              Bio
             </label>
             <textarea
               id="bio"
               rows="4"
               className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
               placeholder="Bio"
             ></textarea>
          </div> 
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-white font-medium"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit" // Assuming image upload is handled here
              className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-medium"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
