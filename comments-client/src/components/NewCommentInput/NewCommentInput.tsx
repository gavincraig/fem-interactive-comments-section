import React, { useState, useContext } from 'react'
import { CurrentUserContext } from '../../context/CurrentUserContext';


type NewCommentInputProps = {
    handleAddComment: () => void;
}

const NewCommentInput = ({ handleAddComment } : NewCommentsInputProps) => {
    const currentUser = useContext(CurrentUserContext);

    const [inputValue, setInputValue] = useState('');

    const handleUpdateInput = (e) => {
        setInputValue(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddComment(inputValue);
        setInputValue('');
    }
  return (
    <form className='flex flex-col bg-white rounded-lg p-4 gap-4' onSubmit={handleSubmit}>
        <textarea className='outline-light-gray rounded-lg px-6 py-3' placeholder='Add a comment...' value={inputValue} onChange={handleUpdateInput}/>
        <div className='flex justify-between items-center'>
            <img src={`${currentUser?.image?.webp}`} width={32} height={32} alt='avatar'/>
            <button type={'submit'} className='rounded-lg bg-moderate-blue text-white font-medium px-8 py-3'>SEND</button>
        </div>
    </form>
  )
}

export default NewCommentInput;