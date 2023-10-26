import { useEffect, useState } from "react";
import { Comment } from "./components/Comment";
import DeleteCommentModal from "./components/DeleteCommentModal/DeleteCommentModal";
import { NewCommentInput } from "./components/NewCommentInput";
import { CurrentUserContext } from "./context/CurrentUserContext";
import { deleteComment, postComment, postReply, updateComment } from "./mockServerActions";
import { Comment as CommentType, User } from "./types";
import { countCommentsRecursive } from "./utils";

function App() {
  const [comments, setComments] = useState<CommentType[] | []>([]);
  const [currentUser, setCurrentUser] = useState<User>({});
  const [showDeleteCommentModal, setShowDeleteCommentModal] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  const totalNumComments = countCommentsRecursive(comments);

  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => {
        setComments(data.comments);
        setCurrentUser(data.currentUser);
      });
  }, []);

  const handleAddComment = (comment: string) => {
    setComments(postComment(comments, comment, currentUser, totalNumComments + 1));
  };

  const handleUpdateComment = (comment: string, id: number) => {
    setComments(updateComment(comments, comment, id));
  }

  const handleAddReply = (comment: string, replyingToId: number) => {
    setComments(postReply(comments, comment, currentUser, replyingToId, totalNumComments + 1));
  };

  const handleDeleteComment = () => {
    setComments(deleteComment(comments, selectedCommentId));
    setShowDeleteCommentModal(false);
  };

  const handleOpenDeleteModal = (commentId: number) => {
    setSelectedCommentId(commentId);
    setShowDeleteCommentModal(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedCommentId(null);
    setShowDeleteCommentModal(false);
  };

  return (
    <main
      className={`bg-very-light-gray min-h-sreen px-4 py-8 relative`}
    >
      <div className="flex flex-col gap-4 max-w-screen-md m-auto">
      <CurrentUserContext.Provider value={currentUser}>
        {showDeleteCommentModal && (
          <DeleteCommentModal
            closeModal={handleCloseDeleteModal}
            handleDeleteComment={handleDeleteComment}
          />
        )}
        {comments.length > 0 && (
          <ul className="flex flex-col gap-4">
            {comments.map((comment) => (
              <li key={comment.id}>
                <Comment
                  comment={comment}
                  handleDeleteButtonClick={handleOpenDeleteModal}
                  handleAddReply={handleAddReply}
                  handleUpdateComment={handleUpdateComment}
                />
              </li>
            ))}
          </ul>
        )}
        <NewCommentInput submitCallback={handleAddComment} />
      </CurrentUserContext.Provider>
      </div>
      <div className="text-center text-xs text-grayish-blue mt-4">
    Challenge by <a className="text-moderate-blue" href="https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9" target="_blank">Frontend Mentor</a>. 
    Coded by <a className="text-moderate-blue" href="https://github.com/gavincraig/fem-interactive-comments-section">gavincraig</a>.
  </div>
    </main>
  );
}

export default App;
