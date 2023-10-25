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

  const handleAddReply = (comment: string, replyingToId: number) => {
    console.log("add reply to ", comment, replyingToId);
    const newComments = [...comments];
    const recurse = (comments: Comment[]) => {
      const newComments = [...comments];
      // find comment with id === replyingTo. add to replies. break

      let found = false;
      let idx = 0;
      let commentReplyingTo = false;

      while (!found && idx < comments.length) {
        if (newComments[idx].id === replyingToId) {
          console.log("found it! ", newComments[idx].id);
          found = true;

          const newComment = {
            content: comment,
            createdAt: "a moment ago",
            id: totalNumComments + 1,
            score: 1,
            user: currentUser,
            replyingTo: newComments[idx].user.username,
          };

          if (newComments[idx].replies) {
            newComments[idx].replies.push(newComment);
          } else {
            newComments[idx].replies = [newComment];
          }
          return true;
        }
        if (newComments[idx].replies?.length > 0) {
          recurse(newComments[idx].replies);
        }
        idx++;
      }
      return false;
    };

    const commentReplyingTo = recurse(newComments);
    setComments(newComments);
    console.log("did find val : ", commentReplyingTo);
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
                  handleAddReply={handleAddReply}
                />
              </li>
            ))}
          </ul>
        )}
        <NewCommentInput submitCallback={handleAddComment} />
      </CurrentUserContext.Provider>
    </main>
  );
}

export default App;
