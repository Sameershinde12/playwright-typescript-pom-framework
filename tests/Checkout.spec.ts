import { test } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { ProductPage } from '../Pages/ProductPage';
import { CartPage } from '../Pages/CartPage';
import { CheckoutPage } from '../Pages/CheckoutPage';
import userData from '../tests-data/users.json';

test('Checkout Product', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.navigate();

  await loginPage.login(
    userData.standardUser.username,
      userData.standardUser.password
  );

  await productPage.addProductToCart('Sauce Labs Backpack');

  await productPage.openCart();

  await cartPage.checkout();

  await checkoutPage.fillCheckoutInfo(
    'John',
    'Doe',
    '422001'
  );

  await checkoutPage.continueCheckout();

  await checkoutPage.finishCheckout();

  await checkoutPage.verifyOrderSuccess();
});