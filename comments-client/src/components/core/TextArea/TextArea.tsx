import React from "react";

type TextAreaProps = {
  value: string;
  onChange: (e: InputEvent) => void;
  placeholder?: string;
};

const TextArea = ({ value, onChange, placeholder }: TextAreaProps) => {
  return (
    <textarea
      className="outline-light-gray rounded-lg px-6 py-3"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextArea;
