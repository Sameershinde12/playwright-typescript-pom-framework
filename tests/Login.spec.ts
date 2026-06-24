import { test,expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import userData from '../tests-data/users.json';


test('Valid Login', async ({ page }) => {

     test.setTimeout(60000)

    const loginPage = new LoginPage(page);

await loginPage.navigate();

await loginPage.login(

      userData.standardUser.username,
      userData.standardUser.password
);

await expect(page).toHaveURL(/inventory/);
});

test('Invalid Login', async ({ page }) => {
    test.setTimeout(60000)

    const loginPage = new LoginPage(page);

    await loginPage.navigate();

    await loginPage.login(
        'wrong_user',
        'wrong_password'
    );

    await expect(page.locator('[data-test="error"]')).toBeVisible();

});


    