import React, { useState, useContext } from "react";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { TextArea } from "../core/TextArea";

type NewCommentInputProps = {
  submitCallback: () => void;
  placeholder?: string;
};

const NewCommentInput = ({
  submitCallback,
  placeholder = "Add a comment...",
}: NewCommentInputProps) => {
  const currentUser = useContext(CurrentUserContext);

  const [inputValue, setInputValue] = useState("");

  const handleUpdateInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitCallback(inputValue);
    setInputValue("");
  };
  return (
    <form
      className="flex flex-col bg-white rounded-lg p-4 gap-4"
      onSubmit={handleSubmit}
    >
      <TextArea
        placeholder={placeholder}
        value={inputValue}
        onChange={handleUpdateInput}
      />
      <div className="flex justify-between items-center">
        <img
          src={`${currentUser?.image?.webp}`}
          width={32}
          height={32}
          alt="avatar"
        />
        <button
          type={"submit"}
          className="rounded-lg bg-moderate-blue text-white font-medium px-8 py-3 hover:bg-light-grayish-blue"
        >
          SEND
        </button>
      </div>
    </form>
  );
};

export default NewCommentInput;
