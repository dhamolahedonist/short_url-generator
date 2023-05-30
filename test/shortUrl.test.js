// import { By, Key, Builder } from "selenium-webdriver"
const { By, Key, Builder, until } = require("selenium-webdriver");
const assert = require("assert");

describe("load page", function () {
  let driver;
  beforeEach(async () => {
    // Set up the driver before running the tests
    driver = await new Builder().forBrowser("chrome").build();
  });

  afterEach(async () => {
    // Clean up the driver after running the tests
    await driver.quit();
  });
  it("load page successfully", async () => {
    // get the link to be navigated to
    await driver.get("http://127.0.0.1:5050/");

    // Assert the page title
    const title = await driver.getTitle();
    assert.strictEqual(title, "Short Url");
  });
  it("type a url into the input field", async () => {
    // get the link to be navigated to
    await driver.get("http://127.0.0.1:5050/");

    // Assert the page title
    await driver
      .findElement(By.id("fullUrl"))
      .sendKeys("https://google.com", Key.RETURN);
  });
  it("it should delete an item", async () => {
    await driver.get("http://127.0.0.1:5050/");

    const deleteButton = await driver.findElement(By.className("delete-link"));

    await deleteButton.click();

    await driver.wait(until.stalenessOf(deleteButton));

    const isButtonDeleted = await driver.findElements(
      By.className("delete-link")
    );
    assert.strictEqual(isButtonDeleted.length, 0, "Button is not deleted");
  });
  it("type a url into the QR code generator", async () => {
    // get the link to be navigated to
    await driver.get("http://127.0.0.1:5050/");

    // Assert the page title
    await driver
      .findElement(By.id("text"))
      .sendKeys("https://google.com", Key.RETURN);

    const submitButton = await driver.findElement(
      By.xpath("/html/body/div[2]/form/button")
    );
    await submitButton.click();
  });
});

// async function waitForNextPageToLoad(driver) {
//   // Define the expected condition for the page to load
//   const nextPageLoadExpectedCondition = until.urlContains(
//     "http://localhost:5050/scan"
//   );

//   // Wait for the next page to load
//   await driver.wait(nextPageLoadExpectedCondition, 10000);
// }
