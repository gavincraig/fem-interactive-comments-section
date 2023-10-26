import { Comment, User } from "./types";
import { deleteCommentRecursive, findCommentByIdRecursive } from "./utils";

export const postComment = (comments: Comment[], content: string, currentUser: User, newID: number) : Comment[] => {
    const newComment: Comment = {
        content: content,
        createdAt: "a moment ago",
        id: newID,
        score: 1,
        user: currentUser,
      };
      return [...comments, newComment];
}

export const updateComment = (comments: Comment[], content: string, id: number) : Comment[] => {
    const newComments = [...comments];
    const foundComment = findCommentByIdRecursive(newComments, id);
    foundComment.content = content;
    return newComments;
}

export const postReply = (comments: Comment[], content: string, currentUser: User, replyingToId: number, newID: number) : Comment[] => {
    const newComments = [...comments];
    const commentReplyingTo = findCommentByIdRecursive(newComments, replyingToId);
    const newComment = {
      content: content,
      createdAt: "a moment ago",
      id: newID,
      score: 1,
      user: currentUser,
      replyingTo: commentReplyingTo.user.username,
    };
    if (commentReplyingTo.replies) {
      commentReplyingTo.replies.push(newComment);
    } else {
      commentReplyingTo.replies = [newComment];
    }
    return newComments;
}

export const deleteComment = (comments: Comment[], id: number) => {
    return deleteCommentRecursive(comments, id);
}