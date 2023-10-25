import React, { useContext } from "react";
import { Comment } from "../../types";
import { CurrentUserContext } from "../../context/CurrentUserContext";

type CommentProps = {
  comment: Comment;
  isReply?: boolean;
};

// http://localhost:5173/src/assets/images/avatars/image-amyrobson.png

const Comment = ({ comment, isReply }: CommentProps) => {
  const currentUser = useContext(CurrentUserContext);

  const isOwnComment = comment.user.username === currentUser.username;
  return (
    <>
      <div className="flex flex-col bg-white rounded-lg p-4 gap-4">
        <div className="flex gap-4">
          <img src={`${comment.user.image.webp}`} width={32} height={32} />
          <strong>
            {comment.user.username}
            {isOwnComment && <span className="bg-moderate-blue text-white text-xs font-medium rounded-sm px-1.5 py-1 ml-2">you</span>}
            </strong>
          <span>{comment.createdAt}</span>
        </div>
        <p>
          {isReply && (
            <span className="text-moderate-blue font-medium">{`@${comment.replyingTo} `}</span>
          )}
          {comment.content}
        </p>
        <div className="flex justify-between">
          <div>{comment.score}</div>
          <button>reply</button>
        </div>
      </div>
      {comment.replies?.length > 0 && (
        <ul className="flex flex-col pl-4 mt-4 gap-4 border-l-2 border-light-gray">
          {comment.replies.map((reply) => (
            <li key={reply.id}>
              <Comment comment={reply} isReply />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Comment;
