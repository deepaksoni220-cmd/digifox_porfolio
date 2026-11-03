import React from 'react';

interface MediaProps {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
}

export const Media: React.FC<MediaProps> = ({ 
  src, 
  alt = "Media", 
  className = "", 
  style,
  loading = "lazy",
  fetchPriority
}) => {
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
        preload="metadata"
      />
    );
  }

  return (
    <img 
      src={src} 
      alt={alt} 
      className={className} 
      style={style}
      loading={loading}
      decoding="async"
      // @ts-expect-error fetchpriority standard attribute support
      fetchpriority={fetchPriority}
    />
  );
};
