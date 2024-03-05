import { Avatar } from "@mui/material";
import React from "react";
import {useState, useEffect} from "react";
import axios from 'axios';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteIcon from '@mui/icons-material/DeleteRounded';
import { deletePost } from "@/hooks/getPostsDetails";

function Post({ user, postImage, content , timestamp, postId,currentUserId,updateOfUserDetails}) {

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

  const handleDelete = async() => {
    alert("are you really deleteing this ?");
    try {
      const response = await deletePost(postId);
      console.log(response.success)
      if(response.success){
        console.log("post deleted successfully");
        updateOfUserDetails();
        console.log("updateOfUserDetails is Called");
      }else{
        console.log("deletion failed")
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }
  
  const highlightHashtags = (text) => {
    // Regular expression to match hashtags
    const hashtagRegex = /(^|\s)(#\w+)/g;
    return text.split(hashtagRegex).map((word, index) => {
      if (word.match(hashtagRegex)) {
        return <span key={index} style={{ color: 'blue' }}>{word}</span>;
      }
      return word;
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-4 mb-2 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center px-4 py-2">
        <div className="flex items-center">
          <Avatar src={`http://localhost:8080/${user.profile_path}`} alt='skpsmpsap' className="mr-2 w-8 h-8" />
          <a href={`/profile/${user.user_id}`} className="text-blue-500 hover:underline">{user.displayname}</a>
        </div>
        <span className="text-gray-500">{new Date(timestamp).toLocaleDateString()}</span>
      </div>
      <div className="p-4">

        <div className="text-base text-black leading-6">
          {highlightHashtags(content)}
        </div>

        {postImage && (
          <a href={`/post/${postId}`}>
            {postImage.endsWith('.mp4') ? (
              <video className="w-full rounded-md mt-4" controls>
                <source src={`http://localhost:8080/${postImage}`} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img className="w-full rounded-md mt-4" src={`http://localhost:8080/${postImage}`} alt="Post Image" />
            )}
          </a>
        )}
      </div>
      <div className="flex justify-between items-center px-4 py-2 border-t">
        <div className="flex items-center space-x-4">
          {liked ? (
            <FavoriteIcon className="text-red-500 cursor-pointer w-6 h-6" onClick={handleLike} />
          ) : (
            <FavoriteBorderIcon className="text-gray-500 cursor-pointer w-6 h-6" onClick={handleLike} />
          )}
          <ChatBubbleOutlineIcon className="text-gray-500 cursor-pointer w-6 h-6" />
        </div>
        <div>
          {bookmark ? (
              <BookmarkIcon className="text-blue-500 cursor-pointer w-6 h-6" onClick={handleBookmark} />
          ) : (
              <BookmarkBorderIcon className="text-gray-500 cursor-pointer w-6 h-6" onClick={handleBookmark} />
          )}
          {
            currentUserId && 
            <DeleteIcon className="text-red-500 cursor-pointer w-6 h-6" onClick={handleDelete} />
          }
        </div>
      </div>
      <p className="px-4 py-2 text-sm text-gray-500">Liked by {likesCount} people.</p>
  </div>

  );
}

export default Post;
