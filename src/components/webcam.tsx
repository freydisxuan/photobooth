import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { useRouter } from 'next/router';
import Countdown from './countdown';

const WebcamCapture: React.FC = () => {
  const webcamRef = useRef<Webcam | null>(null);
  const router = useRouter();

  const [capturing, setCapturing] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const [currentShot, setCurrentShot] = useState(0);

  const startCapture = () => {
    setCapturing(true);
    setCurrentShot(0);
    setPhotos([]);
    setShowCountdown(true); 
  };

  const handleRestart = () => {
    setCapturing(false);
    setShowCountdown(false);
    localStorage.removeItem('photos');
  };

  useEffect(() => {
    if (!capturing || showCountdown) return;
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setPhotos((prev) => [...prev, imageSrc]);
    }

    if (currentShot < 3) {
  
      setTimeout(() => {
        setCurrentShot((prev) => prev + 1);
        setShowCountdown(true); 
      }, 500); 
    } else {
 
      setCapturing(false);
      localStorage.setItem('photos', JSON.stringify([...photos, imageSrc || '']));
      router.push('/preview');
    }
  }, [showCountdown]);

  return (
    <div className="inline-block p-2 bg-white border-4 border-white rounded shadow-md">
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={400}
        videoConstraints={{ facingMode: 'user' }}
        className="rounded"
        style={{ transform: 'scaleX(-1)' }}
      />
      {capturing && showCountdown && (
        <Countdown start={3} onComplete={() => setShowCountdown(false)} />
      )}

      <button onClick={startCapture} disabled={capturing}>
        {capturing ? 'Capturing...' : 'Start Capture :)'}
      </button>

      <button
      onClick={handleRestart}
      style={{
        marginTop: '0.5rem',
        border: '2px solid black',
        background: 'white',
        padding: '0.5rem 1rem',
        borderRadius: '20px',
        cursor: 'pointer',
      }}
    >
      Restart
    </button>

    </div>
  );
};

export default WebcamCapture;
