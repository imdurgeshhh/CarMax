import React, { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 240;
const BATCH_SIZE = 30;

function ScrollAnimation() {
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const imagesRef = useRef(new Array(TOTAL_FRAMES).fill(null));
  const currentFrameRef = useRef(0);
  const rafIdRef = useRef(null);
  const [initialBatchLoaded, setInitialBatchLoaded] = useState(false);

  // Build frame filename: ezgif-frame-001.jpg ... ezgif-frame-240.jpg
  const getFrameSrc = (index) => {
    const frameNumber = index + 1; // 1-based
    const padded = String(frameNumber).padStart(3, '0');
    return `/frame/ezgif-frame-${padded}.jpg`;
  };

  // Draw a specific frame on the canvas with object-fit: cover behavior
  const drawFrame = (frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = imagesRef.current[frameIndex];
    if (!img) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Object-fit: cover — scale to fill, crop overflow
    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;

    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh);
  };

  // Preload images in batches
  useEffect(() => {
    let cancelled = false;

    const loadImage = (index) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = getFrameSrc(index);
        img.onload = () => {
          if (!cancelled) {
            // Use decode() for faster rendering if available
            if (img.decode) {
              img.decode().then(() => {
                imagesRef.current[index] = img;
                resolve();
              }).catch(() => {
                imagesRef.current[index] = img;
                resolve();
              });
            } else {
              imagesRef.current[index] = img;
              resolve();
            }
          } else {
            resolve();
          }
        };
        img.onerror = () => resolve(); // Skip broken frames
      });
    };

    const preload = async () => {
      // Batch 1: Load first BATCH_SIZE frames immediately
      const firstBatch = [];
      for (let i = 0; i < Math.min(BATCH_SIZE, TOTAL_FRAMES); i++) {
        firstBatch.push(loadImage(i));
      }
      await Promise.all(firstBatch);

      if (!cancelled) {
        setInitialBatchLoaded(true);

        // Draw first frame as soon as initial batch is ready
        if (canvasRef.current) {
          canvasRef.current.width = window.innerWidth;
          canvasRef.current.height = window.innerHeight;
          drawFrame(0);
        }
      }

      // Remaining batches in background
      for (let start = BATCH_SIZE; start < TOTAL_FRAMES; start += BATCH_SIZE) {
        if (cancelled) break;
        const batch = [];
        for (let i = start; i < Math.min(start + BATCH_SIZE, TOTAL_FRAMES); i++) {
          batch.push(loadImage(i));
        }
        await Promise.all(batch);
      }
    };

    preload();

    return () => {
      cancelled = true;
    };
  }, []);

  // Canvas resize handler
  useEffect(() => {
    if (!initialBatchLoaded) return;

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrameRef.current);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initialBatchLoaded]);

  // Scroll-driven frame animation
  useEffect(() => {
    if (!initialBatchLoaded) return;

    const handleScroll = () => {
      // Cancel previous rAF to avoid stacking
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }

      rafIdRef.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY || window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;

        if (docHeight <= 0) return;

        const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);
        const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * TOTAL_FRAMES));

        // Only redraw if frame changed and image is loaded
        if (frameIndex !== currentFrameRef.current && imagesRef.current[frameIndex]) {
          currentFrameRef.current = frameIndex;
          drawFrame(frameIndex);
        }
      });
    };

    // Draw initial frame
    drawFrame(0);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [initialBatchLoaded]);

  return (
    <>
      {/* Loading spinner — shown until first batch is ready */}
      {!initialBatchLoaded && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: '#0a0a0a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              border: '3px solid rgba(255,255,255,0.15)',
              borderTopColor: 'rgba(255,255,255,0.8)',
              borderRadius: '50%',
              animation: 'scrollAnimSpin 0.8s linear infinite',
            }}
          />
          <style>{`
            @keyframes scrollAnimSpin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}

      {/* Fixed background canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          display: 'block',
          background: '#0a0a0a',
          pointerEvents: 'none',
        }}
      />

      {/* Dark overlay for content readability */}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.40)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
    </>
  );
}

export default ScrollAnimation;
