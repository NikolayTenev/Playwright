import {test} from "@playwright/test"

test.only ("interact whit frames", async ({page}) => {

await page.goto ("https://www.fortissio.com/about-fortissio/contact-us/")
const allframes = page.frames();
console.log("No of frames:" + allframes.length);

const myFrame = page.frame("firstdr")

await page.fill("#wpcf7-f287-p286-o1 > form > div.container > div:nth-child(1) > div:nth-child(1) > span > input" , "test case");
await page.fill("#wpcf7-f287-p286-o1 > form > div.container > div:nth-child(1) > div:nth-child(2) > span > input", "email");
await page.selectOption("#wpcf7-f287-p286-o1 > form > div.container > div:nth-child(2) > div:nth-child(2) > span > select", {
    value:"Deposits"
})

})