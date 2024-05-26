import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { app } from "../firebase-config"
import { checkForLoggedInUser } from "./adapters/auth-adapter"
import { Dispatch, SetStateAction } from "react"
import { PathIndex } from "../Interfaces&Types/types"



const basicFetchOptions = {
  method: "GET",
  credentials: "include",
}

export const deleteOptions = {
  method: "DELETE",
  credentials: "include",
}

export const getPostOptions = (body: object) => ({
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
})

export const getPatchOptions = (body: object) => ({
  method: "PATCH",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
})

export const fetchHandler = async (url: string, options = {}) => {
  try {
    const response = await fetch(url, options)
    const { ok, status, headers } = response
    if (!ok)
      throw new Error(`Fetch failed with status - ${status}`, { cause: status })

    const isJson = (headers.get("content-type") || "").includes(
      "application/json"
    )
    const responseData = await (isJson ? response.json() : response.text())

    return [responseData, null]
  } catch (error) {
    console.warn(error)
    return [null, error]
  }
}

export const uploadFileAndGetURL = async (file: string | Blob | Uint8Array | ArrayBuffer | any) => {
  const storage = getStorage(app)
  const storageRef = ref(storage, `uploads/${file.name}`)

  try {
    // Upload the file
    const snapshot = await uploadBytes(storageRef, file)
    // Get the URL of the uploaded file
    const downloadURL = await getDownloadURL(snapshot.ref)
    console.log("File available at", downloadURL)
    return downloadURL
  } catch (error) {
    console.error("Error uploading file:", error)
    throw error // Rethrow the error for further handling if necessary
  }
}

export const fetchPostComments = async (id: string | number) => {
  const [comments, error] = await fetchHandler(
    `/api/comments/posts?postId=${id}`,
    basicFetchOptions
  )
  if (error) {
    console.error("Error fetching comments:", error)
    return []
  }
  return comments
}

export const fetchPostLikes = async (id: string | number) => {
  const likeData = []
  const [likes, error] = await fetchHandler(
    `/api/likes/posts/${id}`,
    basicFetchOptions
  )
  if (error) {
    console.error("Error fetching likes:", error)
    return []
  }

  for (const like of likes) {
    const [user, error] = await fetchHandler(
      `/api/profiles/${like.profileId}`,
      basicFetchOptions
    )
    if (error) {
      console.error("Error fetching user:", error)
      return []
    }
    likeData.push({
      id: like.id,
      username: user.username,
      profilePhoto: user.img,
    })
  }

  return likeData
}

export const fetchCommentLikes = async (id: string | number) => {
  const likeData = []
  const [likes, error] = await fetchHandler(
    `/api/likes/comments/${id}`,
    basicFetchOptions
  )
  if (error) {
    console.error("Error fetching likes:", error)
    return []
  }

  for (const like of likes) {
    const [user, error] = await fetchHandler(
      `/api/profiles/${like.profileId}`,
      basicFetchOptions
    )
    if (error) {
      console.error("Error fetching user:", error)
      return []
    }
    likeData.push({
      id: like.id,
      username: user.username,
      profilePhoto: user.img,
    })
  }

  return likeData
}

export const profileForPost = async (id: string | number) => {
  const [profile, error] = await fetchHandler(
    `/api/profiles/${id}`,
    basicFetchOptions
  )
  if (error) {
    console.error("Error fetching profile:", error)
    return {}
  }
  const { img, username } = profile;
  return { img, username };
}



export const requestConnection = async (profile_id1: string | number, profile_id2: string | number) => {
  const [connection, error] = await fetchHandler('/api/connection/request', getPostOptions({ profile_id1, profile_id2 }));
  if (error) {
    console.error('Error requesting connection:', error);
    return null;
  }
  return connection;
}

export const fetchProfileDataByUserId = async (userId: string | number) => {
  const [profileData, error] = await fetchHandler(
    `http://localhost:3761/api/profiles/user/${userId}`,
    basicFetchOptions
  )
  if (error) {
    console.error("Error fetching profile data by user ID:", error)
    return {}
  }
  return profileData
}

export const deleteCommentById = async (id: string | number) => {
  const [result, error] = await fetchHandler(
    `http://localhost:3761/api/comments/${id}`,
    deleteOptions
  )
  if (error) {
    console.error("Error deleting comment:", error)
    return null
  }
  return result
}


export const getNotificationsForCurrentProfile = async (profileId: any, setNotifications: { (notifications: any): void; (arg0: { received: any; sent: any }): void }) => {
  if (!profileId) return;
  const received = await fetchHandler(
    `/api/notifications/${profileId}`
  );
  const sent = await fetchHandler(
    `/api/notifications/sent/${profileId}`
  );
  setNotifications({ received: received[0], sent: sent[0] });
}

export const getConnectionsForCurrentProfile = async (profileId: any, setConnections: { (notifications: any): void; (arg0: any): void }) => {
  try {
    const connections = await fetchHandler(
      `/api/connection/${profileId}`
    );
    console.log(connections, "Hello World");
    if (connections) {
      setConnections(connections[0]);
    }
  } catch (error) {
    console.error("Error fetching connections:", error);
  }
}


export const getCurrentUserProfile = async (setCurrentProfile: { (profile: any): void; (arg0: any): void }) => {
  const user = await checkForLoggedInUser();
  if (user) {
    const likedPosts = await fetchHandler(
      `/api/posts/liked/${user.profile.id}`
    );
    user.profile["likedPosts"] = new Set(likedPosts[0]);
  }
  setCurrentProfile(user.profile);
}



export const getSimilarProfiles = async (user: { similarProfiles: { most_similar_profiles: any }; id: any }, setSimilarProfiles: { (value: SetStateAction<any[]>): void; (arg0: any[]): void }, connections: any[], notifications: { sent: any[]; received: any[] }) => {
  if (!user || !user.similarProfiles || !connections || !notifications) return;
  try {
    const similarData = user.similarProfiles.most_similar_profiles;
    const res = await Promise.all(
      similarData.map(async (profile) => {
        const response = await fetch(
          `/api/profiles/${profile.profile_id}`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch profile with id ${profile.profile_id}`
          );
        }
        const data = await response.json();
        return { ...data, similarity: profile.similarity };
      })
    );

    const filteredSimilarUsers = res
      .filter(
        (similarUser) =>
          connections.some(
            (connection) =>
              connection.profile_id1 === similarUser.id ||
              connection.profile_id2 === similarUser.id
          )
      )
      .map((similarUser) => {
        const hasSentNotification = notifications.sent.some(
          (notification) =>
            notification.profile_id_sent === user.id &&
            notification.profile_id_received === similarUser.id
        );
        const hasReceivedNotification = notifications.received.some(
          (notification) =>
            notification.profile_id_sent === similarUser.id &&
            notification.profile_id_received === user.id
        );
        return {
          ...similarUser,
          requested: hasSentNotification,
          received: hasReceivedNotification,
        };
      });

    console.log(filteredSimilarUsers, "filteredSimilarUsers")
    setSimilarProfiles(filteredSimilarUsers);
  } catch (error) {
    console.error("Error fetching similar profiles:", error);
  }
}

export const getPathIndex = (path: string, pathIndexes: PathIndex) => {
  // Check for exact matches first
  if (pathIndexes[path] !== undefined) {
    return pathIndexes[path];
  }

  const dynamicRoutes = [
    { path: "/search/", index: 2 },
  ];

  for (let route of dynamicRoutes) {
    if (path.startsWith(route.path)) {
      return route.index;
    }
  }
};