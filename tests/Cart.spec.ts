import { CartPage } from '../Pages/CartPage';
import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { ProductPage } from '../Pages/ProductPage';
import userData from '../tests-data/users.json';

test('Remove Product From Cart', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  await loginPage.navigate();

  await loginPage.login(
      userData.standardUser.username,
      userData.standardUser.password
  );

  await productPage.addProductToCart(
    'Sauce Labs Backpack'
  );

  await productPage.openCart();

  await cartPage.removeProduct(
    'Sauce Labs Backpack'
  );

  await expect(
       page.locator('.inventory_item_name')
      .filter({ hasText: 'Sauce Labs Backpack' })
  ).toHaveCount(0);
});