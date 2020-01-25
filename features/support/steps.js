const { Given, When, Then, AfterAll } = require("cucumber");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const wd = require("wd");

chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

Given(/^Navigate to the sandbox$/, () => {
  browser = wd.promiseChainRemote();
  return browser
    .init({ browserName: "chrome" })
    .get("https://e2e-boilerplates.github.io/sandbox/");
});

AfterAll(() => {
  browser.quit();
});

When(/^I am on the sandbox page$/, done => {
  browser
    .title()
    .then(title => {
      title.should.equal("Sandbox");
    })
    .nodeify(done);
});

Then(/^The page header should be "([^"]*)"$/, (header, done) => {
  browser
    .elementByTagName("h1")
    .text()
    .then(text => {
      text.should.equal(header);
    })
    .nodeify(done);
});
