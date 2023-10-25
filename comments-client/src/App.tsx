import React, { useState, useEffect } from "react";
import { Comment as CommentType, User } from "./types";
import { Comment } from "./components/Comment";

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
    <main>
      {comments.length > 0 && (
        <ul className="flex-col gap-4">
          {comments.map((comment) => (
            <li key={comment.id}>
              <Comment comment={comment} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;
