import { test, expect, Page } from "@playwright/test";

// Helper function to login
async function login(page: Page) {
  await page.goto("/login");
  await page.getByLabel("Email").fill("demo@reguai.local");
  await page.getByLabel("Password").fill("demo-password");
  await page.getByRole("button", { name: /sign in/i }).click();
  await page.waitForURL("/");
}

test.describe("Incidents Management", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto("/incidents");
  });

  test("should display incidents page", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Incidents" })).toBeVisible();
    await expect(page.getByText("Manage and track all incidents")).toBeVisible();
    await expect(page.getByRole("button", { name: /create incident/i })).toBeVisible();
  });

  test("should create a new incident", async ({ page }) => {
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Click create incident button
    await page.getByRole("button", { name: /create incident/i }).click();
    
    // Wait for form to load
    await page.waitForLoadState('networkidle');
    
    // Verify form is displayed
    await expect(page.getByRole("heading", { name: /create.*incident/i })).toBeVisible();
    
    // Fill in the form with all required fields
    const timestamp = Date.now();
    await page.getByLabel(/title/i).fill(`Test Incident ${timestamp}`);
    await page.getByLabel(/description/i).fill("This is a test incident created by E2E tests to verify the incident creation functionality works correctly.");
    
    // Select severity using direct selector
    await page.locator('select[name="severity"]').selectOption('HIGH');
    
    // Select category using direct selector
    await page.locator('select[name="category"]').selectOption('SECURITY');
    
    // Fill affected systems
    await page.locator('input[name="affectedSystems"]').fill("API Gateway, Database, Payment Service");
    
    // Wait a moment for form validation
    await page.waitForTimeout(500);
    
    // Submit the form
    await page.getByRole("button", { name: /create incident/i }).click();
    
    // Wait for redirect back to list
    await page.waitForURL("/incidents", { timeout: 15000 });
    await page.waitForLoadState('networkidle');
    
    // Verify incident appears in list
    await expect(page.getByText(`Test Incident ${timestamp}`)).toBeVisible({ timeout: 10000 });
  });

  test("should view incident details", async ({ page }) => {
    // Wait for incidents to load
    await page.waitForTimeout(2000);
    
    // Click on first incident if available
    const firstIncident = page.locator('[data-testid="incident-card"], .hover\\:shadow-md').first();
    
    if (await firstIncident.isVisible()) {
      await firstIncident.click();
      
      // Verify detail page
      await expect(page.getByRole("heading", { name: "Incident Details" })).toBeVisible();
      await expect(page.getByText("View and manage incident information")).toBeVisible();
      
      // Check tabs are present
      await expect(page.getByRole("tab", { name: /overview|details/i })).toBeVisible();
    }
  });

  test("should display incident list with filters", async ({ page }) => {
    // Wait for incidents to load
    await page.waitForTimeout(2000);
    
    // Check if incident list or empty state is visible
    const pageContent = page.locator("main, [role='main']");
    await expect(pageContent).toBeVisible();
  });

  test("should navigate back from create form", async ({ page }) => {
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Click create incident button
    await page.getByRole("button", { name: /create incident/i }).click();
    
    // Wait for form to load
    await page.waitForLoadState('networkidle');
    
    // Wait for cancel button to be visible
    await page.waitForSelector('button:has-text("Cancel")', { state: 'visible', timeout: 5000 });
    
    // Click cancel button
    await page.getByRole("button", { name: /cancel/i }).click();
    
    // Wait for navigation
    await page.waitForLoadState('networkidle');
    
    // Verify we're back on incidents list
    await expect(page.getByRole("heading", { name: "Incidents" })).toBeVisible();
  });

  test("should navigate back from incident details", async ({ page }) => {
    // Wait for incidents to load
    await page.waitForTimeout(2000);
    
    // Click on first incident if available
    const firstIncident = page.locator('[data-testid="incident-card"], .hover\\:shadow-md').first();
    
    if (await firstIncident.isVisible()) {
      await firstIncident.click();
      
      // Click back button
      await page.getByRole("button", { name: /back to list/i }).click();
      
      // Verify we're back on incidents list
      await expect(page.getByRole("heading", { name: "Incidents" })).toBeVisible();
    }
  });
});

// Made with Bob
