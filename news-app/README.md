# CHINTAI News App (SvelteKit + SSG)

news 配下のみ SvelteKit + microCMS で CMS 化するためのアプリです。**src/pug には一切手を入れません。**

## 機能

- **SSG**: `@sveltejs/adapter-static` で静的生成
- **ルート**: `/news`（一覧）、`/news/[slug]`（詳細）
- **API**: `/api/news/latest.json` — 最新記事一覧（ビルド時にプリレンダー、他ページからの利用可）
- **ヘッダー・フッター**: レイアウト内に同じ class 名・構造で組み込み（メインサイトの CSS を `/assets/css/style.css` で読み込み、見た目を合わせる）

## セットアップ

```bash
cd news-app
cp .env.example .env
# .env に MICROCMS_SERVICE_DOMAIN と MICROCMS_API_KEY を設定
npm install
```

## 開発

```bash
npm run dev
```

## ビルド（SSG）

1. （任意）記事一覧をプリレンダーするため、slug 一覧を取得して entries を生成:
   ```bash
   npm run prerender:entries
   ```
2. ビルド:
   ```bash
   npm run build
   ```
   `build/` に静的ファイルが出力されます。

## 環境変数

| 変数 | 説明 |
|------|------|
| `MICROCMS_SERVICE_DOMAIN` | microCMS のサービス ID |
| `MICROCMS_API_KEY` | microCMS API キー（サーバー専用） |
## microCMS API 想定

- **エンドポイント**: `news`
- **フィールド例**: `id`, `slug`, `title`, `publishedAt`, `category`（参照または文字列）, `body` / `content`（リッチテキスト）, `pdf`（任意）

## メインサイト（Pug）との連携

- **src/pug は変更しません**。メインサイトは従来どおり Pug ビルドのまま運用します。
- **ヘッダー・フッター**: 本アプリのレイアウト内に同じ class 名・構造で組み込んであります。メインサイトの CSS（`/assets/css/style.css`）と画像（`/assets/img/`）を同一オリジンで参照するため、デプロイ時に静的サイト（dest）と本アプリの build をマージし、`/news`・`/news/*` を SvelteKit に振り向けてください。
- メインサイトのヘッダー・フッターを変更した場合、見た目を揃えたいときは本アプリの `src/routes/+layout.svelte` を手動で同期してください。
