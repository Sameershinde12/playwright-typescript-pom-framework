import { Page,expect } from '@playwright/test';

export class ProductPage {

    constructor(private page: Page) {}

    async getTitle() {
        return this.page.locator('.title');
    }
     async getProductCount() {
    return await this.page.locator('.inventory_item').count();
  }

  // Add product to cart by product name
  async addProductToCart(productName: string) {
    await this.page
      .locator('.inventory_item')
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  // Open cart
  async openCart() {
    await this.page.locator('.shopping_cart_link').click();
  }

  // Sort products
  async sortProducts(option: string) {
    await this.page.locator('[data-test="product-sort-container"]')
      .selectOption(option);
  }
  async verifyProductsVisible() {
    await expect(this.page.locator('.inventory_item')).toHaveCount(6);
}

}