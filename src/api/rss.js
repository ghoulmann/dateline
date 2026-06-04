export async function fetchRss(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`RSS fetch failed ${res.status} ${url}`);
      return [];
    }
    const text = await res.text();

    // crude XML item parser (works for most RSS feeds)
    const items = Array.from(text.matchAll(/<item[\s\S]*?<\/item>/gi), m => m[0]);
    return items.map(item => {
      const titleMatch = item.match(/<title>([\s\S]*?)<\/title>/i);
      const linkMatch = item.match(/<link>([\s\S]*?)<\/link>/i);
      const pubMatch = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/i);
      const title = titleMatch ? titleMatch[1].replace(/<!\[CDATA\[|\]\]>/g, '').trim() : '';
      const link = linkMatch ? linkMatch[1].trim() : '';
      const seendate = pubMatch ? new Date(pubMatch[1]).toISOString() : new Date().toISOString();
      let source_domain = '';
      try {
        source_domain = link ? new URL(link).hostname.replace(/^www\./, '') : '';
      } catch (e) {
        source_domain = '';
      }
      return { title, url: link, seendate, source_domain };
    }).filter(a => a.url && a.title);
  } catch (err) {
    console.warn('fetchRss error', err.message, url);
    return [];
  }
}

export default { fetchRss };
