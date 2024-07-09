"use client";
import React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../../Loader/loader.js';

function Trending() {

  const [hashtags, setHashtags ] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    
    const fetchHashtagData = async () => {
      setLoader(true);
      try {
        const response = await axios.get('http://localhost:8080/trending/hashtags');
        if(response.status === 201){
          setHashtags(response.data.hashtagData);
          setLoader(false);
        }
      } catch (error) {
          console.error('Error fetching Hashtags :', error);
      }
   
    };

    fetchHashtagData();
   
  }, []);

  return (
    
    <div className="mt-5 p-4 rounded-md shadow-md text-white">
    {loader ? (
      <Loader />
    ) : (
      <>
        <h2 className="text-lg font-semibold mb-4 text-black">Trending hashtags</h2>
        <div className="grid grid-cols-1 gap-4">
          {hashtags.map((hashtag, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 mb-2"
            >
              <div className="flex items-center">
                <span className="text-gray-600 text-sm mr-2">{index + 1}.</span>
                <a href={`/hashtag/${hashtag.hashTag_name}`}>
                  <p className="text-sm font-medium text-blue-700 hover:underline">
                    {hashtag.hashTag_name}
                  </p>
                </a>
              </div>
              <div>
                <span className="text-gray-600 text-sm">{hashtag.hashtag_count} posts</span>
              </div>
            </div>
          ))}
        </div>
      </>
    )}
  </div>
  
    
  );
}

export default Trending;
