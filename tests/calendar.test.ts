import {test} from "@playwright/test";


// test("Calendat demo usieng function", async ({page}) => {
// await page.goto("https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo");
// let date = "1994-12-04";

// await page.fill("id=birthday", date);
// await page.waitForTimeout(3000);

// })

test("Calendat demo usieng function", async ({page}) => {

    await page.goto("https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo")
    let date = ""

    await page.click("//*[text()='Allow selection']");

    await page.click("//input[@placeholder='Start date']");

    const mmYY = page.locator("(//table[@class='table-condensed']//th[@class='datepicker-switch'])[1]");
    const prev = page.locator("(//table[@class='table-condensed']//th[@class='prev'])[1]");
    const next= page.locator("(//table[@class='table-condensed']//th[@class='next'])[1]");

    let dateToSelect: string = "March 2024"

    while (await mmYY.textContent() != dateToSelect) {
        await prev.click();
        await page.click("//td[@class='day'][text()='4']");
    }

    

    await page.waitForTimeout(3000);

})