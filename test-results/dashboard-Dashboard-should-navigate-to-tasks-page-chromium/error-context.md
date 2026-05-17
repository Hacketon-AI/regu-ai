# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dashboard.spec.ts >> Dashboard >> should navigate to tasks page
- Location: tests\e2e\dashboard.spec.ts:51:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Tasks' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: 'Tasks' })

```

```yaml
- alert
- complementary:
  - text: R
  - heading "ReguAI" [level=1]
  - navigation:
    - link "Dashboard":
      - /url: /
    - link "Incidents":
      - /url: /incidents
    - link "Tasks":
      - /url: /tasks
    - link "Settings":
      - /url: /settings
  - button "Collapse"
- main:
  - paragraph: Loading tasks...
```

# Test source

```ts
  1  | import { test, expect, Page } from "@playwright/test";
  2  | 
  3  | // Helper function to login
  4  | async function login(page: Page) {
  5  |   await page.goto("/login");
  6  |   await page.getByLabel("Email").fill("demo@reguai.local");
  7  |   await page.getByLabel("Password").fill("demo-password");
  8  |   await page.getByRole("button", { name: /sign in/i }).click();
  9  |   await page.waitForURL("/");
  10 | }
  11 | 
  12 | test.describe("Dashboard", () => {
  13 |   test.beforeEach(async ({ page }) => {
  14 |     await login(page);
  15 |   });
  16 | 
  17 |   test("should display dashboard with stats cards", async ({ page }) => {
  18 |     // Check main heading
  19 |     await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  20 |     await expect(page.getByText("Monitor and manage incidents in real-time")).toBeVisible();
  21 |     
  22 |     // Check for Create Incident button
  23 |     await expect(page.getByRole("button", { name: /create incident/i })).toBeVisible();
  24 |     
  25 |     // Check for stats cards (they should be visible even if data is loading)
  26 |     const statsSection = page.locator(".grid").first();
  27 |     await expect(statsSection).toBeVisible();
  28 |   });
  29 | 
  30 |   test("should display sidebar navigation", async ({ page }) => {
  31 |     // Check sidebar elements
  32 |     await expect(page.getByText("ReguAI")).toBeVisible();
  33 |     
  34 |     // Check navigation links
  35 |     const dashboardLink = page.getByRole("link", { name: /dashboard/i });
  36 |     const incidentsLink = page.getByRole("link", { name: /incidents/i });
  37 |     const tasksLink = page.getByRole("link", { name: /tasks/i });
  38 |     
  39 |     await expect(dashboardLink).toBeVisible();
  40 |     await expect(incidentsLink).toBeVisible();
  41 |     await expect(tasksLink).toBeVisible();
  42 |   });
  43 | 
  44 |   test("should navigate to incidents page", async ({ page }) => {
  45 |     await page.getByRole("link", { name: /incidents/i }).click();
  46 |     await page.waitForURL("/incidents");
  47 |     
  48 |     await expect(page.getByRole("heading", { name: "Incidents" })).toBeVisible();
  49 |   });
  50 | 
  51 |   test("should navigate to tasks page", async ({ page }) => {
  52 |     await page.getByRole("link", { name: /tasks/i }).click();
  53 |     await page.waitForURL("/tasks");
  54 |     
> 55 |     await expect(page.getByRole("heading", { name: "Tasks" })).toBeVisible();
     |                                                                ^ Error: expect(locator).toBeVisible() failed
  56 |   });
  57 | 
  58 |   test("should display incident list on dashboard", async ({ page }) => {
  59 |     // Wait for incidents to load
  60 |     await page.waitForTimeout(2000);
  61 |     
  62 |     // Check if incident list or empty state is visible
  63 |     const incidentList = page.locator(".space-y-3, .space-y-4").last();
  64 |     await expect(incidentList).toBeVisible();
  65 |   });
  66 | 
  67 |   test("should open create incident form", async ({ page }) => {
  68 |     await page.getByRole("button", { name: /create incident/i }).click();
  69 |     
  70 |     // Wait for form to appear
  71 |     await expect(page.getByRole("heading", { name: "Create Incident" })).toBeVisible();
  72 |     await expect(page.getByText("Report a new incident")).toBeVisible();
  73 |     
  74 |     // Check form fields
  75 |     await expect(page.getByLabel(/title/i)).toBeVisible();
  76 |     await expect(page.getByLabel(/description/i)).toBeVisible();
  77 |     await expect(page.getByLabel(/severity/i)).toBeVisible();
  78 |   });
  79 | });
  80 | 
  81 | // Made with Bob
  82 | 
```