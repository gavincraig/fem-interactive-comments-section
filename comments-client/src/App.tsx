import React, { useState, useEffect } from "react";
import { Comment as CommentType, User } from "./types";
import { Comment } from "./components/Comment";
import { CurrentUserContext } from "./context/CurrentUserContext";

function App() {
  const [comments, setComments] = useState<CommentType[] | []>([]);
  const [currentUser, setCurrentUser] = useState<User>({});

  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => {
        setComments(data.comments);
        setCurrentUser(data.currentUser);
      });
  }, []);

  return (
    <main className="bg-very-light-gray min-h-screen px-4 py-8">
      <CurrentUserContext.Provider value={currentUser}>
        {comments.length > 0 && (
          <ul className="flex flex-col gap-4">
            {comments.map((comment) => (
              <li key={comment.id}>
                <Comment comment={comment} />
              </li>
            ))}
          </ul>
        )}
      </CurrentUserContext.Provider>
    </main>
  );
}

export default App;
