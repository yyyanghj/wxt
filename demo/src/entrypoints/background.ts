export default defineBackground(() => {
  console.log(browser.runtime.id);
  logId();
  console.log({
    browser: __BROWSER__,
    chrome: __IS_CHROME__,
    firefox: __IS_FIREFOX__,
    manifestVersion: __MANIFEST_VERSION__,
  });

  // @ts-expect-error: should only accept entrypoints or public assets
  browser.runtime.getURL('/');
  browser.runtime.getURL('/background.js');
  browser.runtime.getURL('/icon/128.png');

  // @ts-expect-error: should only accept known message names
  browser.i18n.getMessage('test');
  browser.i18n.getMessage('prompt_for_name');
  browser.i18n.getMessage('hello', 'Aaron');
  browser.i18n.getMessage('bye', ['Aaron']);
  browser.i18n.getMessage('@@extension_id');

  console.log('WXT MODE:', import.meta.env.MODE);
});
