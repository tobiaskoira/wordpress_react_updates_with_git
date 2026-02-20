import React, { useEffect, useState } from "react";

function getSlugFromUrl() {
  // для /about/ вернёт "about"
  const path = window.location.pathname.replace(/\/+$/, ""); // убрать слэш в конце
  const parts = path.split("/").filter(Boolean);
  return parts.length ? parts[parts.length - 1] : ""; // пусто = главная
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function fetchPageBySlug(slug) {
  // slug пустой = главная (обычно нет нужды строить крошки)
  const data = await fetchJson(`/wp-json/wp/v2/pages?slug=${encodeURIComponent(slug)}&_fields=id,title,link,parent`);
  return data?.[0] || null;
}

async function fetchPageById(id) {
  return fetchJson(`/wp-json/wp/v2/pages/${id}?_fields=id,title,link,parent`);
}

export default function Breadcrumbs() {
  const [crumbs, setCrumbs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const slug = getSlugFromUrl();

        // Если главная — можно не показывать breadcrumbs
        // if (!slug) {
        //   if (!cancelled) setCrumbs([]);
        //   return;
        // }

        const page = await fetchPageBySlug(slug);

        // Если это не страница — можно расширить на посты/категории
        if (!page) {
          if (!cancelled) setCrumbs([{ title: document.title, url: "", current: true }]);
          return;
        }

        // Собираем родителей
        const chain = [];
        let cur = page;

        // сначала наберём всех родителей в массив (снизу вверх)
        while (cur?.parent) {
          const parent = await fetchPageById(cur.parent);
          chain.push({ title: parent.title.rendered, url: parent.link, current: false });
          cur = parent;
        }

        // chain сейчас от ближайшего родителя к корню — разворачиваем
        chain.reverse();

        // добавляем текущую страницу
        chain.push({ title: page.title.rendered, url: "", current: true });

        if (!cancelled) setCrumbs(chain);
      } catch (e) {
        if (!cancelled) setCrumbs([{ title: document.title, url: "", current: true }]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return null;
  if (!crumbs.length) return null;

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
      <a href="#" className="inline-flex items-center text-sm font-medium text-body hover:text-fg-brand">
        <svg className="w-4 h-4 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"/></svg>
        Home
      </a>
        </li>

        {crumbs.map((c, idx) => (
          <li key={idx} aria-current={c.current ? "page" : undefined}>
            <div className="flex items-center space-x-1.5">
              <span className="text-body"><svg className="w-3.5 h-3.5 rtl:rotate-180 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"></path></svg></span>

              {c.current ? (
                <span className="inline-flex items-center text-sm font-medium text-body-subtle">
                  <span dangerouslySetInnerHTML={{ __html: c.title }} />
                </span>
              ) : (
                <a
                  href={c.url}
                  className="inline-flex items-center text-sm font-medium text-body hover:text-fg-brand"
                  dangerouslySetInnerHTML={{ __html: c.title }}
                />
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}
