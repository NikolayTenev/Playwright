import { expect, test } from "@playwright/test";
import { ArrFounded, findWord } from "../pages/wordpage";
import { finanseroPre } from "../data/finansero/prefics";
import { finanseroUrls} from "../data/finansero/urls";
import exp from "constants";
import { badWords } from "../data/finansero/specialWords";



test("Check word_02", async ({ page }) => {
  const domain = "finansero.com";
  const finanseroPrefics = finanseroPre;
  const finanseroUrls1 = finanseroUrls;

  const arrFounded: ArrFounded = [];
  test.setTimeout(360000);
  for (let i = 0; i <finanseroPrefics.length; i++) {
    for (let j = 0; j < finanseroUrls.length; j++) {
      const URL = `https://${finanseroPrefics[i]}.${domain}/${finanseroUrls[j]}`;
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
