import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
// Imagery
import look1 from '../../assets/collage/look1.jpg';
import look2 from '../../assets/collage/look2.jpg';
import look3 from '../../assets/collage/look3.jpg';
import look4 from '../../assets/collage/look4.jpg';
import look5 from '../../assets/collage/look5.jpg';
import look6 from '../../assets/collage/look6.jpg';
import look7 from '../../assets/collage/look7.jpg';
import look8 from '../../assets/collage/look8.jpg';

const images = [look1, look2, look3, look4, look5, look6, look7, look8];

const Strip = styled.div`
  display: flex;
  gap: 24px;
  overflow-x: auto;
  padding-bottom: 12px;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome */
  }
`;

const Slide = styled(motion.div)`
  flex: 0 0 80vw;
  max-width: 600px;
  scroll-snap-align: start;
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  @media (min-width: 768px) {
    flex: 0 0 45vw;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const PlayOverlay = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.55);
  border: none;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
  &::before {
    content: "";
    display: block;
    width: 0;
    height: 0;
    border-top: 12px solid transparent;
    border-bottom: 12px solid transparent;
    border-left: 18px solid #fff;
    margin-left: 4px;
  }
`;

// Modal elements
const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const VideoFrame = styled(motion.div)`
  width: 90%;
  max-width: 800px;
  aspect-ratio: 16/9;
  background: #000;
  border-radius: 12px;
  overflow: hidden;
  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

function LookbookStrip() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      <Strip>
        {images.map((src, idx) => (
          <Slide
            key={src}
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <Img src={src} alt={`Positive Vibe Tribe look ${idx + 1}`} loading="lazy" />
            {idx === 0 && (
              <PlayOverlay onClick={() => setShowVideo(true)} aria-label="Play behind the scenes video" />
            )}
          </Slide>
        ))}
      </Strip>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <Backdrop
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowVideo(false)}
          >
            <VideoFrame
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src="https://www.youtube.com/embed/sASjfNI_lD0?autoplay=1&mute=1"
                title="Positive Vibe Tribe behind the scenes"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </VideoFrame>
          </Backdrop>
        )}
      </AnimatePresence>
    </>
  );
}

export default LookbookStrip; 