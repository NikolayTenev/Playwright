import { Page } from "@playwright/test";
import { strict } from "assert";
export default class SpecialHomePage {
  constructor(public page: Page) {}

  async addFirstProductOnTheCart() {
    const elementHandle = this.page.locator("//*[@id='entry_213244']/a/div");
    await elementHandle.scrollIntoViewIfNeeded();
    await this.page.hover("//*[@id='entry_213244']/a/div", { strict: false });
    await this.page.click("//*[@id='entry_213244']/a/div");
    await this.page.hover("//div[@class='image']/a", { strict: false });
    await this.page.locator("(//button[@title='Add to Cart'])").nth(0).click();
  }

  async isToastVisible() {
    const toast = this.page.locator("//a[@class='btn btn-primary btn-block']");
    await toast.waitFor({ state: "visible" });
    return toast;
  }
}
