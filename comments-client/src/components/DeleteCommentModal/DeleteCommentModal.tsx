import React from "react";
import { Modal } from "../Modal";

type DeleteCommentModalProps = {
  closeModal: () => void;
  handleDeleteComment: () => void;
};
const DeleteCommentModal = ({
  closeModal,
  handleDeleteComment,
}: DeleteCommentModalProps) => {
  return (
    <Modal title={"Delete comment"} closeModal={closeModal}>
      <p className="text-grayish-blue">
        Are you sure you want to delete this comment? This will remove the
        comment and can’t be undone.
      </p>
      <div className="flex gap-3">
        <button
          className="bg-grayish-blue text-white font-medium flex-1 rounded-lg py-3"
          onClick={closeModal}
        >
          NO, CANCEL
        </button>
        <button
          className="bg-soft-red text-white font-medium flex-1 rounded-lg py-3"
          onClick={handleDeleteComment}
        >
          YES, DELETE
        </button>
      </div>
    </Modal>
  );
};

export default DeleteCommentModal;
