import React from "react";
import { Comment } from "../../types";

type CommentProps = {
  comment: Comment;
};

// http://localhost:5173/src/assets/images/avatars/image-amyrobson.png

const Comment = ({ comment }: CommentProps) => {
    
  return (
    <>
      <div className="flex flex-col bg-white rounded-lg p-4 gap-4">
          <div className="flex gap-4">
            <img src={`${comment.user.image.webp}`} width={32} height={32} />
            <span>{comment.user.username}</span>
            <span>{comment.createdAt}</span>
          </div>
          <p>{comment.content}</p>
        <div className="flex justify-between">
          <div>{comment.score}</div>
          <button>reply</button>
        </div>
      </div>
      {comment.replies?.length > 0 && (
        <ul className="flex flex-col pl-4 mt-4 gap-4 border-l-2 border-light-gray">
          {comment.replies.map((reply) => (
            <li key={reply.id}>
              <Comment comment={reply} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Comment;
