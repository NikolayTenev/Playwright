import { Page } from "@playwright/test";

export default class ShopingCartPage {
  constructor(public page: Page) {}

  async refreshItemCart() {
    await this.page
      .locator("//*[@class='input-group-append']//i[@class='fas fa-sync-alt']")
      .click();
  }

  async removeItemFromCart() {
    await this.page.locator("//button[@class='btn btn-danger']").click();
  }

  async continueShopping() {
    await this.page.locator("//*[@class='buttons']//a").click();
  }
}
