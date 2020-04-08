const { setDefaultTimeout, Given, When, Then, AfterAll } = require("cucumber");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const wd = require("wd");
const config = require("../../config");

const url = "https://e2e-boilerplate.github.io/sandbox/";
setDefaultTimeout(50 * 1000);
chai.use(chaiAsPromised);
chai.should();

chaiAsPromised.transferPromiseness = wd.transferPromiseness;
const browser = wd.promiseChainRemote();

Given(/^Navigate to the sandbox$/, () => {
  return config(url, browser);
});

AfterAll(() => {
  browser.quit();
});

When(/^I am on the sandbox page$/, () => {
  return browser.title().then((title) => {
    title.should.equal("Sandbox");
  });
});

Then(/^The page header should be "([^"]*)"$/, (header) => {
  return browser
    .elementByTagName("h1")
    .text()
    .then((title) => {
      title.should.equal(header);
    });
});
