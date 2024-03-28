import { expect, test } from "@playwright/test";
import { ArrFounded, findWord } from "../pages/wordpage";
// import { LpPre } from "../data/LPs/prefics";
import { tradesUrls } from "../data/LPs/urls";
import exp from "constants";
import { badWords } from "../data/LPs/specialWords";

test.only("Check word_10", async ({ page }) => {
  // const domain = "LPs.com";
  // const LpPrefics = LpPre;
  const LPstradesUrls1 = tradesUrls.slice(0,170);

  const arrFounded: ArrFounded = [];
  test.setTimeout(4600000);
 
    for (let j = 0; j < LPstradesUrls1.length; j++) {
      const URL = `https://static-plexop.s3.amazonaws.com/${LPstradesUrls1[j]}`;
      try {
        await page.goto(URL, { waitUntil: "domcontentloaded" });

        await findWord(page, arrFounded, badWords);
      } catch (error) {
         console.log( URL)
        continue;
      }
    }
  

  arrFounded.forEach((element) => {
    expect(
      (() => {
        console.log(`URL: "${element.url}", word:${element.word}`);
        return element.isFound === true;
      })()
    ).toBe(true);
  });
});


