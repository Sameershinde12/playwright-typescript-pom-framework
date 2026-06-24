import { Page, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Verify product exists in cart
  async verifyProductInCart(productName: string) {
    await expect(
      this.page.locator('.inventory_item_name')
        .filter({ hasText: productName })
    ).toBeVisible();
  }

  // Remove product from cart
  async removeProduct(productName: string) {
    await this.page
      .locator('.cart_item')
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Remove' })
      .click();
  }

  // Click checkout button
  async checkout() {
    await this.page.locator('[data-test="checkout"]').click();
  }
}