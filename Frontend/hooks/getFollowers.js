const BASE_URL = 'http://localhost:8080'; 

export const followUser = async (followerId, followingId) => {
    const response = await fetch(`${BASE_URL}/setFollowingUsers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ followerId, followingId }),
    });
  
    if (response.status >= 200 && response.status < 300) {
      return true;
    } else {
      throw new Error(`Failed to follow user: ${response.status}`);
    }
  };
  

export const unfollowUser = async (followerId, followingId) => {
  const response = await fetch(`${BASE_URL}/unsetFollowingUsers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ followerId, followingId }),
  });

  if (!response.ok) {
    throw new Error('Failed to unfollow user');
  }
};

export const checkIfFollowing = async (followerId, followingId) => {
  const response = await fetch(`${BASE_URL}/checkFollowingStatus`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ followerId, followingId }),
  });

  if (!response.ok) {
    throw new Error('Failed to check follow status');
  }

  const result = await response.json();
  console.log(result);
  return result.isFollowing;
};

export const getFollowers = async (userId) => {
  const response = await fetch(`${BASE_URL}/getFollowers/${userId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch followers');
  }

  const followers = await response.json();
  return followers;
};

export const getFollowing = async (userId) => {
  const response = await fetch(`${BASE_URL}/getFollowing/${userId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch following');
  }

  const following = await response.json();
  return following;
};
