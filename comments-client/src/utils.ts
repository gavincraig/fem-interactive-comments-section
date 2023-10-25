import { Comment } from "./types";

export const deleteCommentRecursive = (comments: Comment[], id: number) => {
  const newComments = [...comments.filter((comment) => comment.id !== id)];
  newComments.forEach((comment) => {
    if (comment.replies?.length > 0) {
      comment.replies = deleteCommentRecursive(comment.replies, id);
    }
  });
  return newComments;
};

export const countCommentsRecursive = (comments: Comment[]) => {
  let total = comments.length;
  comments.forEach((comment) => {
    if (comment.replies?.length > 0) {
      total += countCommentsRecursive(comment.replies);
    }
  });
  return total;
};
