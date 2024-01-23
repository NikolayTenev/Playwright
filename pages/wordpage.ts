import { Page } from "@playwright/test";

export type ArrFounded = {
  isFound: boolean;
  url: string;
  word: string;
}[];

/**
 * Async function to find specified words on a Playwright page and store the results in an array.
 * @param page - Playwright Page object representing the page to search on.
 * @param arrFounded - Array of ArrFounded objects to store information about found words.
 * @param words - Array of strings representing the words to search for on the page.
 */
async function findWord(page: Page, arrFounded: ArrFounded, words: string[]) {
  // Get the text content of the entire page body
  const pageContent = await page.textContent("body");

  // Iterate through each word in the provided array
  words.forEach((word: string) => {
    // Check if the word is found in the page content
    const isFound = pageContent?.includes(word);

    // If the word is found, create a new ArrFounded object and add it to the array
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

// Export the findWord function for use in other parts of the project
export { findWord };

