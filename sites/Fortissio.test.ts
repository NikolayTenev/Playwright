import { expect, test } from "@playwright/test";
import  {findWord} from "../pages/wordpage";
import { FortissioPre } from "../data/prefics";
import { FortissioUrls } from "../data/urls";
import exp from "constants";
import { badWords } from "../data/specialWords";

export type ArrFounded = {
  isFound: boolean;
  url: string;
  word: string;
}[];

test.only("Check word_01", async ({ page }) => {
  const domain = "fortissio.com";
  const fortissioPrefics = FortissioPre;
  const fortissioUrls = FortissioUrls;

  const arrFounded: ArrFounded = [];

  for (let i = 0; i < fortissioPrefics.length; i++) {
    for (let j = 0; j < fortissioUrls.length; j++) {
      await page.goto(
        `https://${fortissioPrefics[i]}.${domain}/${fortissioUrls[j]}`
      );

      await findWord(page, arrFounded, badWords);
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
