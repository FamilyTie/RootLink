import { useState, useEffect, useMemo, useContext } from "react";
import { BlockNoteView } from "@blocknote/mantine";
import { BlockNoteEditor } from "@blocknote/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { schema } from "../Editor-Configs/Utility";
import handleFetch from "../Editor-Configs/Fetching";
import LikesGraphic from "../../ui/LikesGraphic";
import "../editorStyles.css"; // import editor styles
import {
  deleteOptions,
  fetchPostComments,
  getPostOptions,
  deleteCommentById,
} from "../../../utils";
import CurrentUserContext from "../../../contexts/current-user-context";
import Comments from "../../layout/Comments";
import { buildCommentTree } from "./CommentTree";
import CreatePost from "../CreatePost";

export function Post({
  
  refetch,
  post,
  postBody,
  view = false,
  onEdit,
  isSettingsPage = false,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const [initialContent, setInitialContent] = useState(postBody);
  const [likesCount, setLikesCount] = useState(post.likes_count ? post.likes_count : 0);
  const [profilePhoto, setProfilePhoto] = useState(post.profile_photo);
  const [commentsCount, setCommentsCount] = useState(post.comments_count);
  const [likes, setLikes] = useState(post.new_likes || []);
  const [comments, setComments] = useState([]);
  const [bodyExpanded, setBodyExpanded] = useState(false);
  const [commentsExpanded, setCommentsExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");
  const [isEditing, setIsEditing] = useState(false);


  
  useEffect(() => {
    if (post && post.new_likes) {
      setLikes(post.new_likes);
    } else {
      setLikes([]);
    }
  }, [post]);

  useEffect(() => {
    if (
      currentUser &&
      currentUser.likedPosts &&
      currentUser.likedPosts.has(post.id)
    ) {
      setLiked(true);
    }
  }, [currentUser, post.id]);

  useEffect(() => {
    if (post && post.likes_count) {
      setLikesCount(post.likes_count);
    }
  }, [post]);

  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await fetchPostComments(post.id);
      const commentTree = buildCommentTree(fetchedComments);
      setComments(commentTree);
    };
    if (commentsExpanded) {
      fetchComments();
    }
  }, [commentsExpanded, post.id]);

  const fetchAndSetComments = async () => {
    const fetchedComments = await fetchPostComments(post.id);
    const commentTree = buildCommentTree(fetchedComments);
    setComments(commentTree);
  };

  const handleCommentSubmit = async () => {
    const comment = {
      profile_id: currentUser.id,
      post_id: post.id,
      body: newCommentText,
    };
    const response = await handleFetch(
      "/api/comments/",
      getPostOptions(comment)
    );
    if (response && response.length > 0) {
      toast.success("Comment submitted");
      setNewCommentText("");
      fetchAndSetComments(); // Refetch comments
      setCommentsCount((count) => count + 1);
    } else {
      toast.error("Failed to submit comment");
    }
  };

  const addReply = async (parentCommentId, replyText) => {
    try {
      const reply = {
        profile_id: currentUser.id,
        post_id: post.id,
        body: replyText,
        comment_id: parentCommentId,
      };
      const response = await handleFetch(
        "/api/comments/",
        getPostOptions(reply)
      );
      if (response && response.length > 0) {
        toast.success("Reply submitted");
        fetchAndSetComments(); // Refetch comments
      } else {
        toast.error("Failed to submit reply");
      }
    } catch (error) {
      console.error("Error adding reply:", error);
      toast.error("Failed to submit reply");
    }
  };

  const handleLike = () => {
    if (!liked) {
      const like = {
        profile_id: currentUser.id,
        post_id: post.id,
      };
      handleFetch("/api/likes/post", getPostOptions(like))
        .then((response) => {
          if (response) {
            setLiked(true);
            setLikes((likes) => [
              ...likes,
              { profile_id: currentUser.id, img: currentUser.img },
            ]);
            setLikesCount((count) => count + 1);
          } else {
            toast.error("Failed to like post");
          }
        })
        .catch((error) => {
          console.error("Error liking post:", error);
        });
    } else {
      handleFetch(
        `/api/likes/post?profile_id=${currentUser.id}&post_id=${post.id}`,
        deleteOptions
      )
        .then((response) => {
          if (response) {
            setLiked(false);
            setLikesCount((count) => count - 1);
            setLikes((likes) =>
              likes.filter((like) => like.profile_id !== currentUser.id)
            );
          } else {
            toast.error("Failed to unlike post");
          }
        })
        .catch((error) => {
          console.error("Error unliking post:", error);
        });
    }
  };

  const expandComments = () => {
    setCommentsExpanded((expanded) => !expanded);
  };

  const deleteComment = async (id) => {
    await deleteCommentById(id);
    toast.success("Comment deleted");
    fetchAndSetComments(); // Refetch comments
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveEdit = (updatedPost) => {
    onEdit(updatedPost);
    setIsEditing(false);
  };

  const editor = useMemo(() => {
    if (initialContent) {
      try {
        return BlockNoteEditor.create({
          initialContent,
          schema,
          readOnly: true,
          editable: false,
        });
      } catch (error) {
        console.error("Failed to create editor:", error);
      }
    }
  }, [initialContent]);

  if (isEditing) {
    return (
      <CreatePost
        refetchPosts={onEdit}
        initialTitle={post.title}
        initialBody={post.body}
        initialImage={post.img}
        postId={post.id}
        onCancel={() => setIsEditing(false)}
        onSave={undefined}
      />
    );
  }
  

  return (
    <div className="h-full transition-all duration-300 pb-7 bg-white pt-3 w-[30rem] rounded">
      <div className="bg-none pointer-events-none">
      <ToastContainer
        position="bottom-left"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}

      />
      </div>
     
      <a href={`/profile/${post.profile_id}`}><div className="flex cursor-pointer pl-[5%]">
        {post.profile_photo && (
          <img
            src={
              post.profile_photo ||
              "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"
            }
            className="w-10 mr-2 h-10 p-[2px]   bg-white rounded-full object-cover shadow ml-2 mt-4"
            alt=""
          />
        )}
        <div className="my-auto  gap-1 flex">
          <p className="text-[22px] font-semibold     translate-y-[7.5px] my-auto">
            {post.full_name?  post.full_name : post.fullName}
          </p>
          <p className="text-[18px] font-medium text-gray-500   translate-y-[7.5px] my-auto">@{post.username && post.username}</p>
        </div>
      </div></a>
      <div className="relative">
        <div
        
          className="flex hover:bg-gray-50 rounded-md cursor-pointer justify-between transition-all duration-200 pl-[2%] mt-2 text-center py-2 mx-[6%] gap-3"
        >
          <h1 className="text-[25px] ">{post.title}</h1>
        </div>
        {isSettingsPage && (
          <div className="absolute top-0 right-0 mt-2 mr-4">
            <button
              className="bg-[#A0D9FF] text-black py-2 px-4 rounded-md shadow transition-transform transform duration-300 ease-in-out hover:scale-105"
              onClick={handleEditToggle}
            >
              Edit
            </button>
          </div>
        )}
      </div>
   
        <div className="pl-7">
          <BlockNoteView
            // @ts-ignore
            editor={editor}
            editable={false}
            theme="light"
            sideMenu={false}
            slashMenu={false}
            className="custom-blocknote"
          />
        </div>
    
      {(isSettingsPage ? post.img : post.post_image) && (
        <div className="overflow-hidden w-[85%] m-auto rounded-lg mt-3">
          <img
            src={isSettingsPage ? post.img : post.post_image}
            alt="post"
          />
        </div>
      )}
      {likesCount > 0 && likes && view && (
        <div className="flex  justify-between w-full">
          <div className="flex translate-x-[8px] flex-grow">
            <LikesGraphic
              likes_count={likesCount}
              likes={likes.slice(0, 3)}
            />
          </div>
          <div className="flex gap-3 m-auto pr-12 font-medium translate-y-[6px] text-gray-400">
            <p className="text-[18px] my-auto ">
              {likesCount}{" "}
              {likesCount > 1 || likesCount === 0 ? "likes" : "like"}
            </p>
            <p className="text-[18px] my-auto ">
              {commentsCount}{" "}
              {commentsCount > 1 || commentsCount === 0
                ? "comments"
                : "comment"}
            </p>
          </div>
        </div>
      )}
      <div className="flex border-t-[1.5px]  w-[90%] justify-between m-auto mt-2 p-1 border-b-[1.5px] border-gray-100">
        {[
          {
            text: "Like",
            src: `${liked ? "/heart (6).png" : "/heart (5).png"}`,
            onClick: handleLike,
          },
          { text: "Comments", src: "/chat-box.png", onClick: expandComments },
          { text: "Share", src: "/share (1).png", onClick: null },
        ].map((action) => (
          <div
            key={action.text}
            onClick={action.onClick}
            className="flex gap-2 rounded-md transition-all cursor-pointer duration-200 hover:bg-gray-50 p-3 px-5 m-auto"
          >
            <img
              src={action.src}
              alt=""
              className={`cursor-pointer w-7 ${
                liked && action.onClick === handleLike
                  ? "opacity-100"
                  : "opacity-50"
              } h-7 my-auto`}
            />
            <p className="text-[18px] opacity-50 my-auto">{action.text}</p>
          </div>
        ))}
      </div>
      <div className="flex translate-x-[-8px]  mt-3 pl-[5%]">
        <div className="w-11 mr-5 h-11 translate-x-[8px]  overflow-hidden rounded-full object-cover border-4 border-white  shadow ml-2 ">
          <img
            src={currentUser && (currentUser as any).img}
            className=" w-full  m-auto"
            alt=""
          />
        </div>
        <input
          type="text"
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          placeholder="Enter a comment"
          className="text-[1.2rem] pl-3 h-[2.5rem] bg-slate-100 rounded-md my-auto w-[70%]"
        />
        <div
          onClick={handleCommentSubmit}
          className="w-[2.7rem] cursor-pointer h-[2.5em] bg-[#A0D9FF] my-auto rounded-lg ml-2"
        >
          <img
            className="w-[1.3rem] m-auto mt-[10px]"
            src="/message.png"
            alt="submit"
          />
        </div>
      </div>
      {commentsExpanded && (
        <div className="scale-[0.95]">
              <Comments

          comments={comments}
          addReply={view ? addReply : null}
          deleteComment={deleteComment}
        />
        </div>
        
      )}
    </div>
  );
}