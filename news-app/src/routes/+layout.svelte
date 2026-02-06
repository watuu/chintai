<script>
  import { dev } from '$app/environment';
  import { env } from '$env/dynamic/public';
  import { base } from '$app/paths';

  /** dest 配下の共通アセット（CSS・画像）のオリジン。ビルド時は本番URLを優先 */
  const defaultOrigin = dev ? 'http://localhost:5173' : 'https://chintai.arutega.jp';
  const siteOrigin =
    env.PUBLIC_SITE_ORIGIN != null && (dev || !env.PUBLIC_SITE_ORIGIN.includes('localhost'))
      ? env.PUBLIC_SITE_ORIGIN
      : defaultOrigin;
  /** メインサイト（dest）のルート。絶対URLにして base チェックを回避・プリレンダーで相対リンクが /news/company に解釈されるのを防ぐ */
  const path = siteOrigin.replace(/\/$/, '') + '/';
  const img = `${siteOrigin}/assets/img/`;
  const sitename = '株式会社CHINTAI';
</script>

<svelte:head>
  <meta name="format-detection" content="telephone=no,address=no"/>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&family=Urbanist:wght@500&family=Roboto:wght@400&display=swap"
    rel="stylesheet"
  />
  <link rel="stylesheet" href={siteOrigin + '/assets/css/style.css'} />
  <script src={siteOrigin + '/assets/js/app.js'}></script>
  <!-- Global site tag (gtag.js) - Google Analytics -->
  <script async="" src="https://www.googletagmanager.com/gtag/js?id=UA-24377698-1"></script>
  <script>
    window.dataLayer = window.dataLayer || [];

    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "UA-24377698-1");
  </script>
</svelte:head>

