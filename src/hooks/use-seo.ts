import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
  type?: string;
  author?: string;
}

/**
 * useSEO Hook - Updates page meta tags for SEO
 * @param {SEOProps} seoData - SEO metadata for the page
 */
export const useSEO = (seoData: SEOProps) => {
  useEffect(() => {
    // Update title
    document.title = `${seoData.title} | Connect Sierra Leone`;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      let tag = document.querySelector(
        property ? `meta[property="${name}"]` : `meta[name="${name}"]`
      ) as HTMLMetaElement;

      if (!tag) {
        tag = document.createElement('meta');
        if (property) {
          tag.setAttribute('property', name);
        } else {
          tag.setAttribute('name', name);
        }
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    // Basic SEO meta tags
    updateMetaTag('description', seoData.description);
    
    if (seoData.keywords) {
      updateMetaTag('keywords', seoData.keywords);
    }
    
    if (seoData.author) {
      updateMetaTag('author', seoData.author);
    }

    // Open Graph meta tags
    updateMetaTag('og:title', seoData.title, true);
    updateMetaTag('og:description', seoData.description, true);
    updateMetaTag('og:type', seoData.type || 'website', true);
    
    if (seoData.ogImage) {
      updateMetaTag('og:image', seoData.ogImage, true);
    }
    
    if (seoData.ogUrl) {
      updateMetaTag('og:url', seoData.ogUrl, true);
    }

    // Twitter Card meta tags
    updateMetaTag('twitter:title', seoData.title);
    updateMetaTag('twitter:description', seoData.description);
    
    if (seoData.ogImage) {
      updateMetaTag('twitter:image', seoData.ogImage);
    }

    // Update canonical URL
    if (seoData.canonical) {
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = seoData.canonical;
    }
  }, [seoData]);
};
