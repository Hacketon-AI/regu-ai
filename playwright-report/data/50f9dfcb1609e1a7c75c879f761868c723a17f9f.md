# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: incidents.spec.ts >> Incidents Management >> should create a new incident
- Location: tests\e2e\incidents.spec.ts:24:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Test Incident 1779018902605')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByText('Test Incident 1779018902605')

```

```yaml
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
  - heading "Create Incident" [level=1]
  - paragraph: Report a new incident
  - button "Back to List"
  - heading "Create New Incident" [level=3]
  - text: Incident Title *
  - textbox "Incident Title *":
    - /placeholder: Brief description of the incident
    - text: Test Incident 1779018902605
  - text: Description *
  - textbox "Description *":
    - /placeholder: Detailed description of what happened...
    - text: This is a test incident created by E2E tests
  - text: Severity *
  - combobox "Severity *":
    - option "Low"
    - option "Medium" [selected]
    - option "High"
    - option "Critical"
  - text: Category *
  - combobox "Category *":
    - option "Security" [selected]
    - option "Performance"
    - option "Data Breach"
    - option "Service Outage"
    - option "Compliance"
    - option "Other"
  - text: Affected Systems
  - textbox "Affected Systems":
    - /placeholder: e.g., API Gateway, Database, Payment Service (comma-separated)
    - text: API Gateway
  - paragraph: Enter system names separated by commas
  - button "Cancel"
  - button "Create Incident"
- alert
```

# Test source

```ts
  1   | import { test, expect, Page } from "@playwright/test";
  2   | 
  3   | // Helper function to login
  4   | async function login(page: Page) {
  5   |   await page.goto("/login");
  6   |   await page.getByLabel("Email").fill("demo@reguai.local");
  7   |   await page.getByLabel("Password").fill("demo-password");
  8   |   await page.getByRole("button", { name: /sign in/i }).click();
  9   |   await page.waitForURL("/");
  10  | }
  11  | 
  12  | test.describe("Incidents Management", () => {
  13  |   test.beforeEach(async ({ page }) => {
  14  |     await login(page);
  15  |     await page.goto("/incidents");
  16  |   });
  17  | 
  18  |   test("should display incidents page", async ({ page }) => {
  19  |     await expect(page.getByRole("heading", { name: "Incidents" })).toBeVisible();
  20  |     await expect(page.getByText("Manage and track all incidents")).toBeVisible();
  21  |     await expect(page.getByRole("button", { name: /create incident/i })).toBeVisible();
  22  |   });
  23  | 
  24  |   test("should create a new incident", async ({ page }) => {
  25  |     // Click create incident button
  26  |     await page.getByRole("button", { name: /create incident/i }).click();
  27  |     
  28  |     // Verify form is displayed
  29  |     await expect(page.getByRole("heading", { name: "Create Incident" })).toBeVisible();
  30  |     
  31  |     // Fill in the form
  32  |     const timestamp = Date.now();
  33  |     await page.getByLabel(/title/i).fill(`Test Incident ${timestamp}`);
  34  |     await page.getByLabel(/description/i).fill("This is a test incident created by E2E tests");
  35  |     
  36  |     // Select severity
  37  |     const severitySelect = page.locator('select, [role="combobox"]').filter({ hasText: /severity/i }).first();
  38  |     if (await severitySelect.isVisible()) {
  39  |       await severitySelect.selectOption({ label: "High" });
  40  |     }
  41  |     
  42  |     // Select category
  43  |     const categorySelect = page.locator('select, [role="combobox"]').filter({ hasText: /category/i }).first();
  44  |     if (await categorySelect.isVisible()) {
  45  |       await categorySelect.selectOption({ index: 1 });
  46  |     }
  47  |     
  48  |     // Fill affected systems
  49  |     const affectedSystemsInput = page.getByLabel(/affected system/i);
  50  |     if (await affectedSystemsInput.isVisible()) {
  51  |       await affectedSystemsInput.fill("API Gateway");
  52  |     }
  53  |     
  54  |     // Submit the form
  55  |     await page.getByRole("button", { name: /create|submit/i }).click();
  56  |     
  57  |     // Wait for redirect back to list
  58  |     await page.waitForURL("/incidents", { timeout: 10000 });
  59  |     
  60  |     // Verify incident appears in list
> 61  |     await expect(page.getByText(`Test Incident ${timestamp}`)).toBeVisible({ timeout: 10000 });
      |                                                                ^ Error: expect(locator).toBeVisible() failed
  62  |   });
  63  | 
  64  |   test("should view incident details", async ({ page }) => {
  65  |     // Wait for incidents to load
  66  |     await page.waitForTimeout(2000);
  67  |     
  68  |     // Click on first incident if available
  69  |     const firstIncident = page.locator('[data-testid="incident-card"], .hover\\:shadow-md').first();
  70  |     
  71  |     if (await firstIncident.isVisible()) {
  72  |       await firstIncident.click();
  73  |       
  74  |       // Verify detail page
  75  |       await expect(page.getByRole("heading", { name: "Incident Details" })).toBeVisible();
  76  |       await expect(page.getByText("View and manage incident information")).toBeVisible();
  77  |       
  78  |       // Check tabs are present
  79  |       await expect(page.getByRole("tab", { name: /overview|details/i })).toBeVisible();
  80  |     }
  81  |   });
  82  | 
  83  |   test("should display incident list with filters", async ({ page }) => {
  84  |     // Wait for incidents to load
  85  |     await page.waitForTimeout(2000);
  86  |     
  87  |     // Check if incident list or empty state is visible
  88  |     const pageContent = page.locator("main, [role='main']");
  89  |     await expect(pageContent).toBeVisible();
  90  |   });
  91  | 
  92  |   test("should navigate back from create form", async ({ page }) => {
  93  |     // Click create incident button
  94  |     await page.getByRole("button", { name: /create incident/i }).click();
  95  |     
  96  |     // Click back button
  97  |     await page.getByRole("button", { name: /back to list/i }).click();
  98  |     
  99  |     // Verify we're back on incidents list
  100 |     await expect(page.getByRole("heading", { name: "Incidents" })).toBeVisible();
  101 |   });
  102 | 
  103 |   test("should navigate back from incident details", async ({ page }) => {
  104 |     // Wait for incidents to load
  105 |     await page.waitForTimeout(2000);
  106 |     
  107 |     // Click on first incident if available
  108 |     const firstIncident = page.locator('[data-testid="incident-card"], .hover\\:shadow-md').first();
  109 |     
  110 |     if (await firstIncident.isVisible()) {
  111 |       await firstIncident.click();
  112 |       
  113 |       // Click back button
  114 |       await page.getByRole("button", { name: /back to list/i }).click();
  115 |       
  116 |       // Verify we're back on incidents list
  117 |       await expect(page.getByRole("heading", { name: "Incidents" })).toBeVisible();
  118 |     }
  119 |   });
  120 | });
  121 | 
  122 | // Made with Bob
  123 | 
```