import { expect } from '@playwright/test';
import { test } from '../Fixtures/fixture';
import userData from '../tests-data/users.json';

test('Complete Order Flow', async ({
    page,
    loginPage,
    productPage,
    cartPage,
    checkoutPage
}) => {

    // Login
    await loginPage.navigate();
    await loginPage.login(
       userData.standardUser.username,
      userData.standardUser.password
    );

    // Add product
    await productPage.addProductToCart(
        'Sauce Labs Backpack'
    );

    // Open cart
    await productPage.openCart();

    // Checkout
    await cartPage.checkout();

    // Fill customer information
    await checkoutPage.fillCheckoutInfo(
        'John',
        'Doe',
        '422001'
    );

    // Continue checkout
    await checkoutPage.continueCheckout();

    // Finish order
    await checkoutPage.finishCheckout();

    // Verify success message
    await expect(
        page.locator('.complete-header')
    ).toHaveText('Thank you for your order!');
});