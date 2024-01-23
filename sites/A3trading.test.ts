import { expect, test } from "@playwright/test";
import { ArrFounded, findWord } from "../pages/wordpage";
import { A3tradingPre } from "../data/A3trading/prefics";
import { A3tradingUrls} from "../data/A3trading/urls";
import exp from "constants";
import { badWords } from "../data/A3trading/specialWords";



test("Check word_05", async ({ page }) => {
  const domain = "A3trading.com";
  const A3tradingPrefics = A3tradingPre;
  const A3tradingsUrls1 = A3tradingUrls;

  const arrFounded: ArrFounded = [];
  test.setTimeout(360000);
  for (let i = 0; i <A3tradingPrefics.length; i++) {
    for (let j = 0; j < A3tradingUrls.length; j++) {
      const URL = `https://${A3tradingPrefics[i]}.${domain}/${A3tradingUrls[j]}`;
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
