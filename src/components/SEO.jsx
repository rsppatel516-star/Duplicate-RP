import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = 'website',
  ogUrl,
  twitterCard = 'summary_large_image',
  twitterTitle,
  twitterDescription,
  twitterImage,
  schema,
  noIndex = false,
}) {
  const defaultUrl = 'https://patelrudra.in';
  const defaultTitle = 'RUDRA | Digital Architect & Full-Stack Engineer';
  const defaultDesc = 'Portfolio of Rudra Patel, a Digital Architect specializing in premium web experiences, high-performance mobile apps, and robust full-stack engineering.';
  const defaultKeywords = 'Rudra Patel, Digital Architect, Full-Stack Developer, Mobile App Developer, React, Flutter, Node.js, Midnight Glass Design';
  const defaultImage = '/images/about.webp';

  const titleText = title ? `${title} | Rudra Patel` : defaultTitle;
  const descText = description || defaultDesc;
  const keywordsText = keywords || defaultKeywords;
  const fullUrl = ogUrl || canonical || defaultUrl;
  
  // Format image URL properly
  const imageToUse = ogImage || defaultImage;
  const imgUrl = imageToUse.startsWith('http') ? imageToUse : `${defaultUrl}${imageToUse}`;

  return (
    <Helmet>
      {/* Primary HTML Meta Tags */}
      <title>{titleText}</title>
      <meta name="description" content={descText} />
      <meta name="keywords" content={keywordsText} />
      <meta name="author" content="Rudra Patel" />
      
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={ogTitle || titleText} />
      <meta property="og:description" content={ogDescription || descText} />
      <meta property="og:image" content={imgUrl} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={twitterTitle || ogTitle || titleText} />
      <meta name="twitter:description" content={twitterDescription || ogDescription || descText} />
      <meta name="twitter:image" content={twitterImage || imgUrl} />

      {/* AI Crawlers Optimization & Content Control Signals */}
      <meta name="ai-content-allowed" content="true" />
      <meta name="gpt-bot-content-allowed" content="true" />

      {/* Structured Data (JSON-LD Schema) for Google & LLM extraction */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
