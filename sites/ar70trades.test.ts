import { expect, test } from "@playwright/test";
import { ArrFounded, findWord } from "../pages/wordpage";
import { ar70tradesPre } from "../data/ar70trades/prefics";
import { ar70tradesUrls} from "../data/ar70trades/urls";
import exp from "constants";
import { badWords } from "../data/70trades/specialWords";



test("Check word_04", async ({ page }) => {
  const domain = "70trades.ae";
  const ar70tradesPrefics = ar70tradesPre;
  const ar70tradesUrls1 = ar70tradesUrls;

  const arrFounded: ArrFounded = [];
  test.setTimeout(360000);
  for (let i = 0; i <ar70tradesPrefics.length; i++) {
    for (let j = 0; j < ar70tradesUrls.length; j++) {
      const URL = `https://${ar70tradesPrefics[i]}.${domain}/${ar70tradesUrls[j]}`;
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
