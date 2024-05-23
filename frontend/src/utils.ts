import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase-config';



const basicFetchOptions = {
  method: 'GET',
  credentials: 'include',
};

export const deleteOptions = {
  method: 'DELETE',
  credentials: 'include',
};

export const getPostOptions = (body) => ({
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

export const getPatchOptions = (body) => ({
  method: 'PATCH',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

export const fetchHandler = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const { ok, status, headers } = response;
    if (!ok) throw new Error(`Fetch failed with status - ${status}`, { cause: status });

    const isJson = (headers.get('content-type') || '').includes('application/json');
    const responseData = await (isJson ? response.json() : response.text());

    return [responseData, null];
  } catch (error) {
    console.warn(error);
    return [null, error];
  }
};



export const uploadFileAndGetURL = async(file) => {
  const storage = getStorage(app);
  const storageRef = ref(storage, `uploads/${file.name}`);

  try {
      // Upload the file
      const snapshot = await uploadBytes(storageRef, file);
      // Get the URL of the uploaded file
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log('File available at', downloadURL);
      return downloadURL;
  } catch (error) {
      console.error('Error uploading file:', error);
      throw error; // Rethrow the error for further handling if necessary
  }
}


export const fetchPostComments = async(id) => {
  const [comments, error] = await fetchHandler(`/api/comments/posts?postId=${id}`, basicFetchOptions);
  if (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
  return comments;
}

export const fetchPostLikes = async(id) => {

  const likeData = []
  const [likes, error] = await fetchHandler(`/api/likes/posts/${id}`, basicFetchOptions);
  if (error) {
    console.error('Error fetching likes:', error);
    return [];
  }

  for (const like of likes) {
    const [user, error] = await fetchHandler(`/api/profiles/${like.profileId}`, basicFetchOptions);
    if (error) {
      console.error('Error fetching user:', error);
      return [];
    }
    likeData.push({ id: like.id, username: user.username, profilePhoto: user.img });
  }

  return likeData;
}




export const fetchCommentLikes = async(id) => {
  const likeData = []
  const [likes, error] = await fetchHandler(`/api/likes/comments/${id}`, basicFetchOptions);
  if (error) {
    console.error('Error fetching likes:', error);
    return [];
  }

  for (const like of likes) {
    const [user, error] = await fetchHandler(`/api/profiles/${like.profileId}`, basicFetchOptions);
    if (error) {
      console.error('Error fetching user:', error);
      return [];
    }
    likeData.push({ id: like.id, username: user.username, profilePhoto: user.img });
  }

  return likeData;
}


export const profileForPost = async(id) => {
  const [profile, error] = await fetchHandler(`/api/profiles/${id}`, basicFetchOptions);
  if (error) {
    console.error('Error fetching profile:', error);
    return {};
  }
  const { img, username } = profile;
  return {img, username};
}



export const requestConnection = async (profile_id1, profile_id2) => {
  const [connection, error] = await fetchHandler('/api/connection/request', getPostOptions({ profile_id1, profile_id2 }));
  if (error) {
    console.error('Error requesting connection:', error);
    return null;
  }
  return connection;
}