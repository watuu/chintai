<script>
  /** @type {import('./$types').PageData} */
  let { data } = $props();

  const item = $derived(data.item);
  const published = $derived(
    item.publishedAt
      ? new Date(item.publishedAt).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.')
      : ''
  );
</script>

<div class="p-news-single">
  <section class="cm-section-header cm-section-header--news">
    <div class="l-container">
      <div class="cm-section-header-news">
        <div class="cm-section-header-news__meta">
          <p class="cm-section-header-news__date">{published}</p>
          {#if item.category}
            <p class="cm-section-header-news__category">
              <span class="cm-section-header-news__label" style="background: {item.category?.color ?? '#7EBEAF'};">{item.category?.name ?? item.category}</span>
            </p>
          {/if}
        </div>
        <h1 class="cm-section-header-news__title">{item.title}</h1>
      </div>
    </div>
    <ul class="cm-section-header__bc">
      <li><a href="/">Top</a></li>
      <li><a href="/news/">News</a></li>
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
          <div class="cm-nav-paginate-single__index">
            <a href="/news/"><span>お知らせ一覧</span></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
