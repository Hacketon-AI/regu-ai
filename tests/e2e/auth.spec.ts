import { test, expect } from "@playwright/test";

test.describe("Authentication Flow", () => {
  test("should display login page with demo credentials", async ({ page }) => {
    await page.goto("/login");
    
    // Check page title and branding
    await expect(page.getByText("Welcome to ReguAI")).toBeVisible();
    await expect(page.getByText("Sign in to access your incident management dashboard")).toBeVisible();
    
    // Check form elements
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();
    
    // Check demo credentials are displayed
    await expect(page.getByText("Demo Credentials:")).toBeVisible();
    await expect(page.getByText("Email: demo@reguai.local")).toBeVisible();
    await expect(page.getByText("Password: demo-password")).toBeVisible();
  });

  test("should show error for invalid credentials", async ({ page }) => {
    await page.goto("/login");
    
    // Fill in invalid credentials
    await page.getByLabel("Email").fill("invalid@example.com");
    await page.getByLabel("Password").fill("wrongpassword");
    
    // Submit form
    await page.getByRole("button", { name: /sign in/i }).click();
    
    // Check for error message
    await expect(page.getByText(/invalid email or password/i)).toBeVisible();
  });

  test("should successfully login with demo credentials", async ({ page }) => {
    await page.goto("/login");
    
    // Fill in demo credentials
    await page.getByLabel("Email").fill("demo@reguai.local");
    await page.getByLabel("Password").fill("demo-password");
    
    // Submit form
    await page.getByRole("button", { name: /sign in/i }).click();
    
    // Wait for navigation to dashboard
    await page.waitForURL("/");
    
    // Verify we're on the dashboard
    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
    await expect(page.getByText("Monitor and manage incidents in real-time")).toBeVisible();
  });

  test("should redirect to login when accessing protected route without auth", async ({ page }) => {
    // Try to access dashboard without authentication
    await page.goto("/");
    
    // Should redirect to login
    await page.waitForURL("/login");
    await expect(page.getByText("Welcome to ReguAI")).toBeVisible();
  });

  test("should logout successfully", async ({ page }) => {
    // Login first
    await page.goto("/login");
    await page.getByLabel("Email").fill("demo@reguai.local");
    await page.getByLabel("Password").fill("demo-password");
    await page.getByRole("button", { name: /sign in/i }).click();
    await page.waitForURL("/");
    
    // Find and click logout button (assuming it's in the sidebar)
    const logoutButton = page.getByRole("button", { name: /logout|sign out/i });
    if (await logoutButton.isVisible()) {
      await logoutButton.click();
      
      // Should redirect to login
      await page.waitForURL("/login");
      await expect(page.getByText("Welcome to ReguAI")).toBeVisible();
    }
  });
});

// Made with Bob
