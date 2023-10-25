import React from "react";
import { Comment } from "../../types";

type CommentProps = {
  comment: Comment;
};

const Comment = ({ comment }: CommentProps) => {
  return <div>{comment.content}</div>;
};

export default Comment;
