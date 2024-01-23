import { expect, test } from "@playwright/test";
import { ArrFounded, findWord } from "../pages/wordpage";
import {  wbsPre } from "../data/wbs/prefics";
import { wbsUrls} from "../data/wbs/urls";
import exp from "constants";
import { badWords } from "../data/wbs/specialWords";



test("Check word_06", async ({ page }) => {
  const domain = "wbandsmith.com";
  const wbsPrefics = wbsPre;
  const wbsUrls1 = wbsUrls;

  const arrFounded: ArrFounded = [];
  test.setTimeout(460000);
  for (let i = 0; i <wbsPrefics.length; i++) {
    for (let j = 0; j < wbsUrls.length; j++) {
      const URL = `https://${wbsPrefics[i]}.${domain}/${wbsUrls[j]}`;
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
