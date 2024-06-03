import { Page } from "@playwright/test";
export default class RegisterPage {
  constructor(public page: Page) {}

  async enterFirstName(firstname: string) {
    await this.page.locator("#input-firstname").type(firstname);
  }

  async enterLastname(lastname: string) {
    await this.page.locator("#input-lastname").type(lastname);
  }

  async enterEmail(email: string) {
    await this.page.locator("#input-email").type(email);
  }

  async enterTelephone(phone: string) {
    await this.page.locator("#input-telephone").type(phone);
  }

  async enterPasword(password: string) {
    await this.page.locator("#input-password").type(password);
  }

  async enterConfirmPassword(password: string) {
    await this.page.locator("#input-confirm").type(password);
  }

  async isSubscribeChecked() {
    return await this.page.locator("#input-newsletter-no").isChecked();
  }

  async clickTermAndCondition() {
    this.page.click(
      "//div[@class='buttons clearfix']//div[@class='custom-control custom-checkbox custom-control-inline']"
    );
  }

  async clickContinueBtn() {
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: "networkidle" }),
      this.page.click("input[value='Continue']"),
    ]);
  }
}
