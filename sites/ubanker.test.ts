import { expect, test } from "@playwright/test";
import { ArrFounded, findWord } from "../pages/wordpage";
import { ubankerPre } from "../data/ubanker/prefics";
import { ubankerUrls} from "../data/ubanker/urls";
import exp from "constants";
import { badWords } from "../data/ubanker/specialWords";



test("Check word_07", async ({ page }) => {
  const domain = "ubanker.com";
  const ubankerPrefics = ubankerPre;
  const ubankerUrls1 = ubankerUrls;

  const arrFounded: ArrFounded = [];
  test.setTimeout(360000);
  for (let i = 0; i <ubankerPrefics.length; i++) {
    for (let j = 0; j < ubankerUrls.length; j++) {
      const URL = `https://${ubankerPrefics[i]}.${domain}/${ubankerUrls[j]}`;
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
