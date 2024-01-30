import { expect, test } from "@playwright/test";
import { ArrFounded, findWord } from "../pages/wordpage";
import { inviertasPre } from "../data/inviertas/prefics";
import { inviertasUrls } from "../data/inviertas/urls";
import exp from "constants";
import { badWords } from "../data/inviertas/specialWords";

test.only("Check word_11", async ({ page }) => {
  const domain = "inviertas.com";
  const inviertasPrefics = inviertasPre;
  const inviertasUrls1 = inviertasUrls;

  const arrFounded: ArrFounded = [];
  test.setTimeout(460000);
  for (let i = 0; i < inviertasPrefics.length; i++) {
    for (let j = 0; j < inviertasUrls.length; j++) {
      const URL = `https://${inviertasPrefics[i]}.${domain}/${inviertasUrls[j]}`;
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
