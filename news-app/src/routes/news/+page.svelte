<script>
  /** @type {import('./$types').PageData} */
  let { data } = $props();

  /** ページャー用のクエリ文字列（year, category を保持） */
  function paginateHref(offset, limit = data.limit) {
    const params = new URLSearchParams();
    params.set('offset', String(offset));
    params.set('limit', String(limit));
    if (data.year) params.set('year', data.year);
    if (data.categoryId) params.set('category', data.categoryId);
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
      <li><a href="/">Top</a></li>
      <li><span>News</span></li>
    </ul>
  </section>

  <div class="p-news__wrap">
    <div class="l-container">
      <div class="p-news__nav">
        <form class="cm-block-filter" method="get" action="/news">
          <div class="cm-block-filter__inputs">
            <div class="c-form-select">
              <select name="year" class="c-form-select__input">
                <option value="">年代</option>
                {#each data.years ?? [] as y}
                  <option value={y} selected={data.year === y}>{y}年</option>
                {/each}
              </select>
            </div>
            <div class="c-form-select">
              <select name="category" class="c-form-select__input">
                <option value="">カテゴリー</option>
                {#each data.categories ?? [] as cat}
                  <option value={cat.id} selected={data.categoryId === cat.id}>{cat.name}</option>
                {/each}
              </select>
            </div>
          </div>
          <div class="cm-block-filter__action">
            <button type="submit" class="c-form-btn"><span>絞り込む</span></button>
          </div>
        </form>
      </div>

      <p class="p-news__total">全{data.totalCount}件</p>

      <div class="p-news__list">
        {#each data.list as item}
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
              <h3 class="c-card-news__title">
                <a href="/news/{item.slug ?? item.id}" class="c-card-news__link">{item.title}</a>
                {#if item.pdf?.url ?? item.pdfurl}
                <div class="c-card-news__pdf">
                  <a href={item.pdf?.url ?? item.pdfurl} target="_blank" rel="noopener">PDF</a>
                </div>
              {/if}                
              </h3>
             
            </div>
          </div>
                  
        {/each}
      </div>

      {#if data.totalCount > data.limit}
        {@const totalPages = Math.ceil(data.totalCount / data.limit)}
        {@const currentPage = (data.offset / data.limit) + 1}
        {@const showDot = totalPages > 4}
        {@const showCurrentInMiddle = showDot && currentPage > 4 && currentPage < totalPages}
        <div class="p-news__paginate">
          <ul class="cm-nav-paginate">
            <li class="cm-nav-paginate__ctrl">
              {#if data.offset > 0}
                <a class="c-btn-circle c-btn-circle--prev" href={paginateHref(data.offset - data.limit)}>
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
                  <a href={paginateHref((pageNum - 1) * data.limit)}>{pageNum}</a>
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
                  <a href={paginateHref((totalPages - 1) * data.limit)}>{totalPages}</a>
                {/if}
              </li>
            {/if}
            <li class="cm-nav-paginate__ctrl">
              {#if data.offset + data.limit < data.totalCount}
                <a class="c-btn-circle" href={paginateHref(data.offset + data.limit)}>
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
