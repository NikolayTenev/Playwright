import {expect,test} from "@playwright/test";

test ("", async ({page}) => {
await page.goto ("https://www.fortissio.com/register/");
const messageInput = page.locator ("//*[@id='mainForm']/div[1]/label");
await messageInput.scrollIntoViewIfNeeded();
console.log (await messageInput.getAttribute("placeholder"));
expect(messageInput).toContainText ("Full name")

console.log(await messageInput.inputValue());

await messageInput.fill("test case");

}) 