import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOMetaProps {
  title: string;
  description: string;
  keywords?: string;
  url?: string;
  image?: string;
  type?: string;
}

export const SEOMeta: React.FC<SEOMetaProps> = ({
  title,
  description,
  keywords = "Digifox, Web Design, 3D Websites, Digital Marketing, Performance Marketing, SEO, Meta Ads, Google Ads, India",
  url = "https://digifox.world/",
  image = "https://digifox.world/image-1783146667729-137850681.webp",
  type = "website"
}) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* GEO Tags (India) - Ensure they are populated per page */}
      <meta name="geo.region" content="IN" />
      <meta name="geo.placename" content="India" />
      <meta name="geo.position" content="20.5937;78.9629" />
      <meta name="ICBM" content="20.5937, 78.9629" />
    </Helmet>
  );
};
