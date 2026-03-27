simport { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

const BASE_URL = "https://www.reporoom.site";
const DEFAULT_IMAGE = `${BASE_URL}/assets/img1%20(2).png`;

const setMeta = (selector: string, attr: string, value: string) => {
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    const [attrName, attrVal] = selector.replace("meta[", "").replace("]", "").split("=");
    el.setAttribute(attrName.trim(), attrVal.replace(/['"]/g, "").trim());
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
};

const useSEO = ({ title, description, path = "/", image = DEFAULT_IMAGE }: SEOProps) => {
  useEffect(() => {
    const fullTitle = `${title} — RepoRoom`;
    const url = `${BASE_URL}${path}`;

    document.title = fullTitle;

    setMeta("meta[name='description']", "content", description);
    setMeta("link[rel='canonical']" as never, "href", url);

    // Open Graph
    setMeta("meta[property='og:title']", "content", fullTitle);
    setMeta("meta[property='og:description']", "content", description);
    setMeta("meta[property='og:url']", "content", url);
    setMeta("meta[property='og:image']", "content", image);

    // Twitter
    setMeta("meta[name='twitter:title']", "content", fullTitle);
    setMeta("meta[name='twitter:description']", "content", description);
    setMeta("meta[name='twitter:image']", "content", image);

    // Restore canonical link (it's a <link> not <meta>)
    let canonical = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [title, description, path, image]);
};

export default useSEO;
