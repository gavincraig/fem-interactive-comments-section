import { useEffect, useState } from "react";
import { Comment } from "./components/Comment";
import DeleteCommentModal from "./components/DeleteCommentModal/DeleteCommentModal";
import { NewCommentInput } from "./components/NewCommentInput";
import { CurrentUserContext } from "./context/CurrentUserContext";
import { Comment as CommentType, User } from "./types";
import { countCommentsRecursive, deleteCommentRecursive } from "./utils";

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
    const newComment: CommentType = {
      content: comment,
      createdAt: "a moment ago",
      id: totalNumComments + 1,
      score: 1,
      user: currentUser,
    };
    setComments((comments) => [...comments, newComment]);
  };

  const handleDeleteComment = () => {
    setComments(deleteCommentRecursive(comments, selectedCommentId));
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
      className={`flex flex-col gap-4 bg-very-light-gray h-sreen px-4 py-8 relative overflow-auto`}
    >
      <CurrentUserContext.Provider value={currentUser}>
        {showDeleteCommentModal && (
          <DeleteCommentModal
            closeModal={handleCloseDeleteModal}
            handleDeleteComment={handleDeleteComment}
          />
        )}
        {comments.length > 0 && (
          <ul className="flex flex-col gap-4 max-h-screen overflow-auto">
            {comments.map((comment) => (
              <li key={comment.id}>
                <Comment
                  comment={comment}
                  handleDeleteButtonClick={handleOpenDeleteModal}
                />
              </li>
            ))}
          </ul>
        )}
        <NewCommentInput handleAddComment={handleAddComment} />
      </CurrentUserContext.Provider>
    </main>
  );
}

export default App;
