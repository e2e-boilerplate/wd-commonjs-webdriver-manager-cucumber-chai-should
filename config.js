/* eslint-disable global-require */
async function config(url, browser) {
  return process.env.GITHUB_ACTIONS
    ? browser
        .init({
          browserName: "chrome",
          "goog:chromeOptions": {
            args: ["--headless", "--disable-gpu"],
          },
        })
        .get(url)
    : browser
        .init({
          browserName: "chrome",
          "goog:chromeOptions": {},
        })
        .get(url);
}

module.exports = config;
