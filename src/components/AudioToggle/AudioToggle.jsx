import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const flute = 'https://res.cloudinary.com/dhm8ttqnk/video/upload/v1750431736/kokopelli.mp4_eepuys.mp4';

const Button = styled(motion.button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(255,255,255,0.8);
  border: none;
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 14px rgba(0,0,0,0.15);
  cursor: pointer;
  z-index: 120;
`;

function AudioToggle() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(flute);
      audioRef.current.loop = true;
      audioRef.current.volume = 0;
    }
    const stored = localStorage.getItem('pvtaudio');
    if (stored === 'on') {
      toggle(true);
    }
    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggle = (forcePlay) => {
    const newPlay = forcePlay !== undefined ? forcePlay : !playing;
    setPlaying(newPlay);
    if (newPlay) {
      audioRef.current.play();
      audioRef.current.volume = 0;
      const fade = setInterval(() => {
        if (audioRef.current.volume < 0.12) {
          audioRef.current.volume += 0.01;
        } else {
          clearInterval(fade);
        }
      }, 200);
      localStorage.setItem('pvtaudio', 'on');
    } else {
      const fadeOut = setInterval(() => {
        if (audioRef.current.volume > 0.01) {
          audioRef.current.volume -= 0.01;
        } else {
          clearInterval(fadeOut);
          audioRef.current.pause();
        }
      }, 200);
      localStorage.setItem('pvtaudio', 'off');
    }
  };

  return (
    <Button
      aria-label={playing ? 'Mute ambient flute' : 'Play ambient flute'}
      onClick={() => toggle()}
      whileTap={{ scale: 0.9 }}
    >
      {playing ? '🔇' : '🔈'}
    </Button>
  );
}

export default AudioToggle; 
