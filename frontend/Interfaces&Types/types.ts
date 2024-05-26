export type Feature =  {
    number: string;
    title: string;
    description: string;
  }
  

export type Post = {
    body: string
    comments_count: number
    id: number
    post_img: string
    likes_count: number
    profile_photo: string
    title: string
    username: string
    new_likes: { profile_id: number, img: string }[]
}

export type SearchPost = Post & { type: "post" }

export type Profile = {
    accountType: string
    bio: string
    data: any
    fullName: string
    id: number
    img: string
    settings: any
    updatedAt: string
    userId: number
    username: string
    createdAt: string
    likedPosts: number[]
}

export type SearchProfile = {
    type: "profile"
    id: number
    full_name: string
    username: string
    profile_photo: string
}


export type PathIndex = { [x: string]: any; "/feed"?: number; "/search"?: number; "/discover"?: number; "/notifications"?: number; "/messages"?: number; "/settings"?: number }


