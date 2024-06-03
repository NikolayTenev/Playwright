import {test} from "@playwright/test";

test("Download file", async ({page})=> {

    await page.goto("https://www.lambdatest.com/selenium-playground/generate-file-to-download-demo")
    await page.click("//*[text()='Allow selection']");
    await page.type("#textbox", "Like,Share,comments & subs");
    await page.click("#create");
    
    
    const download= await Promise.all([
        page.waitForEvent("download"),
        page.click("#link-to-download")
    ])

    const filename = download[0].suggestedFilename();
    await download[0].saveAs(filename);
})

