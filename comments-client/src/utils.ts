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

export const findCommentByIdRecursive = (comments: Comment[], id: number) => {
  let found = false;
  let currIdx = 0;

  while (!found && currIdx < comments.length) {
    const currentComment = comments[currIdx];
    if (currentComment.id === id) {
      found = true;
      return currentComment;
    }
    if (currentComment.replies?.length > 0) {
      const foundComment = findCommentByIdRecursive(currentComment.replies, id);
      if (foundComment) {
        found = true;
        return foundComment;
      }
    }
    currIdx += 1;
  }
  return false;
};
