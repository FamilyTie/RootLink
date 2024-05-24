import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import handleFetch from "../components/EditorComponents/Editor-Configs/Fetching"
import { SearchPost, SearchProfile } from "../../types"
import { SearchResult } from "../../interfaces"
import { fetchHandler } from "../utils"
import Posts from "../components/EditorComponents/FeedPosts"

import SearchBar from "../components/ui/SearchBar"

function Search() {
  const [initialPosts, setInitialPosts] = useState([])
  const [posts, setPosts] = useState<SearchPost[]>([])
  const [profiles, setProfiles] = useState<SearchProfile[]>([])
  const [queryOption, setQueryOption] = useState<"profiles" | "posts">(
    "profiles"
  )
  const [showAllProfiles, setShowAllProfiles] = useState(false)
  const { query } = useParams()

  //inital posts(recent posts)

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await handleFetch("/api/posts")
      setInitialPosts(posts[0])
    }
    fetchPosts()
  })

  //Posts and profiles based on search query
  useEffect(() => {
    console.log(query)
    try {
      const fetchQuery = async () => {
        const response = await fetchHandler(`/api/search?query=${query}`)
        const results: SearchResult = response[0]
        console.log(results, "results")
        setPosts(results.posts)
        setProfiles(results.profiles)
      }
      fetchQuery()
    } catch (error) {
      console.log(error)
    }
  }, [query])

  const displayedProfiles = showAllProfiles ? profiles : profiles.slice(0, 3)

  return (
    <div className="">
      <div className="overlay-shadow absolute w-full bottom-0 h-[5rem]"></div>

      <div className="w-full pl-[15rem] pt-[4rem] bg-slate-100 h-screen overflow-scroll rounded-tl-[3rem]">
        <div className=" fixed w-[40rem] bg-slate-100 bg-opacity-50 backdrop-blur py-5 translate-x-[-5rem]">
          <SearchBar big={true} />
        </div>

        <div className="h-full overflow-scroll">
          <div className="mt-[5rem]">
            <div className="mb-5 w-[35rem]">
              {displayedProfiles.length > 0 && (
                <h1 className="text-[25px] font-bold">People</h1>
              )}
              {displayedProfiles.map((profile, index) => (
                <div
                  key={index}
                  className="w-[35rem] justify-between py-3 flex border-b"
                >
                  <div className="flex gap-2">
                    <img
                      className="w-[3rem] bg-white p-1 shadow rounded-full h-[3rem]"
                      src={profile.profile_photo}
                    ></img>
                    <div>
                      <p className="font-semibold text-[20px]">
                        {profile.full_name}
                      </p>
                      <p className="text-[20px] text-gray-500">
                        @{profile.username}
                      </p>
                    </div>
                  </div>
                  <div>
                    <button className="bg-[#074979] text-white p-1 px-4 rounded">
                      Message
                    </button>
                  </div>
                </div>
              ))}
              {!showAllProfiles && profiles.length > 3 && (
                <p
                  className=" text-[#074979] cursor-pointer  p-1 text-[20px] rounded-md mt-4"
                  onClick={() => setShowAllProfiles(true)}
                >
                  View All
                </p>
              )}
            </div>
            {posts.length === 0 && (
              <h1 className="text-[25px] font-bold mb-5">Recently Posted</h1>
            )}
            <Posts
              posts={posts}
              view={false}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
