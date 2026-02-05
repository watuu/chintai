/**
 * トップページ「お知らせ」を microCMS API から CSR で取得して #news-list に描画
 * microcms-js-sdk 使用。環境変数はGETだけなので問題ない(https://help.microcms.io/ja/knowledge/hide-api-key)
 */
import { createClient } from 'microcms-js-sdk';

// 一旦ベタ打ち（要差し替え）
const MICROCMS_SERVICE_DOMAIN = 'chintai-corp';
const MICROCMS_API_KEY = 'jzC7bvBzNMtpvFyudpv193xYl0rvGRfJGixP';
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatDate(publishedAt) {
  if (!publishedAt) return '';
  const d = new Date(publishedAt);
  return (
    d.getFullYear() +
    '.' +
    String(d.getMonth() + 1).padStart(2, '0') +
    '.' +
    String(d.getDate()).padStart(2, '0')
  );
}

function renderCards(listEl, contents, newsPath) {
  (contents || []).forEach((item) => {
    const date = formatDate(item.publishedAt);
    const cat = item.category;
    const catName =
      typeof cat === 'string' ? cat : (cat && (cat.name || cat.id)) || '';
    const catColor =
      cat && typeof cat === 'object' && cat.color ? cat.color : '#7EBEAF';
    const detailUrl = newsPath + (item.slug || item.id);
    const pdfUrl = (item.pdf && item.pdf.url) || item.pdfurl || '';
    const card = document.createElement('div');
    card.className = 'c-card-news';
    card.innerHTML =
      '<div class="c-card-news__wrap">' +
      (date ? '<p class="c-card-news__date">' + date + '</p>' : '') +
      (catName
        ? '<p class="c-card-news__category"><span class="c-card-news__label" style="background:' +
          catColor +
          ';"></span><span>' +
          escapeHtml(catName) +
          '</span></p>'
        : '') +
      '<p class="c-card-news__title">' +
      '<a href="' +
      detailUrl +
      '" class="c-card-news__link">' +
      escapeHtml(item.title || '') +
      '</a>' +
      (pdfUrl
        ? '<span class="c-card-news__pdf"><a href="' +
          pdfUrl +
          '" target="_blank" rel="noopener"><span>PDF</span><svg width="13" height="13" aria-hidden="true"><use href="#ico-external-sm"></use></svg></a></span>'
        : '') +
      '</p></div>';
    listEl.appendChild(card);
  });
}

function renderNewsList() {
  const listEl = document.getElementById('news-list');
  if (!listEl) return;

  const newsPath = listEl.getAttribute('data-news-path') || '/news/';

  const client = createClient({
    serviceDomain: MICROCMS_SERVICE_DOMAIN,
    apiKey: MICROCMS_API_KEY,
  });

  client
    .getList({
      endpoint: 'news',
      queries: { limit: 6, orders: '-publishedAt' },
    })
    .then((res) => {
      const contents = res.contents || [];
      renderCards(listEl, contents, newsPath);
    })
    .catch(() => {});
}

export default function initTopNews() {
  if (document.getElementById('news-list')) {
    renderNewsList();
  }
}
