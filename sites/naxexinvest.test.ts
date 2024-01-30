import { expect, test } from "@playwright/test";
import { ArrFounded, findWord } from "../pages/wordpage";
import { naxexinvestPre } from "../data/naxexinvest/prefics";
import {naxexinvestUrls} from "../data/naxexinvest/urls";
import exp from "constants";
import { badWords } from "../data/naxexinvest/specialWords";



test("Check word_07", async ({ page }) => {
  const domain = "naxexinvest.com";
  const naxexinvestPrefics = naxexinvestPre;
  const naxexinvestUrls1 = naxexinvestUrls;

  const arrFounded: ArrFounded = [];
  test.setTimeout(460000);
  for (let i = 0; i <naxexinvestPrefics.length; i++) {
    for (let j = 0; j < naxexinvestUrls.length; j++) {
      const URL = `https://${naxexinvestPrefics[i]}.${domain}/${naxexinvestUrls[j]}`;
      try {
        await page.goto(URL, { waitUntil: "domcontentloaded" });

        await findWord(page, arrFounded, badWords);
      } catch (error) {
        // console.log( URL)
        continue;
      }
    }
}
  

  arrFounded.forEach((element) => {
    expect(
      (() => {
        console.log(`URL: ${element.url}, word:${element.word}`);
        return element.isFound === true;
      })()
    ).toBe(true);
  });
});