<header class="l-header">
  <div class="l-header-logo"><a href={path}><img src={img + 'logo.svg'} alt="株式会社CHINTAI"/><img src={img + 'logo-wh.svg'} alt=""/></a></div>
  <div class="l-header-nav">
    <nav class="cm-nav-header">
      <ul class="cm-nav-header__nav">
        <li><a class="cm-nav-header__link" href={path + 'company/'} data-dir="company"><span class="js-clone">会社情報</span></a></li>
        <li><a class="cm-nav-header__link" href={path + 'service/'} data-dir="service"><span class="js-clone">サービス</span></a></li>
        <li><a class="cm-nav-header__link" href={path + 'initiatives/'} data-dir="initiatives"><span class="js-clone">CHINTAIの取り組み</span></a></li>
        <li><a class="cm-nav-header__link" href={base + '/'} data-dir="news"><span class="js-clone">お知らせ</span></a></li>
        <li><a class="cm-nav-header__link" href="https://www.chintai.jp/recruit/"><span class="js-clone">採用情報</span></a></li>
      </ul><a class="cm-nav-header__contact" href={path + 'contact/'}><span class="js-clone">お問い合わせ</span></a>
    </nav>
  </div>
  <button class="l-header-menu c-btn-menu" aria-label="メニューを開く"><span></span><span></span></button>
  <div class="l-header-drawer">
    <div class="l-header-drawer__wrap">
      <div class="l-header-drawer__nav">
        <div class="cm-nav-main">
          <ul class="cm-nav-main__lv1">
            <li><a class="cm-nav-main__link" href={path + 'company/'}><span class="_ja">会社情報</span><span class="_en">Company</span></a></li>
            <li><a class="cm-nav-main__link" href={path + 'service/'}><span class="_ja">サービス</span><span class="_en">Service</span></a></li>
            <li><a class="cm-nav-main__link" href={path + 'initiatives/'}><span class="_ja">CHINTAIの取り組み</span><span class="_en">Initiatives</span></a>
              <ul class="cm-nav-main__lv2">
                <li><a class="cm-nav-main__sub" href="https://www.chintai.net/city-planning/" target="_blank"><span>社会貢献プロジェクト</span>
                    <svg width="13" height="13" aria-hidden="true">
                      <use href="#ico-external-sm"></use>
                    </svg></a></li>
                <li><a class="cm-nav-main__sub" href={path + 'initiatives/student/'}><span>学生応援活動</span></a></li>
                <li><a class="cm-nav-main__sub" href={path + 'initiatives/media/'}><span>メディア活動</span></a></li>
              </ul>
            </li>
            <li><a class="cm-nav-main__link" href={base + '/'}><span class="_ja">お知らせ</span><span class="_en">News</span></a></li>
            <li><a class="cm-nav-main__link" href="https://www.chintai.jp/recruit/"><span class="_ja">採用情報</span><span class="_en">Recruit</span></a></li>
            <li><a class="cm-nav-main__link" href={path + 'contact/'}><span class="_ja">お問い合わせ</span><span class="_en">Contact</span></a></li>
          </ul>
        </div>
      </div>
      <ul class="l-header-drawer__sns">
        <li><a href="" target="_blank"><img src={img + 'ico-instagram.svg'} alt="instagram"/></a></li>
        <li><a href="" target="_blank"><img src={img + 'ico-x.svg'} alt="x"/></a></li>
        <li><a href="" target="_blank"><img src={img + 'ico-youtube.svg'} alt="youtube"/></a></li>
        <li><a href="" target="_blank"><img src={img + 'ico-note.svg'} alt="note"/></a></li>
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
            <li><a href={path + 'initiatives/'} data-sveltekit-reload class="cm-nav-main__link"><span class="_ja">CHINTAIの取り組み</span><span class="_en">Initiatives</span></a>
              <ul class="cm-nav-main__lv2">
                <li><a href="https://www.chintai.net/city-planning/" target="_blank" rel="noopener" class="cm-nav-main__sub"><span>社会貢献プロジェクト</span>
                  <svg width="13" height="13" aria-hidden="true">
                    <use href="#ico-external-sm"></use>
                  </svg>
                </a></li>
                <li><a href={path + 'initiatives/student/'} data-sveltekit-reload class="cm-nav-main__sub"><span>学生応援活動</span></a></li>
                <li><a href={path + 'initiatives/media/'} data-sveltekit-reload class="cm-nav-main__sub"><span>メディア活動</span></a></li>
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
        <li><a href="https://www.chintai.net/site_info/policy/" target="_blank"><span>サイトポリシー</span>
          <svg width="13" height="13" aria-hidden="true">
            <use href="#ico-external-sm"></use>
          </svg></a></li>
        <li><a href="https://www.chintai.net/site_info/privacy/" target="_blank"><span>個人情報保護方針</span>
          <svg width="13" height="13" aria-hidden="true">
            <use href="#ico-external-sm"></use>
          </svg></a></li>
        <li><a href="https://www.able-partners.co.jp/company/management/social_media.html" target="_blank"><span>ソーシャルメディアポリシー</span>
          <svg width="13" height="13" aria-hidden="true">
            <use href="#ico-external-sm"></use>
          </svg></a></li>
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
    <symbol id="ico-arrow-left" viewBox="0 0 42 42">
      <path d="M28.5625 21.9324L18.3159 21.9324L18.3159 20.6064L28.5625 20.6064L28.5625 21.9324ZM19.0987 25.2002L12.6025 21.222L19.0987 17.2202L19.0987 25.1884L19.0987 25.2002Z" stroke="none"/>
    </symbol>
    <symbol id="ico-circle" viewBox="-1 -1 44 44">
      <rect x="1" y="1" width="40" height="40" rx="20" stroke-width="2"/>
    </symbol>
    <symbol id="ico-status" viewBox="0 0 18 18">
      <path d="M0.75 8.74512H16.75" stroke="#0C3096" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M8.75391 0.75L8.75391 16.75" stroke="#0C3096" stroke-width="1.5" stroke-linecap="round"/>
    </symbol>
    <symbol id="ico-angle-down" viewBox="0 0 17 12">
      <path d="M16.1805 0.646484L8.47502 9.74347L0.761719 0.646484" fill="none" stroke-width="2" stroke-miterlimit="10"/>
    </symbol>
    <symbol id="ico-external" viewBox="0 0 42 42">
      <path d="M17.0938 24.9399L24.3538 17.6799L25.2837 18.6099L18.0237 25.8699L17.0938 24.9399ZM21.5238 15.9499L28.9137 14.1299L27.1038 21.5299L21.5337 15.9599L21.5238 15.9499Z" stroke="none"/>
      <path d="M22.16 13H14C13.4477 13 13 13.4477 13 14V28C13 28.5523 13.4477 29 14 29H28C28.5523 29 29 28.5523 29 28V23.1111" fill="none" stroke-width="1.2" stroke-miterlimit="10"/>
    </symbol>
    <symbol id="ico-external-sm" viewBox="0 0 13 13">
      <path d="M3.52344 9.40535L8.96844 3.96035L9.66594 4.65785L4.22094 10.1029L3.52344 9.40535ZM6.84594 2.66285L12.3884 1.29785L11.0309 6.84785L6.85344 2.67035L6.84594 2.66285Z" stroke="none"/>
      <path d="M7.32312 0.450195H1.20313C0.788912 0.450195 0.453125 0.785982 0.453125 1.2002V11.7002C0.453125 12.1144 0.788911 12.4502 1.20312 12.4502H11.7031C12.1173 12.4502 12.4531 12.1144 12.4531 11.7002V8.03353" fill="none" stroke-width="0.9" stroke-miterlimit="10"/>
    </symbol>
    <symbol id="ico-media-play" viewBox="-1 -1 46 46">
      <rect x="0.5" y="0.5" width="43" height="43" rx="21.5" fill="white"/>
      <rect x="0.5" y="0.5" width="43" height="43" rx="21.5" fill="none" stroke="#0B2188"/>
      <path d="M30.0939 21.1454C30.7347 21.5349 30.7347 22.4651 30.0939 22.8546L18.7693 29.7369C18.1029 30.1419 17.25 29.6622 17.25 28.8823L17.25 15.1177C17.25 14.3378 18.1029 13.8581 18.7694 14.2631L30.0939 21.1454Z" fill="#0C3096"/>
    </symbol>
    <symbol id="ico-media-pause" viewBox="-1 -1 46 46">
      <rect x="0.5" y="0.5" width="43" height="43" rx="21.5" fill="white"/>
      <rect x="0.5" y="0.5" width="43" height="43" rx="21.5" fill="none" stroke="#0B2188"/>
      <path d="M18.5 15.5V28.5" stroke="#0C3096" stroke-width="4" stroke-linecap="round"/>
      <path d="M25.5 15.5V28.5" stroke="#0C3096" stroke-width="4" stroke-linecap="round"/>
    </symbol>
  </defs>
</svg>
