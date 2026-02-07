/**
 * メインサイト（dest 配下）のオリジン。一箇所で管理する。
 * 本番URLを変えるときは .env.production の PUBLIC_SITE_ORIGIN を変更する。
 * 下記定数は env 未設定時のフォールバック用。
 */
const DEFAULT_DEV_ORIGIN = 'http://localhost:5173';
const DEFAULT_PRODUCTION_ORIGIN = 'https://chintai.arutega.jp';

/**
 * @param {Record<string, string | undefined>} env - $env/dynamic/public
 * @param {boolean} dev - $app/environment の dev
 * @returns {string}
 */
export function getSiteOrigin(env, dev) {
  const fromEnv = env.PUBLIC_SITE_ORIGIN;
  if (fromEnv != null && fromEnv !== '') return fromEnv;
  return dev ? DEFAULT_DEV_ORIGIN : DEFAULT_PRODUCTION_ORIGIN;
}

export { DEFAULT_DEV_ORIGIN, DEFAULT_PRODUCTION_ORIGIN };
