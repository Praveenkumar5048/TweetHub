import { Avatar } from "@mui/material";
import React from "react";
import {useState, useEffect} from "react";
import axios from 'axios';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from '@mui/icons-material/Bookmark';

function Post({ user, postImage, content , timestamp, postId}) {
  
  const [ liked, setLiked ] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [ bookmark, setBookmark ] = useState(false);

  const storedUserId = localStorage.getItem("userId");

  useEffect (() => {
    
    const checkUserLike = async () => {
      try {
        const response = await axios.post('http://localhost:8080/checkUserLike', {storedUserId, postId });
        const likesData = response.data.result[0];
        if(likesData.user_liked){
          setLiked(true);
        }
        setLikesCount(likesData.like_count);
      } catch(error) {
          console.error('Error checking like:', error);
      }
    }
    checkUserLike();
  }, [liked]);

  useEffect (() => {
    
    const checkUserBookmark = async () => {
      try {
        
        const response = await axios.post('http://localhost:8080/checkUserBookmark', {storedUserId, postId });
        const bookmarksData = response.data.result;
        if(bookmarksData.length !== 0){
          setBookmark(true);
        }
        
      } catch(error) {
          console.error('Error checking bookmark:', error);
      }
    }
    checkUserBookmark();
  }, []);
  
  const handleLike = async () => {
      try {
        if (liked) {
          const response = await axios.post('http://localhost:8080/deleteLike', {storedUserId, postId });
          if(response.status === 201){
            setLiked(!liked);
          }
        } else {
          const response = await axios.post('http://localhost:8080/insertLike', { storedUserId, postId });
          if(response.status === 201){
            setLiked(!liked);
          }
        }
        
      } catch (error) {
        console.error('Error toggling like:', error);
      }
  };

  const handleBookmark = async () => {
      try {
        if (bookmark) {
          const response = await axios.post('http://localhost:8080/deleteBookmark', {storedUserId, postId });
          if(response.status === 201){
            setBookmark(!bookmark);
          }
        } else {
          const response = await axios.post('http://localhost:8080/addBookmark', { storedUserId, postId });
          if(response.status === 201){
            setBookmark(!bookmark);
          }
        }
        
      } catch (error) {
        console.error('Error toggling bookmark:', error);
      }
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-4 mb-2"> 
      <div className="flex justify-between items-center mb-4">
      <div className="flex justify-between items-center font-bold">
        <div className="flex items-center text-white bg-transparent rounded-lg px-4 py-2 ">
          <Avatar src={`http://localhost:8080/${user.profile_path}`} alt='skpsmpsap' className="mr-2 w-8 h-8" />
          <a href={`/profile/${user.user_id}`}><span className="text-xl text-white hover:text-blue-500">{user.displayname}</span></a>
        </div>
        <span className="text-gray-500">
          {new Date(timestamp).toLocaleDateString()}
        </span>
      </div>
      </div>
      <div class="p-6 rounded-lg shadow-md">
        <a href={`/post/${postId}`}>
          <p class="text-white text-base leading-6 text-center">{content}</p>
        </a>
    </div>
    <div>
    <a href={`/post/${postId}`}>
      {postImage && postImage.endsWith('.mp4') ? (
        <video className="w-full rounded-md" controls>
          <source src={`http://localhost:8080/${postImage}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        postImage && (
          <img
            className="w-full rounded-md border border-gray-500"
            src={`http://localhost:8080/${postImage}`}
            alt="Post Image"
          />
        )
      )}
      </a>
    </div>

      <div className="mt-4">
        <div className="flex justify-between items-center">
          <div className="flex">
          {liked ? (
              <FavoriteIcon
                className={`postIcon p-1 text-red-500 cursor-pointer text-4xl`} 
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderIcon
                className={`postIcon p-1 text-white cursor-pointer text-4xl`} 
                onClick={handleLike}
              />
            )}
            <ChatBubbleOutlineIcon className="ml-4 postIcon text-white p-1 text-4xl" />
          </div>
          <div>
          { bookmark ? (
            <BookmarkIcon
            className="postIcon text-white p-1 text-4xl"
            style={{ color: 'rgb(15, 288, 252)' }}
            onClick={handleBookmark}
          />
          ) : (
            <BookmarkBorderIcon className="postIcon text-white p-1 text-4xl"
            onClick={handleBookmark} />
          )} 
          </div>
        </div>
        <p className="mt-2">Liked by {likesCount} people.</p>
      </div>
    </div>
  );
}

export default Post;
