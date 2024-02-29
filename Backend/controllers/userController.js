import { db } from "../database.js";

export const getUserBasicDetails = async (req, res) => {
  const userId = req.params.userId; 
  try {
    
    const getUserQuery = `SELECT displayname, profile_path FROM Users WHERE user_id = ?`;
    const userData = await db.query(getUserQuery, [userId]);

    if (userData[0].length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const userDetails = {
      displayName: userData[0][0].displayname,
      profilePath: userData[0][0].profile_path
    };

    return res.status(200).json(userDetails);

  } catch {

  }
}

export const getUserDetails = async (req, res) => {
  try {
    const userId = req.params.userId; 
    const getUserQuery = `
      SELECT * 
      FROM Users 
      WHERE user_id = ?`;
    const userData = await db.query(getUserQuery, [userId]);

    if (userData.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = userData[0][0];

    // Get detailed follower information
    const getFollowersQuery = `
      SELECT u.*
      FROM Follows AS f
      JOIN Users AS u ON f.follower_id = u.user_id
      WHERE f.following_id = ?`;
    const followerData = await db.query(getFollowersQuery, [userId]);

    // Use map with a null check to avoid undefined values
    const followers = followerData.map((follower) => (follower ? follower : null));

    // Get detailed following information
    const getFollowingQuery = `
      SELECT u.*
      FROM Follows AS f
      JOIN Users AS u ON f.following_id = u.user_id
      WHERE f.follower_id = ?`;
    const followingData = await db.query(getFollowingQuery, [userId]);

    // Use map with a null check to avoid undefined values
    const following = followingData.map((followingUser) => (followingUser ? followingUser : null));

    // Get detailed post information
    const getPostDetailsQuery = `
      SELECT p.*, u.username AS posted_by_username
      FROM Posts AS p
      JOIN Users AS u ON p.user_id = u.user_id
      WHERE p.user_id = ?`;
    const postDetailsData = await db.query(getPostDetailsQuery, [userId]);

    // Use map with a null check to avoid undefined values
    const posts = postDetailsData.map((post) => (post ? post : null));

    // Combine all data and send response
    const response = {
      user,
      followers,
      following,
      posts,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error getting user details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUserDetails = async (req, res) => {
  try {
    const { userId, fullName, username, bio } = req.body;
    
    const updateQuery = `
      UPDATE Users
      SET displayname = ?, username = ?, bio = ?
      WHERE user_id = ?`;

    const result = await db.query(updateQuery, [fullName, username, bio, userId]);

    if (result[0].affectedRows === 1) {
      res.status(200).json({ message: 'Profile updated successfully!' });
    } else {
      res.status(500).json({ error: 'Failed to update profile' });
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

