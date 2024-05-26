import { buildCommentTree } from "./CommentTree";
import { fetchPostComments } from "../../../utils";

export const fetchAndSetComments = async (setComments: (arg0: any) => void, postId) => {
    const fetchedComments = await fetchPostComments(postId);
    const commentTree = buildCommentTree(fetchedComments);
    setComments(commentTree);
  };
