import React, { useState, useContext } from "react";
import { Comment } from "../../types";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { ScoreCounter } from "./ScoreCounter";
import { NewCommentInput } from "../NewCommentInput";

type CommentProps = {
  comment: Comment;
  isReply?: boolean;
  handleDeleteButtonClick?: (id: number) => void;
  handleAddReply?: (id: number) => void;
};

// http://localhost:5173/src/assets/images/avatars/image-amyrobson.png

const Comment = ({
  comment,
  isReply,
  handleDeleteButtonClick,
  handleAddReply,
}: CommentProps) => {
  const currentUser = useContext(CurrentUserContext);

  const [showReplyInput, setShowReplyInput] = useState(false);

  const isOwnComment = comment.user.username === currentUser.username;

  const onReplySubmit = (reply: string) => {
    setShowReplyInput(false);
    handleAddReply(reply, comment.id);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col bg-white rounded-lg p-4 gap-4">
        <div className="flex gap-4 items-center">
          <img src={`${comment.user.image.webp}`} width={32} height={32} />
          <strong className="text-dark-blue">
            {comment.user.username}
            {isOwnComment && (
              <span className="bg-moderate-blue text-white text-xs font-medium rounded-sm px-1.5 py-0.5 ml-2">
                you
              </span>
            )}
          </strong>
          <span className="text-grayish-blue">{comment.createdAt}</span>
        </div>
        <p className="text-grayish-blue">
          {isReply && (
            <span className="text-moderate-blue font-medium">{`@${comment.replyingTo} `}</span>
          )}
          {comment.content}
        </p>
        <div className="flex justify-between">
          <ScoreCounter
            initialScore={comment.score}
            isDisabled={isOwnComment}
          />
          {isOwnComment ? (
            <div className="flex gap-4">
              <button
                className="flex items-center gap-2 text-soft-red font-medium"
                onClick={() => handleDeleteButtonClick(comment.id)}
              >
                <img src="images/icon-delete.svg" alt="" />
                Delete
              </button>
              <button className="flex items-center gap-2 text-moderate-blue font-medium">
                <img src="images/icon-edit.svg" alt="" />
                Edit
              </button>
            </div>
          ) : (
            <button
              className="flex items-center gap-2 text-moderate-blue font-medium"
              onClick={() => setShowReplyInput(true)}
            >
              <img src="images/icon-reply.svg" alt="" />
              Reply
            </button>
          )}
        </div>
      </div>
      {showReplyInput && <NewCommentInput submitCallback={onReplySubmit} placeholder={`@${comment.user.username}`}/>}
      {comment.replies?.length > 0 && (
        <ul className="flex flex-col pl-4 gap-4 border-l-2 border-light-gray">
          {comment.replies.map((reply) => (
            <li key={reply.id}>
              <Comment
                comment={reply}
                isReply
                handleDeleteButtonClick={handleDeleteButtonClick}
                handleAddReply={handleAddReply}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Comment;
