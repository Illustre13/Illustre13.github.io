import React, { useState, useEffect } from "react";

type WordFlickProps = {
  words: string[];
  speed?: number;
  pauseDuration?: number;
};

const WordFlick: React.FC<WordFlickProps> = ({
  words,
  speed = 100, // Typing speed in ms
  pauseDuration = 1500, // Pause duration between words
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const handleTyping = () => {
      const currentWord = words[currentWordIndex];
      //   const updateSpeed = isDeleting ? speed / 2 : speed;

      if (isDeleting) {
        if (currentLetterIndex > 0) {
          setDisplayText(currentWord.slice(0, currentLetterIndex - 1));
          setCurrentLetterIndex(currentLetterIndex - 1);
        } else {
          // When fully deleted, switch to the next word immediately
          setIsDeleting(false);
          setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
          setIsPaused(true);
          setTimeout(() => {
            setIsPaused(false);
          }, pauseDuration);
        }
      } else {
        if (currentLetterIndex < currentWord.length) {
          setDisplayText(currentWord.slice(0, currentLetterIndex + 1));
          setCurrentLetterIndex(currentLetterIndex + 1);
        } else {
          // Word fully typed, now we wait and then start deleting
          setIsPaused(true);
          setTimeout(() => {
            setIsDeleting(true);
            setIsPaused(false);
          }, pauseDuration);
        }
      }
    };

    const typingInterval = setTimeout(handleTyping, speed);

    // Cleanup interval on unmount
    return () => clearTimeout(typingInterval);
  }, [
    currentLetterIndex,
    isDeleting,
    currentWordIndex,
    words,
    speed,
    pauseDuration,
    isPaused,
  ]);

  return (
    <span>{displayText}|</span> // Add "|" to mimic the cursor
  );
};

export default WordFlick;
