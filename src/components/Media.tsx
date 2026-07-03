import React from 'react';

interface MediaProps {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const Media: React.FC<MediaProps> = ({ src, alt = "Media", className = "", style }) => {
  if (!src) return null;
  
  const isVideo = src.match(/\.(mp4|webm|mov|ogg)$/i);

  if (isVideo) {
    return (
      <video 
        src={src} 
        className={className} 
        style={style}
        autoPlay 
        loop 
        muted 
        playsInline
      />
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className={className} 
      style={style}
    />
  );
};
