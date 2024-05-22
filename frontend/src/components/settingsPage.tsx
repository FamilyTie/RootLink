import { useState, useEffect, useContext } from "react"
import {
  fetchProfileDataByUserId,
  fetchHandler,
  uploadFileAndGetURL,
} from "../utils"
import CurrentUserContext from "../contexts/current-user-context"
import "./EditorComponents/editorStyles.css"
import { toast } from "react-toastify"
import { Post } from "./EditorComponents/Posts-Config/Post"

const Settings = () => {
  const { currentUser } = useContext(CurrentUserContext)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [posts, setPosts] = useState([])
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [editableProfile, setEditableProfile] = useState({
    full_name: "",
    username: "",
    bio: "",
    img: "",
  })
  const [profileImage, setProfileImage] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProfileDataByUserId(1)
        if (response) {
          setProfile(response)
          setPosts(response.posts)
          setEditableProfile({
            full_name: response.full_name,
            username: response.username,
            bio: response.bio,
            img: response.img,
          })
          setLoading(false)
        } else {
          setError("Failed to fetch profile data")
          setLoading(false)
        }
      } catch (err) {
        console.error("Error fetching profile data:", err)
        setError("Failed to fetch profile data")
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleProfileEdit = () => {
    setIsEditingProfile(true)
  }

  const handleProfileSave = async () => {
    let img_url = editableProfile.img
    if (profileImage) {
      img_url = await uploadFileAndGetURL(profileImage)
    }
    try {
      const [response, error] = await fetchHandler(
        `/api/profiles/${currentUser.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...editableProfile, img: img_url }),
        }
      )
      if (response) {
        setProfile(response)
        setIsEditingProfile(false)
        toast.success("Profile updated successfully")
      } else {
        toast.error("Failed to update profile")
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error("Failed to update profile")
    }
  }

  const handleProfileCancel = () => {
    setEditableProfile({
      full_name: profile.full_name,
      username: profile.username,
      bio: profile.bio,
      img: profile.img,
    })
    setIsEditingProfile(false)
    setProfileImage(null)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileImage(file)
      setEditableProfile((prev) => ({
        ...prev,
        img: URL.createObjectURL(file),
      }))
    }
  }

  const handlePostEdit = async (updatedPost) => {
    console.log("post updated", updatedPost)
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="min-h-screen bg-slate-100">
      <h1>Profile</h1>
      <div className="relative">
        <div className="ml-[12.5rem] absolute top-0 left-0 w-[86%] h-[14rem] bg-cover bg-center bg-[rgb(8,66,108)]"></div>
        <div className="ml-[12.5rem] absolute left-0 w-[86%] h-[14rem] bg-cover bg-center"></div>
      </div>
      <div className="relative ml-[15rem] mt-[7rem] w-[80%] h-[22rem] bg-white text-black rounded-md p-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-4 mt-4">
            <div className="flex gap-8">
              <div className="flex flex-col items-center">
                <p className="text-lg font-semibold">12</p>
                <p className="text-gray-600">Followers</p>
              </div>
              <div className="flex flex-col items-center">
                {/* <p className="text-lg font-semibold">{profile.posts.length}</p> */}
                <p className="text-gray-600">Posts</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-lg font-semibold">
                  {/* {profile.posts.reduce(
                    (sum, post) => sum + post.likes_count,
                    0
                  )} */}
                </p>
                <p className="text-gray-600">Likes</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-lg font-semibold">
                  {/* {profile.posts.reduce(
                    (sum, post) => sum + post.comments_count,
                    0
                  )} */}
                </p>
                <p className="text-gray-600">Comments</p>
              </div>
            </div>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 -top-12">
            {isEditingProfile ? (
              <div className="relative group">
                <img
                  className="w-24 h-24 rounded-full border border-slate-100 shadow-lg"
                  src={
                    editableProfile.img ||
                    "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
                  }
                  alt={editableProfile.full_name}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-full cursor-pointer">
                  <span className="text-white font-semibold">Edit</span>
                </div>
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />
              </div>
            ) : (
              <img
                className="w-24 h-24 rounded-full border border-slate-100 shadow-lg"
                src={
                  profile.img ||
                  "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
                }
                alt={profile.full_name}
              />
            )}
          </div>
          <div className="flex-shrink-0 mt-4 flex gap-2">
            <button className="bg-[#A0D9FF] text-black py-2 px-4 rounded-md shadow transition-transform transform duration-300 ease-in-out hover:scale-105">
              Connect
            </button>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-transform transform duration-300 ease-in-out"
              onClick={handleProfileEdit}
            >
              Edit Profile
            </button>
          </div>
        </div>
        <div className="mt-5 text-center">
          {isEditingProfile ? (
            <>
              <input
                type="text"
                className="text-xl font-semibold border border-gray-300 rounded-md p-2 mx-auto mb-2 w-64"
                value={editableProfile.full_name}
                onChange={(e) =>
                  setEditableProfile({
                    ...editableProfile,
                    full_name: e.target.value,
                  })
                }
              />
              <input
                type="text"
                className="text-gray-600 border border-gray-300 rounded-md p-2 mx-auto w-64"
                value={editableProfile.username}
                onChange={(e) =>
                  setEditableProfile({
                    ...editableProfile,
                    username: e.target.value,
                  })
                }
              />
            </>
          ) : (
            <>
              <p className="text-xl font-semibold">{profile.full_name}</p>
              <p className="text-gray-600">{profile.username}</p>
            </>
          )}
        </div>
        <hr className="mt-4 w-full border-t-2 border-gray-300" />
        <div className="mt-5 mx-auto text-center w-[40rem]">
          {isEditingProfile ? (
            <textarea
              value={editableProfile.bio}
              onChange={(e) =>
                setEditableProfile({
                  ...editableProfile,
                  bio: e.target.value,
                })
              }
              className="w-full h-20 p-2 border border-gray-300 rounded-md"
            />
          ) : (
            <p>{profile.bio}</p>
          )}
          <div className="flex justify-center mt-4">
            {isEditingProfile ? (
              <>
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded-md mr-2"
                  onClick={handleProfileSave}
                >
                  Save
                </button>
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded-md"
                  onClick={handleProfileCancel}
                >
                  Cancel
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
      <h1 className="mt-[5rem] text-xl font-semibold text-center">Posts</h1>
      <div className="ml-[33rem] mt-[5rem] w-auto h-auto">
        <div className="flex flex-col">
          {posts.map((post) => (
            <Post
              key={post.id}
              postBody={JSON.parse(post.body)}
              post={post}
              view={true}
              onEdit={handlePostEdit}
              isSettingsPage={true} // Pass the new prop
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Settings
