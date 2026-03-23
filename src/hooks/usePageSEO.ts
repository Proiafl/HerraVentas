import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: 'website' | 'product';
  ogImage?: string;
  noIndex?: boolean;
  schema?: object;
}

const BASE_URL = 'https://www.herraventas.com.ar';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;

export function usePageSEO({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
  schema,
}: SEOProps) {
  useEffect(() => {
    // ── Title ──────────────────────────────────────────────────
    document.title = title;

    // ── Helper: upsert <meta> by attribute ────────────────────
    const setMeta = (attr: string, value: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${value}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, value);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // ── Helper: upsert <link> ──────────────────────────────────
    const setLink = (rel: string, href: string) => {
      let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // ── Primary SEO ────────────────────────────────────────────
    setMeta('name', 'description', description);
    setMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    // ── Canonical ──────────────────────────────────────────────
    if (canonical) {
      setLink('canonical', `${BASE_URL}${canonical}`);
    }

    // ── Open Graph ─────────────────────────────────────────────
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:image', ogImage);
    if (canonical) setMeta('property', 'og:url', `${BASE_URL}${canonical}`);

    // ── Twitter ────────────────────────────────────────────────
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);

    // ── JSON-LD Schema ─────────────────────────────────────────
    const SCHEMA_ID = '__page_schema__';
    if (schema) {
      let scriptEl = document.getElementById(SCHEMA_ID) as HTMLScriptElement | null;
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = SCHEMA_ID;
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(schema);
    } else {
      const existing = document.getElementById(SCHEMA_ID);
      if (existing) existing.remove();
    }
  }, [title, description, canonical, ogType, ogImage, noIndex, schema]);
}
