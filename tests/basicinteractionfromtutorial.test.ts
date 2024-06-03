import { expect, test } from "@playwright/test";
import { text } from "stream/consumers";

test("Interaction with inputs", async ({page}) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/simple-form-demo");
    const messageInput = page.locator("input#user-message");
    await messageInput.scrollIntoViewIfNeeded();
    console.log(await messageInput.getAttribute("placeholder"));
    expect(messageInput).toHaveAttribute("placeholder" , "Please enter your Message");
    console.log(await messageInput.inputValue());

    console.log("Before entering data: " + await messageInput.inputValue());
    await messageInput.type("Hi Niki");
    console.log("After entering data: " + await messageInput.inputValue());

})

test("Check sum of two numbers", async ({ page }) => {
  await page.goto(
    "https://www.lambdatest.com/selenium-playground/simple-form-demo"
  );

  const sum1input = page.locator("#sum1");
  const sum2input = page.locator("#sum2");
  const cookieBanner = page.locator(
    "#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowallSelection"
  );
  const getValuesBtn = page.locator("//button[text()='Get Sum']");
  const result = page.locator("#addmessage");

  // if (await cookieBanner.isVisible()) {
    // await cookieBanner.click()
  // }


  // един вид нестед if
  cookieBanner &&
    (await cookieBanner.isVisible()) &&
    (await cookieBanner.click());

  let num1 = 121;
  let num2 = 546;

  await sum1input.type("" + num1);
  await sum2input.type("" + num2);
  await getValuesBtn.click();

  await page.waitForTimeout(3000);

  const resultText = await result.textContent();
  console.log(resultText);

  let expectedResult = num1 + num2;

  expect(result).toHaveText("" + expectedResult);
});


test("CheckBox", async({page}) => {
    
    await page.goto("https://www.lambdatest.com/selenium-playground/checkbox-demo");
    const singleCheckBox =  page.locator("#isAgeSelected");
    expect(singleCheckBox).not.toBeChecked();
    await singleCheckBox.check();
    expect(singleCheckBox).toBeChecked();
    let cookieBanner;

    cookieBanner &&
     (await cookieBanner.isVisible()) &&
     (await cookieBanner.click());

    await page.waitForTimeout(3000);
})