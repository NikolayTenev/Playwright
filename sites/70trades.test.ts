import { expect, test } from "@playwright/test";
import { ArrFounded, findWord } from "../pages/wordpage";
import { tradesPre } from "../data/70trades/prefics";
import { tradesUrls} from "../data/70trades/urls";
import exp from "constants";
import { badWords } from "../data/70trades/specialWords";



test("Check word_03", async ({ page }) => {
  const domain = "70trades.com";
  const tradesPrefics = tradesPre;
  const tradesUrls1 = tradesUrls;

  const arrFounded: ArrFounded = [];
  test.setTimeout(360000);
  for (let i = 0; i <tradesPrefics.length; i++) {
    for (let j = 0; j < tradesUrls.length; j++) {
      const URL = `https://${tradesPrefics[i]}.${domain}/${tradesUrls[j]}`;
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
