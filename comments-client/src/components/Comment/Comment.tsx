import React, { useState, useContext } from "react";
import { Comment } from "../../types";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { ScoreCounter } from "./ScoreCounter";
import { NewCommentInput } from "../NewCommentInput";
import { TextArea } from "../core/TextArea";

type CommentProps = {
  comment: Comment;
  isReply?: boolean;
  handleDeleteButtonClick?: (id: number) => void;
  handleAddReply?: (id: number) => void;
  handleUpdateComment?: (comment: string, id: number) => void;
};

const Comment = ({
  comment,
  isReply,
  handleDeleteButtonClick,
  handleAddReply,
  handleUpdateComment
}: CommentProps) => {
  const currentUser = useContext(CurrentUserContext);

  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showEditInput, setShowEditInput] = useState(false);
  const [inputValue, setInputValue] = useState(comment.content);

  const isOwnComment = comment.user.username === currentUser.username;

  const onReplySubmit = (reply: string) => {
    setShowReplyInput(false);
    handleAddReply(reply, comment.id);
  };

  const onUpdateSubmit = () => {
    setShowEditInput(false);
    handleUpdateComment(inputValue, comment.id)
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col bg-white rounded-lg p-4 gap-4">
        <div className="flex gap-4 items-center">
          <img src={`${comment.user.image.webp}`} alt={`${comment.user.username}'s avatar`} width={32} height={32} />
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
        {showEditInput ? (
          <>
            <TextArea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              className="rounded-lg bg-moderate-blue text-white font-medium px-8 py-3 w-fit self-end hover:bg-light-grayish-blue"
              onClick={onUpdateSubmit}
            >
              UPDATE
            </button>
          </>
        ) : (
          <p className="text-grayish-blue">
            {isReply && (
              <span className="text-moderate-blue font-medium">{`@${comment.replyingTo} `}</span>
            )}
            {comment.content}
          </p>
        )}

        <div className="flex justify-between">
          <ScoreCounter
            initialScore={comment.score}
            isDisabled={isOwnComment}
          />
          {isOwnComment ? (
            <div className="flex gap-4">
              <button
                className="flex items-center gap-2 text-soft-red font-medium hover:opacity-50"
                onClick={() => handleDeleteButtonClick(comment.id)}
              >
                <img src="images/icon-delete.svg" alt="" />
                Delete
              </button>
              <button
                className="flex items-center gap-2 text-moderate-blue font-medium hover:opacity-50"
                onClick={() => setShowEditInput(true)}
              >
                <img src="images/icon-edit.svg" alt="" />
                Edit
              </button>
            </div>
          ) : (
            <button
              className="flex items-center gap-2 text-moderate-blue font-medium hover:opacity-50"
              onClick={() => setShowReplyInput(true)}
            >
              <img src="images/icon-reply.svg" alt="" />
              Reply
            </button>
          )}
        </div>
      </div>
      {showReplyInput && (
        <NewCommentInput
          submitCallback={onReplySubmit}
          placeholder={`@${comment.user.username}`}
        />
      )}
      {comment.replies?.length > 0 && (
        <ul className="flex flex-col pl-4 gap-4 border-l-2 border-light-gray">
          {comment.replies.map((reply) => (
            <li key={reply.id}>
              <Comment
                comment={reply}
                isReply
                handleDeleteButtonClick={handleDeleteButtonClick}
                handleAddReply={handleAddReply}
                handleUpdateComment={handleUpdateComment}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Comment;
