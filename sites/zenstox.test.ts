import { expect, test } from "@playwright/test";
import { ArrFounded, findWord } from "../pages/wordpage";
import { zenstoxPre } from "../data/zenstox/prefics";
import { zenstoxUrls } from "../data/zenstox/Urls";
import exp from "constants";
import { badWords } from "../data/zenstox/specialWords";

test("Check word_09", async ({ page }) => {
  const domain = "zenstox.com";
  const zenstoxPrefics = zenstoxPre;
  const zenstoxUrls1 = zenstoxUrls;

  const arrFounded: ArrFounded = [];
  test.setTimeout(460000);
  for (let i = 0; i < zenstoxPrefics.length; i++) {
    for (let j = 0; j < zenstoxUrls.length; j++) {
      const URL = `https://${zenstoxPrefics[i]}.${domain}/${zenstoxUrls[j]}`;
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
