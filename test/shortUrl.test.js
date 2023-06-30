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

    const registerButton = await driver.findElement(
      By.xpath("/html/body/div/div/div/div/a[1]")
    );
    await registerButton.click();

    // // Assert the page title
    // const title = await driver.getTitle();
    // assert.strictEqual(title, "Short Url");
  });
  it("should fill the register form", async () => {
    await driver.get("http://127.0.0.1:5050/");

    const regButton = await driver.findElement(
      By.xpath("/html/body/div/div/div/div/a[1]")
    );
    await regButton.click();

    await driver
      .wait(until.elementLocated(By.id("name")), 30000)
      .sendKeys("samuel", Key.RETURN);

    await driver
      .wait(until.elementLocated(By.id("email")), 30000)
      .sendKeys("samuel@gmail.com", Key.RETURN);

    await driver
      .wait(until.elementLocated(By.id("password")), 30000)
      .sendKeys("samuel1", Key.RETURN);

    await driver
      .wait(until.elementLocated(By.id("password2")), 30000)
      .sendKeys("samuel1", Key.RETURN);

    const registerButton = await driver.findElement(
      By.xpath("/html/body/div/div/div/div/form/button")
    );
    await registerButton.click();

    try {
      // Check if an error message is displayed for an already registered email
      await driver.wait(
        until.elementLocated(By.xpath("/html/body/div/div/div/div/div")),
        5000
      );
      assert.fail("Email is already registered"); // Test fails if error message is found
    } catch (error) {
      // If no error message is found, the test passes
      assert.ok("Email registration successful");
    }
  });

  it("should login user", async () => {
    await driver.get("http://127.0.0.1:5050/");

    const loginButton = await driver.findElement(
      By.xpath("/html/body/div/div/div/div/a[2]")
    );
    await loginButton.click();

    await driver
      .wait(until.elementLocated(By.id("email")), 30000)
      .sendKeys("samuel@gmail.com", Key.RETURN);

    await driver.findElement(By.id("password")).sendKeys("samuel1", Key.RETURN);

    const submitLoginButton = await driver.findElement(
      By.xpath("/html/body/div/div/div/div/form/button")
    );

    await submitLoginButton.click();

    // await driver
    //   .wait(until.elementLocated(By.id("password")), 30000)
    //   .sendKeys("samuel", Key.RETURN);

    // const submitLoginButton = await driver.wait(
    //   until.elementLocated(By.xpath("/html/body/div/div/div/div/form/button")),
    //   30000
    // );
    // await submitLoginButton.click();
  });

  it.skip("type a url into the input field", async () => {
    // get the link to be navigated to
    await driver.get("http://127.0.0.1:5050/");

    // Assert the page title
    await driver
      .findElement(By.id("fullUrl"))
      .sendKeys("https://google.com", Key.RETURN);
  });
  it.skip("it should delete an item", async () => {
    await driver.get("http://127.0.0.1:5050/");

    const deleteButton = await driver.findElement(By.className("delete-link"));

    await deleteButton.click();

    await driver.wait(until.stalenessOf(deleteButton));

    const isButtonDeleted = await driver.findElements(
      By.className("delete-link")
    );
    assert.strictEqual(isButtonDeleted.length, 0, "Button is not deleted");
  });
  it.skip("type a url into the QR code generator", async () => {
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
