import React from "react";

type ModalProps = {
  title: string;
  closeModal: () => void;
  children: React.ReactNode;
};

const Modal = ({ title, closeModal, children }: ModalProps) => {

  const handleChildClick = (e) => {
    e.stopPropagation();
  }

  return (
    <div
      className="z-10 bg-opacity-50 bg-black absolute left-0 top-0 px-4 w-full h-full flex items-center justify-center"
      onClick={closeModal}
    >
      <div className="bg-white py-6 px-7 rounded-lg w-full flex flex-col gap-4 z-20" onClick={handleChildClick}>
        <h2 className="text-xl font-medium">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;
