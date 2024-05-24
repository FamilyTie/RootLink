import { createContext } from "react"

export interface User {
  has(id: any): unknown
  likedPosts: User
  img: any
  id: number
  username: string
}

export interface CurrentUserContextType {
  currentUser: User | null // Assuming currentUser can be null
  setCurrentUser: (user: User | any) => void
}

const CurrentUserContext = createContext<CurrentUserContextType>({
  currentUser: null,
  setCurrentUser: () => {},
})

export default CurrentUserContext
