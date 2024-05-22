import { useState, useEffect } from "react"
import { fetchProfileDataByUserId } from "../utils"
import FeedPosts from "./EditorComponents/FeedPosts"

const Profile = () => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalLikes, setTotalLikes] = useState(0)
  const [totalComments, setTotalComments] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProfileDataByUserId(1)
        if (response) {
          setProfile(response)
          console.log("Response received:", response)
          const likes = response.posts.reduce(
            (sum, post) => sum + parseInt(post.likes_count, 10),
            0
          )
          const comments = response.posts.reduce(
            (sum, post) => sum + post.comments_count,
            0
          )
          setTotalLikes(likes)
          setTotalComments(comments)
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

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="min-h-screen bg-slate-100">
      <h1>Profile</h1>
      <div className="relative">
        <div className="ml-[12.5rem] absolute top-0 left-0 w-[86%] h-[14rem] bg-cover bg-center bg-[rgb(8,66,108)]"></div>
        <div className="ml-[12.5rem] absolute left-0 w-[86%] h-[14rem] bg-cover bg-center"></div>
      </div>
      <div className="relative ml-[15rem] mt-[7rem] w-[80%] h-[20rem] bg-white text-black rounded-md p-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-4 mt-4">
            <div className="flex gap-8">
              <div className="flex flex-col items-center">
                <p className="text-lg font-semibold">12</p>
                <p className="text-gray-600">Followers</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-lg font-semibold">{profile.posts.length}</p>
                <p className="text-gray-600">Posts</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-lg font-semibold">{totalLikes}</p>
                <p className="text-gray-600">Likes</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-lg font-semibold">{totalComments}</p>
                <p className="text-gray-600">Comments</p>
              </div>
            </div>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 -top-12">
            <img
              className="w-24 h-24 rounded-full border border-slate-100 shadow-lg"
              src={
                profile.img ||
                "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
              }
              alt={profile.full_name}
            />
          </div>
          <div className="flex-shrink-0 mt-4">
            <button className="bg-[#A0D9FF] text-black py-2 px-4 rounded-md shadow transition-transform transform duration-300 ease-in-out hover:scale-105">
              Connect
            </button>
          </div>
        </div>
        <div className="mt-5 text-center">
          <p className="text-xl font-semibold">{profile.full_name}</p>
          <p className="text-gray-600">{profile.username}</p>
        </div>
        <hr className="mt-4 w-full border-t-2 border-gray-300" />
        <div className="mt-5 mx-auto text-center w-[40rem]">
          <p>{profile.bio}</p>
          <h1 className="mt-[5rem] text-xl font-semibold">Posts</h1>
        </div>
      </div>
      <div className="ml-[33rem] mt-[5rem] w-auto h-auto">
        <FeedPosts
          posts={profile.posts}
          view={true}
        />
      </div>
    </div>
  )
}

export default Profile
 