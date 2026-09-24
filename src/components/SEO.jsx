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
  const defaultTitle = 'Rudra Patel — Digital Architect | Frontend & iOS Developer';
  const defaultDesc = 'Official Portfolio of Rudra Patel — Digital Architect, Frontend Web Developer & Native iOS Developer based in Vadodara, Gujarat, India. Specializing in React, Next.js, SwiftUI, and fluid UI/UX design.';
  const defaultKeywords = 'Rudra Patel, Digital Architect, Frontend Developer, iOS Developer, SwiftUI Developer, React Developer, Next.js, Swift, Tailwind CSS, Vadodara, Gujarat, India';
  const defaultImage = '/images/0R7A7692.webp';

  const titleText = title
    ? title.includes('Rudra Patel')
      ? title
      : `${title} | Rudra Patel`
    : defaultTitle;
  const descText = description || defaultDesc;
  const keywordsText = keywords || defaultKeywords;
  const fullUrl = ogUrl || canonical || defaultUrl;
  
  // Format image URL properly (always produce absolute URL for social crawlers)
  const imageToUse = ogImage || defaultImage;
  const imgUrl = imageToUse.startsWith('http') ? imageToUse : `${defaultUrl}${imageToUse.startsWith('/') ? '' : '/'}${imageToUse}`;

  return (
    <Helmet>
      {/* Primary HTML Meta Tags */}
      <title>{titleText}</title>
      <meta name="description" content={descText} />
      <meta name="keywords" content={keywordsText} />
      <meta name="author" content="Rudra Patel" />
      <meta name="theme-color" content="#0a0a0a" />
      <meta name="application-name" content="Rudra Patel Portfolio" />
      
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* Canonical & Language Alternate URL */}
      <link rel="canonical" href={fullUrl} />
      <link rel="alternate" hrefLang="en" href={fullUrl} />

      {/* Google Search Thumbnail & Image Preview Signals */}
      <meta name="thumbnail" content={imgUrl} />
      <link rel="image_src" href={imgUrl} />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Rudra Patel Portfolio" />
      <meta property="og:title" content={ogTitle || titleText} />
      <meta property="og:description" content={ogDescription || descText} />
      <meta property="og:image" content={imgUrl} />
      <meta property="og:image:secure_url" content={imgUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={twitterTitle || ogTitle || titleText} />
      <meta name="twitter:description" content={twitterDescription || ogDescription || descText} />
      <meta name="twitter:image" content={twitterImage || imgUrl} />
      <meta name="twitter:creator" content="@rudraa_ptll" />

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
