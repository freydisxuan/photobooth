import React, { useEffect, useRef, useState } from 'react';

const PreviewPage: React.FC = () => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [frameColor, setFrameColor] = useState('#FFFFFF'); 
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const storedPhotos = localStorage.getItem('photos');
    if (storedPhotos) {
      setPhotos(JSON.parse(storedPhotos));
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || photos.length === 0) return;
  
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
  
    const spacing = 20;
    const stripWidth = 600;
    const photoDisplayWidth = stripWidth - spacing * 2;
  
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;
  
    photos.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        images[index] = img;
        loadedCount++;
        if (loadedCount === photos.length) {
          const heights = images.map(img => photoDisplayWidth / (img.width / img.height));
          const photoTotalHeight = heights.reduce((acc, h) => acc + h, 0);
          const totalSpacing = spacing * (photos.length + 1);
          const timestampHeight = 40;
          const stripHeight = photoTotalHeight + totalSpacing + timestampHeight;
  
          canvas.width = stripWidth;
          canvas.height = stripHeight;
  
          ctx.imageSmoothingEnabled = true;
          ctx.fillStyle = frameColor;
          ctx.fillRect(0, 0, stripWidth, stripHeight);
  
          let y = spacing;
          images.forEach((img, i) => {
            const height = heights[i];
            ctx.drawImage(img, spacing, y, photoDisplayWidth, height);
            y += height + spacing;
          });
  
          const timestamp = `Photobooth - ${new Date().toLocaleString()}`;
          ctx.fillStyle = '#000';
          ctx.font = '24px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(timestamp, stripWidth / 2, stripHeight - 15);
        }
      };
    });
  }, [photos, frameColor]);
  
  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'photo-strip.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-3xl font-bold mb-6">Photo Strip Preview</h1>

      <div className="max-h-[80vh] overflow-auto">
  <canvas
    ref={canvasRef}
    className="shadow-xl mb-6 border-[12px]"
    style={{
      borderColor: frameColor,
      width: '200px',
      height: 'auto',
    }}
  />
</div>


      <div className="mb-4">
        <label className="mr-2 font-medium">Frame Color:</label>
        <input
          type="color"
          value={frameColor}
          onChange={(e) => setFrameColor(e.target.value)}
          className="border rounded"
        />
      </div>

      <button
        onClick={downloadImage}
        className="border-2 border-black bg-white px-6 py-2 rounded-full hover:bg-pink-200 transition"
      >
        Download
      </button>
    </div>
  );
};

export default PreviewPage;
