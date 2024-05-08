import * as Knex from "knex";
// user 
export interface UserLogin {
    id: number;
    email: string;
    role: string;
    hashed_password: string;
    created_at: Date;
  }
// profiles
  export interface Profile {
    id: number;
    user_id: number; 
    username: string;
    full_name: string;
    bio: string;
    account_type: string;
    data: Record<string, any>
   
  }

  // messages 
  export interface Message {
    id: number;
    created_at: Date;
    text: string;
    sent_by: string;
    chat_rooms_id: number;

  }
  
  export interface Notifications {
    id: number;
    created_at: Date;
    text: string;
    profile_id: number; 
    read: boolean;
    
  }
  
  export interface Post {
    id: number;
    title: string;
    body: string;
    profile_id: number; 
    created_at: Date;
    updated_at: Date;
  }

  export interface PostLike {
    id: number;
    profile_id: number;
    post_id: number; 
    
  }
  
  export interface Chatroom {
    id: number;
    name: string;
    created_at: Date;
    members: number[] ;
    last_commented_at: Date

  }
  export interface Comment {
    id: number;
    post_id: number; 
    profile_id: number; 
    body: string;
    created_at: Date;
    updated_at: Date;
  }
  export interface CommentLike {
    id: number;
    comment_id: number; 
    profile_id: number; 
  
  }
  
  