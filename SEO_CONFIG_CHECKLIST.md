# SEO Configuration Checklist

## 🚨 IMPORTANT: Update These Values

Before deploying, update the following:

### 1. **Domain URLs** (All files referencing domain)
Replace `connect-sierraleone.com` with your actual domain in:
- [x] `index.html` - Meta tags and structured data
- [x] `public/sitemap.xml` - All URLs
- [x] `public/robots.txt` - Sitemap URL
- [ ] `src/hooks/use-seo.ts` - Canonical URLs if using domain template
- [ ] All page components using `useSEO` hook

**Current placeholder**: `https://connect-sierraleone.com`
**Update to**: `https://youractual domain.com`

---

### 2. **Organization Information** (index.html)

Update the JSON-LD schema with real information:

```json
{
  "name": "Connect Sierra Leone",  // Your company name
  "url": "https://yourdomain.com",  // Your domain
  "logo": "https://yourdomain.com/logo.png",  // Your logo
  "sameAs": [
    "https://www.facebook.com/yourpage",  // Update social links
    "https://www.twitter.com/yourhandle",
    "https://www.linkedin.com/company/yourcompany"
  ],
  "contactPoint": {
    "contactType": "Sales",
    "telephone": "+232-your-number",  // Update phone
    "email": "info@yourdomain.com"  // Update email
  },
  "address": {
    "addressCountry": "SL"  // Keep as Sierra Leone
  }
}
```

---

### 3. **Open Graph Image**
- [ ] Create an attractive og-image.png (1200x630px)
- [ ] Upload to `/public/og-image.png`
- [ ] Update og:image URLs in index.html if different path

**Recommended dimensions**: 1200x630 pixels
**File format**: PNG or JPG
**File size**: Keep under 100KB

---

### 4. **Favicon**
- [ ] Ensure favicon.ico exists in `/public/`
- [ ] Create multiple sizes for different devices:
  - favicon.ico (32x32)
  - apple-touch-icon.png (180x180)

---

### 5. **Social Media Links**
Update in index.html JSON-LD schema:
- [ ] Facebook page URL
- [ ] Twitter/X handle
- [ ] LinkedIn company page
- [ ] Instagram (add if needed)

---

### 6. **Contact Information**
Update in index.html:
- [ ] Email address
- [ ] Phone number (format: +232-XXXX-XXXX)
- [ ] Physical address
- [ ] Business hours

---

### 7. **Google Search Console**
- [ ] Create/verify property at https://search.google.com/search-console
- [ ] Add property for your domain
- [ ] Submit sitemap: `https://yourdomain.com/sitemap.xml`
- [ ] Verify using HTML file or DNS method
- [ ] Monitor indexing status
- [ ] Check for any errors or warnings

**Expected**: 20+ indexed pages within 2 weeks

---

### 8. **Bing Webmaster Tools**
- [ ] Create account at https://www.bing.com/webmasters
- [ ] Add your site
- [ ] Submit sitemap
- [ ] Monitor indexing

---

### 9. **Google Business Profile** (Local SEO)
- [ ] Create at https://www.google.com/business/
- [ ] Add location in Freetown/Sierra Leone
- [ ] Add business category: "Web Design Service"
- [ ] Add photos and description
- [ ] Verify by phone or mail
- [ ] Add opening hours

---

### 10. **Analytics & Tracking** (Recommended)

Add Google Analytics 4 to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-YOUR_GA4_ID');
</script>
```

Steps:
- [ ] Create Google Analytics 4 property
- [ ] Get measurement ID (format: G-XXXXXXXXXX)
- [ ] Add code to index.html
- [ ] Verify tracking is working

---

### 11. **Sitemap Update** (Update periodically)

When you add new pages:
1. Add entry to `public/sitemap.xml`
2. Format:
```xml
<url>
  <loc>https://yourdomain.com/new-page</loc>
  <lastmod>2026-01-30</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```
3. Resubmit to Google Search Console

---

### 12. **Schema Markup Validation**

Test your schema at:
- [ ] https://schema.org/validator/ (JSON-LD test)
- [ ] https://www.google.com/webmasters/markup-helper/
- [ ] https://validator.schema.org/

---

### 13. **Mobile Optimization**

Test at:
- [ ] https://search.google.com/test/mobile-friendly
- [ ] https://pagespeed.web.dev/

Target metrics:
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1

---

### 14. **SSL Certificate**

- [ ] Ensure site uses HTTPS (https://yourdomain.com)
- [ ] Install SSL certificate if not already done
- [ ] Redirect HTTP to HTTPS
- [ ] Update all absolute URLs to use HTTPS

---

## ✅ Deployment Checklist

Before going live:
- [ ] All URLs updated to real domain
- [ ] Contact information updated
- [ ] Social media links added
- [ ] Open Graph image created
- [ ] Favicon files created
- [ ] Google Analytics ID added
- [ ] SSL certificate installed
- [ ] Sitemap valid and submitted
- [ ] robots.txt accessible
- [ ] All pages have SEO meta tags
- [ ] Test all pages for indexability

---

## 📅 Post-Launch Tasks (First Week)

- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing
- [ ] Create Google Business Profile
- [ ] Add Google Analytics
- [ ] Request links from Sierra Leone directories
- [ ] Announce on social media
- [ ] Monitor Search Console daily

---

## 📅 Ongoing SEO Maintenance

**Weekly:**
- Check Google Search Console for crawl errors
- Monitor search queries and CTR

**Monthly:**
- Publish new blog content
- Update meta descriptions for low-CTR pages
- Build internal links to important pages
- Analyze search analytics

**Quarterly:**
- Audit core pages for SEO
- Update outdated content
- Build external backlinks
- Analyze competitor keywords

---

## 🔗 Important Links

- **Google Search Console**: https://search.google.com/search-console
- **Bing Webmaster Tools**: https://www.bing.com/webmasters
- **Google Analytics**: https://analytics.google.com/
- **Google Business**: https://www.google.com/business/
- **Lighthouse**: https://developers.google.com/web/tools/lighthouse
- **Schema Validator**: https://schema.org/validator/

---

**Status**: ⏳ Awaiting Domain & Configuration Updates
**Priority**: 🔴 CRITICAL - Complete before launch
