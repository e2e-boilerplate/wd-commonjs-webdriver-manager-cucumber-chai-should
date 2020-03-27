const { Given, When, Then, AfterAll } = require("cucumber");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const wd = require("wd");

const url = "https://e2e-boilerplate.github.io/sandbox/";

chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;
const browser = wd.promiseChainRemote();

Given(/^Navigate to the sandbox$/, () => {
  return process.env.GITHUB_ACTIONS
    ? browser
        .init({
          browserName: "chrome",
          "goog:chromeOptions": { args: ["--headless", "--disable-gpu"] },
        })
        .get(url)
    : browser
        .init({
          browserName: "chrome",
        })
        .get(url);
});

AfterAll(() => {
  browser.quit();
});

When(/^I am on the sandbox page$/, (done) => {
  browser
    .title()
    .then((title) => {
      title.should.equal("Sandbox");
    })
    .nodeify(done);
});

Then(/^The page header should be "([^"]*)"$/, (header, done) => {
  browser
    .elementByTagName("h1")
    .text()
    .then((text) => {
      text.should.equal(header);
    })
    .nodeify(done);
});
