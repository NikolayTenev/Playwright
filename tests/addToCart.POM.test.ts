import { expect, test } from "@playwright/test";
import RegisterPage from "../pages/registerPage";
import LoginPage from "../pages/loginpage";
import HomePage from "../pages/homePage";
import SpecialHomePage from "../pages/specialHomePage";
import ShopingCartPage from "../pages/shopingCartPage";

const email = "testcaseNT3@abv.bb";
const phone = "088888888";
const password = "Qwerty123";

test.describe.only("Page object test demo", async () => {
  test("Register test_01", async ({ page, baseURL }) => {
    const register = new RegisterPage(page);
    await page.goto(`${baseURL}route=account/register`);
    await register.enterFirstName("niki");
    await register.enterLastname("Tenev");
    await register.enterEmail(email);
    await register.enterTelephone(phone);
    await register.enterPasword(password);
    await register.enterConfirmPassword(password);
    await register.clickTermAndCondition();
    await page.waitForTimeout(1000);
    await register.clickContinueBtn();

    await page.waitForTimeout(3000);
  });

  test("Login test_02", async ({ page, baseURL }) => {
    const login = new LoginPage(page);
    await page.goto(`${baseURL}route=account/login`);
    await login.enterEmail(email);
    await login.enterLoginPasword(password);
    await login.clickLoginBtn();

    expect(await page.title()).toBe("My Account");

    await page.waitForTimeout(3000);
  });

  test("Ad to cart test_03", async ({ page, baseURL }) => {
    const login = new LoginPage(page);
    const homePage = new HomePage(page);
    const specialHomePage = new SpecialHomePage(page);
    const shopingCartPage = new ShopingCartPage(page);
    await page.goto(`${baseURL}route=account/login`);
    await login.login(email, password);
    await homePage.clickOnHomeMenu();
    await specialHomePage.addFirstProductOnTheCart();
    const isCartVisible = await specialHomePage.isToastVisible();
    expect(isCartVisible).toBeVisible();
    await (await specialHomePage.isToastVisible()).click();
    expect(await page.title()).toBe("Shopping Cart");
    await shopingCartPage.refreshItemCart();
    await page.waitForTimeout(1000);
    await shopingCartPage.removeItemFromCart();
    await shopingCartPage.continueShopping();
    expect(await page.title()).toBe("Your Store");

    await page.waitForTimeout(1000);
  });
});
