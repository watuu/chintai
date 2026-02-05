<script>
  import { dev } from '$app/environment';
  import { env } from '$env/dynamic/public';

  /** dest 配下の共通アセット（CSS・画像）のオリジン。ビルド時は本番URLを優先 */
  const defaultOrigin = dev ? 'http://localhost:5173' : 'https://chintai.manic-design.com';
  const siteOrigin =
    env.PUBLIC_SITE_ORIGIN != null && (dev || !env.PUBLIC_SITE_ORIGIN.includes('localhost'))
      ? env.PUBLIC_SITE_ORIGIN
      : defaultOrigin;
  /** メインサイト（dest）のルート。絶対URLにして base チェックを回避 */
  const path = siteOrigin.replace(/\/$/, '') + '/';
  const img = `${siteOrigin}/assets/img/`;
  const sitename = '株式会社CHINTAI';
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&family=Urbanist:wght@500&family=Roboto:wght@400&display=swap"
    rel="stylesheet"
  />
  <link rel="stylesheet" href={siteOrigin + '/assets/css/style.css'} />
</svelte:head>

<header class="l-header">
  <div class="l-header-logo">
    <a href={path}>
      <img src={img + 'logo.svg'} alt={sitename} />
      <img src={img + 'logo-wh.svg'} alt="" />
    </a>
  </div>
  <nav class="l-header-nav cm-nav-header">
    <ul class="cm-nav-header__nav">
      <li><a href={path + 'company/'} data-sveltekit-reload class="cm-nav-header__link" data-dir="company"><span class="js-clone">会社情報</span></a></li>
      <li><a href={path + 'service/'} data-sveltekit-reload class="cm-nav-header__link" data-dir="service"><span class="js-clone">サービス</span></a></li>
      <li><a href={path + 'initiative/'} data-sveltekit-reload class="cm-nav-header__link" data-dir="initiative"><span class="js-clone">CHINTAIの取り組み</span></a></li>
      <li><a href={path + 'news/'} data-sveltekit-reload class="cm-nav-header__link" data-dir="news"><span class="js-clone">お知らせ</span></a></li>
      <li><a href="https://www.chintai.jp/recruit/" data-sveltekit-reload class="cm-nav-header__link"><span class="js-clone">採用情報</span></a></li>
    </ul>
    <a href={path + 'contact/'} class="cm-nav-header__contact"><span class="js-clone">お問い合わせ</span></a>
  </nav>
  <button class="l-header-menu c-btn-menu" type="button" aria-label="メニューを開く"><span></span><span></span></button>
  <div class="l-header-drawer">
    <div class="l-header-drawer__wrap">
      <div class="l-header-drawer__nav">
        <div class="cm-nav-main">
          <ul class="cm-nav-main__lv1">
            <li><a href={path + 'company/'} data-sveltekit-reload class="cm-nav-main__link"><span class="_ja">会社情報</span><span class="_en">Company</span></a></li>
            <li><a href={path + 'service/'} data-sveltekit-reload class="cm-nav-main__link"><span class="_ja">サービス</span><span class="_en">Service</span></a></li>
            <li><a href={path + 'initiative/'} data-sveltekit-reload class="cm-nav-main__link"><span class="_ja">CHINTAIの取り組み</span><span class="_en">Initiative</span></a>
              <ul class="cm-nav-main__lv2">
                <li><a href="https://www.chintai.net/city-planning/" target="_blank" rel="noopener" class="cm-nav-main__sub"><span>社会貢献プロジェクト</span></a></li>
                <li><a href={path + 'initiative/student/'} data-sveltekit-reload class="cm-nav-main__sub"><span>学生応援活動</span></a></li>
                <li><a href={path + 'initiative/media/'} data-sveltekit-reload class="cm-nav-main__sub"><span>メディア活動</span></a></li>
              </ul>
            </li>
            <li><a href={path + 'news/'} data-sveltekit-reload class="cm-nav-main__link"><span class="_ja">お知らせ</span><span class="_en">News</span></a></li>
            <li><a href="https://www.chintai.jp/recruit/" class="cm-nav-main__link"><span class="_ja">採用情報</span><span class="_en">Recruit</span></a></li>
            <li><a href={path + 'contact/'} data-sveltekit-reload class="cm-nav-main__link"><span class="_ja">お問い合わせ</span><span class="_en">Contact</span></a></li>
          </ul>
        </div>
      </div>
      <ul class="l-header-drawer__sns">
        <li><a href="https://www.instagram.com/chintiger_chintai/" target="_blank" rel="noopener"><img src={img + 'ico-instagram.svg'} alt="instagram" /></a></li>
        <li><a href="https://x.com/CHINTiger" target="_blank" rel="noopener"><img src={img + 'ico-x.svg'} alt="x" /></a></li>
        <li><a href="https://www.youtube.com/@chintai" target="_blank" rel="noopener"><img src={img + 'ico-youtube.svg'} alt="youtube" /></a></li>
        <li><a href="https://note.chintai.jp/" target="_blank" rel="noopener"><img src={img + 'ico-note.svg'} alt="note" /></a></li>
      </ul>
    </div>
  </div>
</header>

<main class="l-main" id="main">
  <div class="l-body-wrap">
    <slot />
  </div>
</main>

