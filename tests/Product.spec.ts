import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { ProductPage } from '../Pages/ProductPage';
import userData from '../tests-data/users.json';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(
         userData.standardUser.username,
         userData.standardUser.password
    );
});

test('Verify Products Page', async ({ page }) => {
      const productPage = new ProductPage(page);
      await expect(
      await productPage.getTitle()
    ).toHaveText('Products');
});

test('Verify Product Count', async ({ page }) => {
      const productPage = new ProductPage(page);
      const count = await productPage.getProductCount();
      expect(count).toBe(6);
});
  
test('Add Product To Cart', async ({ page }) => {
      const productPage = new ProductPage(page);
      await productPage.addProductToCart(
       'Sauce Labs Backpack'
  );

  await expect(
    page.locator('.shopping_cart_badge')
  ).toHaveText('1');
});

test('Open Cart', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.openCart();
    await expect(page).toHaveURL(/cart/);
});

test('Sort Products Price Low To High', async ({ page }) => {
    const productPage = new ProductPage(page);
    await productPage.sortProducts('lohi');
});