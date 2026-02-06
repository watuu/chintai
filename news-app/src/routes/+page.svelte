<script>
  import { page } from '$app/stores';
  import { browser, dev } from '$app/environment';
  import { base } from '$app/paths';
  import { env } from '$env/dynamic/public';

  /** @type {import('./$types').PageData} */
  let { data } = $props();

  const defaultOrigin = dev ? 'http://localhost:5173' : 'https://chintai.arutega.jp';
  const siteOrigin =
    env.PUBLIC_SITE_ORIGIN != null && (dev || !env.PUBLIC_SITE_ORIGIN.includes('localhost'))
      ? env.PUBLIC_SITE_ORIGIN
      : defaultOrigin;

  const limit = 10;
  const urlYear = $derived(browser ? ($page.url.searchParams.get('year') ?? '') : '');
  const urlCategory = $derived(browser ? ($page.url.searchParams.get('category') ?? '') : '');
  const offset = $derived(
    browser ? Math.max(0, Number($page.url.searchParams.get('offset')) || 0) : 0
  );

  const filteredList = $derived(
    (data.allList ?? []).filter((item) => {
      if (urlYear && item.publishedAt?.slice(0, 4) !== urlYear) return false;
      if (urlCategory) {
        const catId = typeof item.category === 'object' ? item.category?.id : item.category;
        if (catId !== urlCategory) return false;
      }
      return true;
    })
  );
  const totalCount = $derived(filteredList.length);
  const displayList = $derived(filteredList.slice(offset, offset + limit));

  /** ページャー用のクエリ文字列（year, category を保持） */
  function paginateHref(newOffset, lim = limit) {
    const params = new URLSearchParams();
    params.set('offset', String(newOffset));
    params.set('limit', String(lim));
    if (urlYear) params.set('year', urlYear);
    if (urlCategory) params.set('category', urlCategory);
    return '?' + params.toString();
  }
</script>

<svelte:head>
  <title>お知らせ | 株式会社CHINTAI</title> 
</svelte:head>

