

import { expect, test } from "@playwright/test";
import { ArrFounded, findWord } from "../pages/wordpage";
import { RegistrationLPs } from "../data/RegistrationLPs/urls";
import { badWords } from "../data/LPs/specialWords";
import { isBlock } from "typescript";


test.slow();



test.setTimeout(900000);

const LPstradesUrls1 = RegistrationLPs.slice(0, 50);

for (let j = 0; j < LPstradesUrls1.length; j++) {
  test(`Check word_10 - Page ${j+1}`, async ({ page }) => {
    const URL = `https://static-plexop.s3.amazonaws.com/${LPstradesUrls1[j]}`;
    const arrFounded: ArrFounded = [];

    try {
      await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 500000 });

      // Изчакване за зареждане на страницата
      await page.waitForLoadState("networkidle", { timeout: 500000 });

      // скрипт за рандом имейл
      let email = `testcase.mailcheckNR465${Math.floor(
        Math.random() * 10000
      )}@abv.bb`;

      // скрипт за рандом телефонен номер
      let phoneNumber = `${Math.floor(Math.random() * 10000000)
        .toString()
        .replace(/^(0|1)/, "")}`;
      phoneNumber = `088${phoneNumber.padStart(7, "2")}`;

      // принт на имейла и телефона във репорта
      console.log(email);
      console.log(phoneNumber);

      // Попълни формата в новата страница
      await page.fill("#fullname", "Test Case");
      await page.fill("#email", email);
      await page.fill(
        ".nxreg-sign-up-phone-number-wrapper input,#phone-number,#mobile",
        phoneNumber
      );

      // // Изчакване да се появи чекбоксът
      const checkbox = await page.locator("input#privacy-notice,#privacy-notice");
      

      // Проверка за видимост на чекбокса
      const isVisible = await checkbox.isVisible();
      
      // Проверка за състояние на чекбокса (отметнат ли е)
      const isChecked = await checkbox.isChecked();
      
      // Ако чекбоксът е видим и не е отметнат, кликваме върху него
      if (checkbox && isVisible && !isChecked && !isBlock ) {
          await checkbox.click();
      }

      // Изчакване на формата да се изпрати
      await page.waitForTimeout(3000);

      // Кликване на бутона за регистрация
      const submitButton1 = await page.$("#submit_button");
      const submitButton2 = await page.$("[type='submit']");

      if (submitButton1) {
        await submitButton1.click();
      } else if (submitButton2) {
        await submitButton2.click();
      } else {
        console.error("Submit button not found.");
      }

      // Изчакване на презареждането на страницата след регистрация
      await Promise.race([
        page.waitForNavigation({ timeout: 10000 }), // Изчакайте зареждането на страницата до 10 секунди
        page.waitForTimeout(10000) // Или изчакайте 10 секунди, ако няма навигация
      ]);

      // Търсене на думи на страницата
      await findWord(page, arrFounded, badWords);
    } catch (error) {
      console.log("Error:", URL);
      throw error;
    }

    arrFounded.forEach((element) => {
      expect(
        (() => {
          console.log(`URL: "${element.url}", word:${element.word}`);
          return element.isFound === true;
        })()
      ).toBe(true);
    });
  });
}
