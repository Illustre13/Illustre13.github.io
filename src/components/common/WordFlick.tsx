import React, { useState, useEffect } from 'react';

interface WordFlickProps {
  words: string[];
  speed?: number;
  pauseDuration?: number;
}

const WordFlick: React.FC<WordFlickProps> = ({ 
  words, 
  speed = 100, 
  pauseDuration = 2000 
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, speed, pauseDuration]);

  return (
    <span className="typing-animation">
      {currentText}
      <span className="cursor animate-pulse">|</span>
    </span>
  );
};

export default WordFlick;
