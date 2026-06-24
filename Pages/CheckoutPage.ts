import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Fill customer details
  async fillCheckoutInfo(
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.page.locator('[data-test="firstName"]').fill(firstName);
    await this.page.locator('[data-test="lastName"]').fill(lastName);
    await this.page.locator('[data-test="postalCode"]').fill(postalCode);
  }

  // Click Continue
  async continueCheckout() {
    await this.page.locator('[data-test="continue"]').click();
  }

  // Click Finish
  async finishCheckout() {
    await this.page.locator('[data-test="finish"]').click();
  }

  // Verify order success
  async verifyOrderSuccess() {
    await expect(
      this.page.locator('.complete-header')
    ).toHaveText('Thank you for your order!');
  }
}