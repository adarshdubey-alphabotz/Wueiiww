import React from 'react';

const JsonLd: React.FC = () => (
  <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Xtratoon",
          "url": "https://inkstone-glass.lovable.app",
          "description": "Premium manhwa & manga publishing and reading platform. Discover, read, and publish stunning webtoons.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://inkstone-glass.lovable.app/browse?q={search_term_string}",
            "query-input": "required name=search_term_string"
          },
          "sameAs": [
            "https://instagram.com/XtraToon.global",
            "https://x.com/Xtratoonglobal"
          ]
        })
      }}
    />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Xtratoon",
          "url": "https://inkstone-glass.lovable.app",
          "logo": "https://inkstone-glass.lovable.app/favicon.ico",
          "sameAs": [
            "https://instagram.com/XtraToon.global",
            "https://x.com/Xtratoonglobal"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer support",
            "url": "https://inkstone-glass.lovable.app"
          }
        })
      }}
    />
  </>
);

export default JsonLd;