<footer class="l-footer is-section-dark">
  <div class="l-footer__chintiger"><img src={img + 'chintiger-footer.svg'} alt="" /></div>
  <div class="l-container">
    <div class="l-footer__wrap">
      <div class="l-footer-logo"><a href={path}><img src={img + 'logo-wh.svg'} alt={sitename} /></a></div>
      <div class="l-footer-nav">
        <div class="cm-nav-main">
          <ul class="cm-nav-main__lv1">
            <li><a href={path + 'company/'} data-sveltekit-reload class="cm-nav-main__link"><span class="_ja">会社情報</span><span class="_en">Company</span></a></li>
            <li><a href={path + 'service/'} data-sveltekit-reload class="cm-nav-main__link"><span class="_ja">サービス</span><span class="_en">Service</span></a></li>
            <li><a href={path + 'initiative/'} data-sveltekit-reload class="cm-nav-main__link"><span class="_ja">CHINTAIの取り組み</span><span class="_en">Initiative</span></a>
              <ul class="cm-nav-main__lv2">
                <li><a href="https://www.chintai.net/city-planning/" target="_blank" rel="noopener" class="cm-nav-main__sub"><span>社会貢献プロジェクト</span></a></li>
                <li><a href={path + 'initiative/student/'} data-sveltekit-reload class="cm-nav-main__sub"><span>学生応援活動</span></a></li>
                <li><a href={path + 'initiative/media/'} data-sveltekit-reload class="cm-nav-main__sub"><span>メディア活動</span></a></li>
              </ul>
            </li>
            <li><a href={path + 'news/'} data-sveltekit-reload class="cm-nav-main__link"><span class="_ja">お知らせ</span><span class="_en">News</span></a></li>
            <li><a href="https://www.chintai.jp/recruit/" class="cm-nav-main__link"><span class="_ja">採用情報</span><span class="_en">Recruit</span></a></li>
            <li><a href={path + 'contact/'} data-sveltekit-reload class="cm-nav-main__link"><span class="_ja">お問い合わせ</span><span class="_en">Contact</span></a></li>
          </ul>
        </div>
      </div>
      <ul class="l-footer-sns">
        <li><a href="https://www.instagram.com/chintiger_chintai/" target="_blank" rel="noopener"><img src={img + 'ico-instagram-wh.svg'} alt="instagram" /></a></li>
        <li><a href="https://x.com/CHINTiger" target="_blank" rel="noopener"><img src={img + 'ico-x-wh.svg'} alt="x" /></a></li>
        <li><a href="https://www.youtube.com/@chintai" target="_blank" rel="noopener"><img src={img + 'ico-youtube-wh.svg'} alt="youtube" /></a></li>
        <li><a href="https://note.chintai.jp/" target="_blank" rel="noopener"><img src={img + 'ico-note-wh.svg'} alt="note" /></a></li>
      </ul>
      <div class="l-footer-info">
        <p>〒107-0051<br />東京都港区元赤坂1丁目2番7号<br />AKASAKA K-TOWER 10階<br />TEL. 03-5771-4600</p>
      </div>
      <div class="l-footer-group">
        <h3 class="l-footer-group__head">Group Companies</h3>
        <ul class="l-footer-group__list">
          <li><a href="https://www.able-partners.co.jp/" target="_blank" rel="noopener"><img src={img + 'bana-able-partners.webp'} alt="ABLE &amp; PARTNERS" /></a></li>
          <li><a href="https://www.able.co.jp/" target="_blank" rel="noopener"><img src={img + 'bana-able.webp'} alt="【エイブル】賃貸物件・不動産物件を検索！" /></a></li>
        </ul>
      </div>
      <ul class="l-footer-other">
        <li><a href="https://www.able-partners.co.jp/company/management/social_media.html" target="_blank" rel="noopener"><span>サイトポリシー</span></a></li>
        <li><a href="https://www.chintai.net/site_info/privacy/" target="_blank" rel="noopener"><span>個人情報保護方針</span></a></li>
        <li><a href="https://www.able-partners.co.jp/company/management/social_media.html" target="_blank" rel="noopener"><span>ソーシャルメディアポリシー</span></a></li>
      </ul>
    </div>
    <p class="l-footer__copyright">&copy;CHINTAI Corporation All rights reserved.</p>
  </div>
</footer>

<!-- ページャー等で使用する SVG シンボル（メインサイトの _symbol.pug と同一） -->
<svg aria-hidden="true" style="position:absolute;width:0;height:0;">
  <defs>
    <symbol id="ico-arrow-right" viewBox="0 0 42 42">
      <path d="M13.4375 20.0676H23.6841V21.3936H13.4375V20.0676ZM22.9013 16.7998L29.3975 20.778L22.9013 24.7798V16.8116V16.7998Z" stroke="none"/>
    </symbol>
    <symbol id="ico-circle" viewBox="0 0 42 42">
      <rect x="1" y="1" width="40" height="40" rx="20" stroke-width="2"/>
    </symbol>
    <symbol id="ico-angle-down" viewBox="0 0 17 12">
      <path d="M16.1805 0.646484L8.47502 9.74347L0.761719 0.646484" fill="none" stroke-width="2" stroke-miterlimit="10"/>
    </symbol>
  </defs>
</svg>
