import { test, expect, type Page } from '@playwright/test';
import { HomePage } from '../pages/home-page';

// AAA
//POM - page object model

const URL = 'https://playwright.dev/';
let homePage: HomePage;

test.beforeEach(async ({ page }) => {
  await page.goto(URL);
  homePage = new HomePage(page);
});

async function clickGetStarted(page: Page) {
  //await page.getByRole('link', { name: 'Get started' }).click();
  await homePage.clickGetStarted();
  // now using the POM created in pages/home-pages.ts
}

test.describe('Playwright website', () => {

  test('has title', async () => {
    // await expect(page).toHaveTitle(/Playwright/);
    // replace with:
    await homePage.assertPageTitle();
    // calls line 12. from class HomePage created in home-page.ts
  });

  test('get started link', async ({ page }) => {
    await clickGetStarted(page);
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });

  test('check Java page', async ({ page }) => {
    await clickGetStarted(page);
    await page.getByRole('button', { name: 'Node.js' }).hover();
    await page.getByText('Java', { exact: true }).click();
    await expect(page).toHaveURL('https://playwright.dev/java/docs/intro');
    await expect(page.getByText('Installing Playwright', { exact: true })).not.toBeVisible();
    const javaDescription = `Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.`
    await expect(page.getByText(javaDescription)).toBeVisible();
  });
})