<div class="p-news">
  <section class="cm-section-header">
    <div class="l-container">
      <div class="cm-section-header__wrap">
        <div class="c-heading-page">
          <h2 class="c-heading-page__title">お知らせ</h2>
          <p class="c-heading-page__en">News</p>
        </div>
      </div>
    </div>
    <ul class="cm-section-header__bc">
      <li><a href={siteOrigin + '/'}>Top</a></li>
      <li><span>News</span></li>
    </ul>
  </section>

  <div class="p-news__wrap">
    <div class="l-container">
      <div class="p-news__nav">
        <form class="cm-block-filter" method="get" action={base + '/'}>
          <div class="c-block-filter__inputs">
            <div class="c-form-select">
              <select name="year" class="c-form-select__input">
                <option value="">年代</option>
                {#each data.years ?? [] as y}
                  <option value={y} selected={urlYear === y}>{y}年</option>
                {/each}
              </select>
              <svg class="c-form-select__angle" width="17" height="12">
                <use href="#ico-angle-down"></use>
              </svg>
            </div>
            <div class="c-form-select">
              <select name="category" class="c-form-select__input">
                <option value="">カテゴリー</option>
                {#each data.categories ?? [] as cat}
                  <option value={cat.id} selected={urlCategory === cat.id}>{cat.name}</option>
                {/each}
              </select>
              <svg class="c-form-select__angle" width="17" height="12">
                <use href="#ico-angle-down"></use>
              </svg>
            </div>
          </div>
          <div class="cm-block-filter__action">
            <button type="submit" class="c-form-btn"><span>絞り込む</span></button>
          </div>
        </form>
      </div>


      <div class="p-news__list">
        {#if totalCount === 0}
          <p class="p-news__empty">該当する記事はありません。</p>
        {:else}
        {#each displayList as item}
          {@const pdfUrl = item.pdf?.url ?? item.pdfurl}
          <div class="c-card-news">
            <div class="c-card-news__wrap">
              <p class="c-card-news__date">
                {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.') : ''}
              </p>
              {#if item.category}
                <p class="c-card-news__category">
                  <span class="c-card-news__label" style="background: {item.category?.color ?? '#7EBEAF'};"></span>
                  <span>{item.category?.name ?? item.category}</span>
                </p>
              {/if}
              <div class="c-card-news__title">
                <a href={base + '/' + (item.slug ?? item.id)} class="c-card-news__link">{item.title}</a>
                {#if pdfUrl}
                <div class="c-card-news__pdf">
                  <a href={pdfUrl} target="_blank" rel="noopener"><span>PDF</span><svg width="13" height="13" aria-hidden="true"><use href="#ico-external-sm"></use></svg></a>
                </div>
              {/if}                
              </div>
             
            </div>
          </div>
                  
        {/each}
        {/if}
      </div>

      {#if totalCount > limit}
        {@const totalPages = Math.ceil(totalCount / limit)}
        {@const currentPage = (offset / limit) + 1}
        {@const showDot = totalPages > 4}
        {@const showCurrentInMiddle = showDot && currentPage > 4 && currentPage < totalPages}
        <div class="p-news__paginate">
          <ul class="cm-nav-paginate">
            <li class="cm-nav-paginate__ctrl">
              {#if offset > 0}
                <a class="c-btn-circle c-btn-circle--prev" href={paginateHref(offset - limit)}>
                  <svg width="42" height="42">
                    <use href="#ico-circle"></use>
                  </svg>
                  <svg class="_arrow" width="42" height="42">
                    <use href="#ico-arrow-right"></use>
                  </svg>
                </a>
              {:else}
                <span class="c-btn-circle c-btn-circle--prev" aria-disabled="true">
                  <svg width="42" height="42">
                    <use href="#ico-circle"></use>
                  </svg>
                  <svg class="_arrow" width="42" height="42">
                    <use href="#ico-arrow-right"></use>
                  </svg>
                </span>
              {/if}
            </li>
            {#each Array.from({ length: Math.min(4, totalPages) }, (_, i) => i + 1) as pageNum}
              <li class="cm-nav-paginate__page" class:is-current={pageNum === currentPage}>
                {#if pageNum === currentPage}
                  <span>{pageNum}</span>
                {:else}
                  <a href={paginateHref((pageNum - 1) * limit)}>{pageNum}</a>
                {/if}
              </li>
            {/each}
            {#if showDot}
              <li class="cm-nav-paginate__dot"><span>…</span></li>
            {/if}
            {#if showCurrentInMiddle}
              <li class="cm-nav-paginate__page is-current"><span>{currentPage}</span></li>
              {#if currentPage < totalPages - 1}
                <li class="cm-nav-paginate__dot"><span>…</span></li>
              {/if}
            {/if}
            {#if showDot}
              <li class="cm-nav-paginate__page" class:is-current={currentPage === totalPages}>
                {#if currentPage === totalPages}
                  <span>{totalPages}</span>
                {:else}
                  <a href={paginateHref((totalPages - 1) * limit)}>{totalPages}</a>
                {/if}
              </li>
            {/if}
            <li class="cm-nav-paginate__ctrl">
              {#if offset + limit < totalCount}
                <a class="c-btn-circle" href={paginateHref(offset + limit)}>
                  <svg width="42" height="42">
                    <use href="#ico-circle"></use>
                  </svg>
                  <svg class="_arrow" width="42" height="42">
                    <use href="#ico-arrow-right"></use>
                  </svg>
                </a>
              {:else}
                <span class="c-btn-circle" aria-disabled="true">
                  <svg width="42" height="42">
                    <use href="#ico-circle"></use>
                  </svg>
                  <svg class="_arrow" width="42" height="42">
                    <use href="#ico-arrow-right"></use>
                  </svg>
                </span>
              {/if}
            </li>
          </ul>
        </div>
      {/if}
    </div>
  </div>
</div>
