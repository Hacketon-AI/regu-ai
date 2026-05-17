import { Page } from "@playwright/test";

export async function login(page: Page) {
  await page.goto("/login");
  await page.getByLabel("Email").fill("demo@reguai.local");
  await page.getByLabel("Password").fill("demo-password");
  await page.getByRole("button", { name: /sign in/i }).click();
  await page.waitForURL("/");
}

export async function logout(page: Page) {
  const logoutButton = page.getByRole("button", { name: /logout|sign out/i });
  if (await logoutButton.isVisible()) {
    await logoutButton.click();
    await page.waitForURL("/login");
  }
}

// Made with Bob
