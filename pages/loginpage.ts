import { Page } from "@playwright/test";
export default class LoginPage {
  constructor(public page: Page) {}

  async login(email: string, password: string) {
    await this.enterEmail(email);
    await this.enterLoginPasword(password);
    await this.clickLoginBtn();
  }

  async enterEmail(email: string) {
    await this.page.locator("#input-email").type(email);
  }

  async enterLoginPasword(password: string) {
    await this.page.locator("#input-password").type(password);
  }

  async clickLoginBtn() {
    await Promise.all([
      this.page.waitForNavigation(),
      this.page.click("input[value='Login']"),
    ]);
  }
}
