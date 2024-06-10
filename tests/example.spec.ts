import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

/**
 * MAke sure the browser window is wide enough to show the dropdowns at the top.
 * 
 * 1. Open the page
 * 2. Click on Get Started
 * 3. Mouse hover over the Language dropdown - indicated by Node.js
 * 4. Click at Java
 * 5. Check the URL
 * 6. Check the text "Installing Playwright" is not being displayed
 * 7. Check the text below is Displayed
 * 
 * Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.
*/

test.only('check Java page', async ({ page }) => {
  // 1.
  page.goto('https://playwright.dev');
  // 2.
  await page.getByRole('link', { name: 'Get started' }).click();
  // 3.
  await page.getByRole('button', { name: 'Node.js' }).hover();
  // 4.  
  await page.getByText('Java').click();
  // 5.
  await expect(page).toHaveURL('https://playwright.dev/java/docs/intro');
  // 6.
  await expect(page.getByText('Installing Playwright', { exact: true })).not.toBeVisible();
  // 7. declare a variable first becasue the text is long.
  const javaDescription = `Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.`
  await expect(page.getByText(javaDescription)).toBeVisible();

});