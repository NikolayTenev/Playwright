import { expect, test } from "@playwright/test";
import { ArrFounded, findWord } from "../pages/wordpage";
import { fxgmPre } from "../data/fxgm/prefics";
import { fxgmUrls } from "../data/fxgm/urls";
import exp from "constants";
import { badWords } from "../data/fxgm/specialWords";

test("Check word_10", async ({ page }) => {
  const domain = "fxgm.co.za";
  const fxgmPrefics = fxgmPre;
  const fxgmUrls1 = fxgmUrls;

  const arrFounded: ArrFounded = [];
  test.setTimeout(460000);
  for (let i = 0; i < fxgmPrefics.length; i++) {
    for (let j = 0; j < fxgmUrls.length; j++) {
      const URL = `https://${fxgmPrefics[i]}.${domain}/${fxgmUrls[j]}`;
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
