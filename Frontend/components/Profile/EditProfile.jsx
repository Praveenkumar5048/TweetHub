import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, userData }) => {

  const [formData, setFormData] = useState({
    userId :userData?.user?.user_id || "",
    fullName: userData?.user?.displayname || "", 
    username: userData?.user?.username || "",
    bio: userData?.user?.username || "", 
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/updateProfile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Profile updated successfully!");
        onClose(); // Close the modal after successful update
        window.location.reload();
      } else {
        console.error("Error updating profile:", await response.text());
        // Handle error gracefully (display error message to user)
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      // Handle error gracefully (display error message to user)
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
          <h2 className="text-xl text-black font-bold">Edit Profile</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-black text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              className="w-full px-4 py-2 rounded-md border text-black border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Sagar Athani"
              value={formData.fullName} // Pre-fill with form data
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-black text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="sagarathani0418"
              value={formData.username} // Pre-fill with form data
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bio" className="block text-black text-sm font-medium mb-2">
              Bio
            </label>
            <textarea
              id="bio"
              rows="4"
              className="w-full px-4 py-2 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Bio"
              value={formData.bio} 
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-white font-medium" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-medium">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
