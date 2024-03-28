import { expect, test } from "@playwright/test";
import { ArrFounded, findWord } from "../pages/wordpage";
import { ontegaPre } from "../data/ontega/prefics";
import { ontegaUrls} from "../data/ontega/urls";
import exp from "constants";
import { badWords } from "../data/ontega/specialWords";



test("Check word_07", async ({ page }) => {
  const domain = "ontega.com";
  const ontegaPrefics = ontegaPre;
  const ontegaUrls1 =ontegaUrls;

  const arrFounded: ArrFounded = [];
  test.setTimeout(460000);
  for (let i = 0; i <ontegaPrefics.length; i++) {
    for (let j = 0; j < ontegaUrls.length; j++) {
      const URL = `https://${ontegaPrefics[i]}.${domain}/${ontegaUrls[j]}`;
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
