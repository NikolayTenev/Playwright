import {expect,test} from "@playwright/test";
import { TIMEOUT } from "dns";

test("Interact with frames", async ({page}) => {
    await page.goto("https://letcode.in/frame")
    const allFrames = page.frames();
    console.log("N of frames: " + allFrames);

    const frame = page.frameLocator("#firstFr")
    await frame.locator("//input[@name='fname']").fill("Niki");
    await frame.locator("//input[@name='lname']").fill("Tenev");

   const innerFrame = frame.frameLocator("iframe[src='innerFrame']")
   await innerFrame.locator("//input[@name='email']").fill("abbf@ab.bg")

    await page.waitForTimeout(3000);
})