import React from "react";

function Trending() {

  const trendingHashtags = ["#TailwindCSS", "#ReactJS", "#WebDevelopment", "#Coding"];

  return (
    <div className="mt-5 p-4 rounded-md shadow-md text-white">
      <h2 className="text-lg font-semibold mb-4 text-gray-500">Trending</h2>
      <div className="grid grid-cols-1 gap-4">
        {trendingHashtags.map((hashtag, index) => (
          <div key={index} className="flex items-center justify-betweenpx-4 py-2 rounded-md">
            <p className="text-sm font-medium hover:text-blue-700">{hashtag}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trending;
