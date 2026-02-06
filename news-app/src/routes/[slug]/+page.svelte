<script>
  import { dev } from '$app/environment';
  import { base } from '$app/paths';
  import { env } from '$env/dynamic/public';
  import { getSiteOrigin } from '$lib/site-origin.js';

  /** @type {import('./$types').PageData} */
  let { data } = $props();

  const siteOrigin = getSiteOrigin(env, dev);

  const item = $derived(data.item);
  /** content または body があるか（一覧ページと同じ判定） */
  function hasContent(entry) {
    if (!entry) return false;
    return (entry.content != null && entry.content !== '') || (entry.body != null && entry.body !== '');
  }
  const prevLinkUrl = $derived(
    data.prev
      ? hasContent(data.prev)
        ? base + '/' + (data.prev.slug ?? data.prev.id)
        : (data.prev.pdf?.url ?? data.prev.externalLink ?? base + '/' + (data.prev.slug ?? data.prev.id))
      : '#'
  );
  const prevIsPdf = $derived(data.prev && !hasContent(data.prev) && !!(data.prev.pdf?.url ?? data.prev.externalLink));
  const nextLinkUrl = $derived(
    data.next
      ? hasContent(data.next)
        ? base + '/' + (data.next.slug ?? data.next.id)
        : (data.next.pdf?.url ?? data.next.externalLink ?? base + '/' + (data.next.slug ?? data.next.id))
      : '#'
  );
  const nextIsPdf = $derived(data.next && !hasContent(data.next) && !!(data.next.pdf?.url ?? data.next.externalLink));
  const published = $derived(
    item.publishedAt
      ? new Date(item.publishedAt).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.')
      : ''
  );
</script>
<svelte:head>
  <title>{item.title} | お知らせ | 株式会社CHINTAI</title> 
  <meta name="description" content="株式会社CHINTAIのお知らせ「{item.title}」についてです。"/>  
  <meta property="og:locale" content="ja_JP"/>
  <meta property="og:type" content="website"/>
  <meta property="og:image" content="https://www.chintai.jp/assets/OGP.jpg"/>
  <meta name="twitter:card" content="summary"/>
</svelte:head>


<div class="p-news-single">
  <section class="cm-section-header cm-section-header--news">
    <div class="l-container">
      <div class="cm-section-header-news">
        <div class="cm-section-header-news__meta">
          <p class="cm-section-header-news__date">{published}</p>
          {#if item.category}
            <p class="cm-section-header-news__category">
              <span class="cm-section-header-news__label" style="background: {item.category?.color ?? '#7EBEAF'};"></span><span>{item.category?.name ?? item.category}</span>
            </p>
          {/if}
        </div>
        <h1 class="cm-section-header-news__title">{item.title}</h1>
      </div>
    </div>
    <ul class="cm-section-header__bc">
      <li><a href={siteOrigin + '/'}>Top</a></li>
      <li><a href={base + '/'}>News</a></li>
      <li><span>{item.title}</span></li>
    </ul>
  </section>

  <div class="p-news-single__wrap">
    <div class="l-container">
      <div class="p-news-single__content cm-post">
        {@html item.body ?? item.content ?? ''}
      </div>
      <div class="p-news-single__paginate">
        <div class="cm-nav-paginate-single">
          <div
            class="cm-nav-paginate-single__ctrl"
            style="opacity: {data.prev ? 1 : 0}; pointer-events: {data.prev ? 'auto' : 'none'};"
          >
            <a href={prevLinkUrl} aria-hidden={!data.prev} target={prevIsPdf ? '_blank' : undefined} rel={prevIsPdf ? 'noopener' : undefined}>
              <i class="c-btn-circle c-btn-circle--prev">
                <svg width="42" height="42">
                  <use href="#ico-circle"></use>
                </svg>
                <svg class="_arrow" width="42" height="42">
                  <use href="#ico-arrow-right"></use>
                </svg>
              </i>
              <span>前の記事</span>
            </a>
          </div>
          <div class="cm-nav-paginate-single__index">
            <a href={base + '/'}><span>お知らせ一覧</span></a>
          </div>
          <div
            class="cm-nav-paginate-single__ctrl"
            style="opacity: {data.next ? 1 : 0}; pointer-events: {data.next ? 'auto' : 'none'};"
          >
            <a href={nextLinkUrl} aria-hidden={!data.next} target={nextIsPdf ? '_blank' : undefined} rel={nextIsPdf ? 'noopener' : undefined}>
              <span>次の記事</span>
              <i class="c-btn-circle">
                <svg width="42" height="42">
                  <use href="#ico-circle"></use>
                </svg>
                <svg class="_arrow" width="42" height="42">
                  <use href="#ico-arrow-right"></use>
                </svg>
              </i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
