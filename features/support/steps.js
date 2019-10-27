const { Given, When, Then, BeforeAll, AfterAll } = require("cucumber");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const wd = require("wd");

chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

const { asserters } = wd;

BeforeAll(() => {
  browser = wd.promiseChainRemote();
  return browser.init({ browserName: "chrome" }).get("https://www.google.com/");
});

AfterAll(() => {
  browser.quit();
});

Given("I am on the Google search page", done => {
  browser
    .title()
    .then(title => {
      title.should.equal("Google");
    })
    .nodeify(done);
});

When("I search for {string}", (searchWord, done) => {
  browser
    .elementByName("q")
    .sendKeys(searchWord)
    .sleep(1000)
    .elementByClassName("gNO89b")
    .should.eventually.exist.click()
    .nodeify(done);
});

Then("the page title should start with {string}", (searchWord, done) => {
  browser
    .waitForElementByCss("#resultStats", asserters.isDisplayed, 5000)
    .title()
    .then(title => {
      const words = title.split(" ");
      words[0].should.equal(searchWord);
    })
    .nodeify(done);
});
