import { test, expect, Page } from "@playwright/test";

// Helper function to login
async function login(page: Page) {
  await page.goto("/login");
  await page.getByLabel("Email").fill("demo@reguai.local");
  await page.getByLabel("Password").fill("demo-password");
  await page.getByRole("button", { name: /sign in/i }).click();
  await page.waitForURL("/");
}

test.describe("Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test("should display dashboard with stats cards", async ({ page }) => {
    // Check main heading
    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
    await expect(page.getByText("Monitor and manage incidents in real-time")).toBeVisible();
    
    // Check for Create Incident button
    await expect(page.getByRole("button", { name: /create incident/i })).toBeVisible();
    
    // Check for stats cards (they should be visible even if data is loading)
    const statsSection = page.locator(".grid").first();
    await expect(statsSection).toBeVisible();
  });

  test("should display sidebar navigation", async ({ page }) => {
    // Check sidebar elements
    await expect(page.getByText("ReguAI")).toBeVisible();
    
    // Check navigation links
    const dashboardLink = page.getByRole("link", { name: /dashboard/i });
    const incidentsLink = page.getByRole("link", { name: /incidents/i });
    const tasksLink = page.getByRole("link", { name: /tasks/i });
    
    await expect(dashboardLink).toBeVisible();
    await expect(incidentsLink).toBeVisible();
    await expect(tasksLink).toBeVisible();
  });

  test("should navigate to incidents page", async ({ page }) => {
    await page.getByRole("link", { name: /incidents/i }).click();
    await page.waitForURL("/incidents");
    
    await expect(page.getByRole("heading", { name: "Incidents" })).toBeVisible();
  });

  test("should navigate to tasks page", async ({ page }) => {
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Click tasks link in sidebar
    await page.getByRole("link", { name: /tasks/i }).click();
    
    // Wait for navigation
    await page.waitForURL("/tasks", { timeout: 10000 });
    await page.waitForLoadState('networkidle');
    
    // Verify tasks page loaded
    await expect(page.getByRole("heading", { name: "Tasks" })).toBeVisible({ timeout: 10000 });
  });

  test("should display incident list on dashboard", async ({ page }) => {
    // Wait for incidents to load
    await page.waitForTimeout(2000);
    
    // Check if incident list or empty state is visible
    const incidentList = page.locator(".space-y-3, .space-y-4").last();
    await expect(incidentList).toBeVisible();
  });

  test("should open create incident form", async ({ page }) => {
    await page.getByRole("button", { name: /create incident/i }).click();
    
    // Wait for form to appear
    await expect(page.getByRole("heading", { name: "Create Incident" })).toBeVisible();
    await expect(page.getByText("Report a new incident")).toBeVisible();
    
    // Check form fields
    await expect(page.getByLabel(/title/i)).toBeVisible();
    await expect(page.getByLabel(/description/i)).toBeVisible();
    await expect(page.getByLabel(/severity/i)).toBeVisible();
  });
});

// Made with Bob
