import React, { useState } from "react";

type ScoreCounterProps = {
  initialScore: number;
  isDisabled?: boolean;
};

const ScoreCounter = ({ initialScore, isDisabled }: ScoreCounterProps) => {
  const [score, setScore] = useState(initialScore);

  const handleUpvote = () => setScore((score) => score + 1);
  const handleDownvote = () => setScore((score) => score - 1);

  type VoteButtonProps = { isUpvoteVariant?: boolean };
  const VoteButton = ({ isUpvoteVariant }: VoteButtonProps) => {
    const iconSrc = isUpvoteVariant
      ? "images/icon-plus.svg"
      : "images/icon-minus.svg";
    return (
      <button
        aria-label={`${isUpvoteVariant ? "Up vote" : "Down vote"} comment`}
        onClick={isUpvoteVariant ? handleUpvote : handleDownvote}
        disabled={
          isDisabled ||
          (isUpvoteVariant ? score > initialScore : score < initialScore)
        }
        className="px-4 py-2 text-light-grayish-blue disabled:opacity-25"
      >
        <img src={iconSrc} alt="" />
      </button>
    );
  };

  return (
    <div className="flex items-center gap-1 rounded-lg bg-very-light-gray py-2">
      <VoteButton isUpvoteVariant />
      <span className="text-moderate-blue font-medium">{score}</span>
      <VoteButton />
    </div>
  );
};

export default ScoreCounter;
