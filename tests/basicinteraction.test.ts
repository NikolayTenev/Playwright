// Импорт на необходимите модули от Playwright
import { expect, test } from "@playwright/test";

// Дефиниране на тестовия случай със синтаксиса на Playwright
test("Registration Test", async ({ page }) => {
  // Отиди на зададения URL адрес
  await page.goto("https://www.fortissio.com/register/");

  // Намери елемента в страницата, който съдържа текстовото поле за име
  const messageInput = page.locator("//*[@id='mainForm']/div[1]/label");

  // Ако елементът не е видим, превърти страницата, за да го направи видим
  await messageInput.scrollIntoViewIfNeeded();

  // Изпечатай стойността на атрибута "placeholder" на текстовото поле за име
  console.log(await messageInput.getAttribute("placeholder"));

  // Провери дали текстът в текстовото поле съдържа "Full name"
  expect(messageInput).toContainText("Full name");

  // Изпечатай текущата стойност на текстовото поле за име
  console.log(await messageInput.inputValue());

  // Попълни текстовото поле за име със стойност "test case"
  await messageInput.fill("test case");
});
