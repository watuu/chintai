<script>
  import { page } from '$app/stores';

  /** @type {import('./$types').PageData} */
  let { data } = $props();
</script>

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
                <option value="2025">2025年</option>
                <option value="2024">2024年</option>
              </select>
            </div>
            <div class="c-form-select">
              <select name="category" class="c-form-select__input">
                <option value="">カテゴリー</option>
                <option value="notice">お知らせ</option>
                <option value="press">プレスリリース</option>
                <option value="survey">暮らし調査</option>
              </select>
            </div>
          </div>
          <div class="cm-block-filter__action">
            <button type="submit" class="c-form-btn"><span>絞り込む</span></button>
          </div>
        </form>
      </div>

      <div class="p-news__list">
        {#each data.list as item}
          <article class="c-card-news">
            <div class="c-card-news__wrap">
              <p class="c-card-news__date">
                {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.') : ''}
              </p>
              {#if item.category}
                <p class="c-card-news__category">
                  <span class="c-card-news__label" style="background: {item.category?.color ?? '#7EBEAF'};">{item.category?.name ?? item.category}</span>
                </p>
              {/if}
              <h3 class="c-card-news__title">
                <a href="/news/{item.slug ?? item.id}" class="c-card-news__link">{item.title}</a>
              </h3>
              {#if item.pdf?.url}
                <div class="c-card-news__pdf">
                  <a href={item.pdf.url} target="_blank" rel="noopener">PDF</a>
                </div>
              {/if}
            </div>
          </article>
        {/each}
      </div>

      {#if data.totalCount > data.limit}
        <div class="p-news__paginate">
          <ul class="cm-nav-paginate">
            {#if data.offset > 0}
              <li class="cm-nav-paginate__ctrl">
                <a href="?offset={data.offset - data.limit}&limit={data.limit}" class="c-btn-circle c-btn-circle--prev">prev</a>
              </li>
            {/if}
            <li class="cm-nav-paginate__page is-current"><span>{(data.offset / data.limit) + 1}</span></li>
            {#if data.offset + data.limit < data.totalCount}
              <li class="cm-nav-paginate__ctrl">
                <a href="?offset={data.offset + data.limit}&limit={data.limit}" class="c-btn-circle">next</a>
              </li>
            {/if}
          </ul>
        </div>
      {/if}
    </div>
  </div>
</div>
