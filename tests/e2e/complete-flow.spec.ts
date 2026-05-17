import { test, expect } from "@playwright/test";
import { login } from "./helpers/auth";

test.describe("Complete User Flow", () => {
  test("should complete full incident management workflow", async ({ page }) => {
    // Step 1: Login
    await login(page);
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
    
    // Step 2: Navigate to incidents page
    await page.getByRole("link", { name: /incidents/i }).click();
    await page.waitForURL("/incidents", { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole("heading", { name: "Incidents" })).toBeVisible();
    
    // Step 3: Create a new incident
    await page.getByRole("button", { name: /create incident/i }).click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole("heading", { name: /create.*incident/i })).toBeVisible();
    
    const timestamp = Date.now();
    const incidentTitle = `E2E Test Incident ${timestamp}`;
    
    await page.getByLabel(/title/i).fill(incidentTitle);
    await page.getByLabel(/description/i).fill("Complete workflow test incident with full details for E2E testing");
    
    // Use direct selectors for form fields
    await page.locator('select[name="severity"]').selectOption('HIGH');
    await page.locator('select[name="category"]').selectOption('SECURITY');
    await page.locator('input[name="affectedSystems"]').fill("Payment Gateway, API Server");
    
    // Wait for form validation
    await page.waitForTimeout(500);
    
    // Submit the form
    await page.getByRole("button", { name: /create incident/i }).click();
    await page.waitForURL("/incidents", { timeout: 15000 });
    await page.waitForLoadState('networkidle');
    
    // Step 4: Verify incident appears in list
    await expect(page.getByText(incidentTitle)).toBeVisible({ timeout: 10000 });
    
    // Step 5: View incident details
    await page.getByText(incidentTitle).click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole("heading", { name: "Incident Details" })).toBeVisible();
    
    // Step 6: Check incident tabs
    const overviewTab = page.getByRole("tab", { name: /overview|details/i });
    if (await overviewTab.isVisible()) {
      await overviewTab.click();
      await page.waitForTimeout(500);
    }
    
    // Step 7: Navigate back to dashboard
    await page.getByRole("link", { name: /dashboard/i }).click();
    await page.waitForURL("/", { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
    
    // Step 8: Check tasks page
    await page.getByRole("link", { name: /tasks/i }).click();
    await page.waitForURL("/tasks", { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole("heading", { name: "Tasks" })).toBeVisible({ timeout: 10000 });
    
    // Step 9: Return to dashboard
    await page.getByRole("link", { name: /dashboard/i }).click();
    await page.waitForURL("/", { timeout: 10000 });
    await page.waitForLoadState('networkidle');
  });

  test("should handle navigation between all pages", async ({ page }) => {
    await login(page);
    await page.waitForLoadState('networkidle');
    
    // Dashboard -> Incidents
    await page.getByRole("link", { name: /incidents/i }).click();
    await page.waitForURL("/incidents", { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole("heading", { name: "Incidents" })).toBeVisible({ timeout: 10000 });
    
    // Incidents -> Tasks
    await page.getByRole("link", { name: /tasks/i }).click();
    await page.waitForURL("/tasks", { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole("heading", { name: "Tasks" })).toBeVisible({ timeout: 10000 });
    
    // Tasks -> Dashboard
    await page.getByRole("link", { name: /dashboard/i }).click();
    await page.waitForURL("/", { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible({ timeout: 10000 });
    
    // Dashboard -> Settings (if available)
    const settingsLink = page.getByRole("link", { name: /settings/i });
    if (await settingsLink.isVisible()) {
      await settingsLink.click();
      await page.waitForURL("/settings", { timeout: 10000 });
      await page.waitForLoadState('networkidle');
    }
  });

  test("should display consistent UI elements across pages", async ({ page }) => {
    await login(page);
    
    // Check sidebar on dashboard
    await expect(page.getByText("ReguAI")).toBeVisible();
    
    // Navigate to incidents
    await page.goto("/incidents");
    await expect(page.getByText("ReguAI")).toBeVisible();
    
    // Navigate to tasks
    await page.goto("/tasks");
    await expect(page.getByText("ReguAI")).toBeVisible();
  });

  test("should handle form validation", async ({ page }) => {
    await login(page);
    await page.goto("/incidents");
    
    // Open create form
    await page.getByRole("button", { name: /create incident/i }).click();
    
    // Try to submit empty form
    await page.getByRole("button", { name: /create|submit/i }).click();
    
    // Form should still be visible (validation prevents submission)
    await expect(page.getByRole("heading", { name: "Create Incident" })).toBeVisible();
  });
});

// Made with Bob
