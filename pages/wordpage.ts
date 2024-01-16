import { Page } from "@playwright/test";
import { ArrFounded } from "../sites/Fortissio.test";

async function findWord(page: Page, arrFounded: ArrFounded, words: string[]) {
  const pageContent = await page.textContent("body");

  words.forEach((word: string) => {
    const isFound = pageContent?.includes(word);

    if (isFound) {
      const newFounded = {
        isFound: isFound,
        url: page.url(),
        word: word,
      };

      arrFounded.push(newFounded);
    }
  });
}

export { findWord };
