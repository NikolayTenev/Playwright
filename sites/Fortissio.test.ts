import { expect, test } from "@playwright/test";
import { ArrFounded, findWord } from "../pages/wordpage";
import { FortissioPre } from "../data/fortissio/prefics";
import { fortissioUrls } from "../data/fortissio/urls";
import exp from "constants";
import { badWords } from "../data/fortissio/specialWords";



test("Check word_01", async ({ page }) => {
  const domain = "fortissio.com";
  const fortissioPrefics = FortissioPre;
  const fortissioUrls1 = fortissioUrls;

  const arrFounded: ArrFounded = [];
  test.setTimeout(260000);
  for (let i = 0; i < fortissioPrefics.length; i++) {
    for (let j = 0; j < fortissioUrls1.length; j++) {
      const URL = `https://${fortissioPrefics[i]}.${domain}/${fortissioUrls1[j]}`;
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
