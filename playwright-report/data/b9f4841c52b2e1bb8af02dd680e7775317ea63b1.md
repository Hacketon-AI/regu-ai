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

Locator: getByRole('heading', { name: /create.*incident/i })
Expected: visible
Error: strict mode violation: getByRole('heading', { name: /create.*incident/i }) resolved to 2 elements:
    1) <h1 class="text-3xl font-bold text-gray-900">Create Incident</h1> aka getByRole('heading', { name: 'Create Incident' })
    2) <h3 class="text-2xl font-semibold leading-none tracking-tight flex items-center gap-2">…</h3> aka getByRole('heading', { name: 'Create New Incident' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: /create.*incident/i })

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - complementary [ref=e3]:
      - generic [ref=e5]:
        - generic [ref=e7]: R
        - heading "ReguAI" [level=1] [ref=e8]
      - navigation [ref=e9]:
        - link "Dashboard" [ref=e10] [cursor=pointer]:
          - /url: /
          - img [ref=e11]
          - generic [ref=e16]: Dashboard
        - link "Incidents" [ref=e17] [cursor=pointer]:
          - /url: /incidents
          - img [ref=e18]
          - generic [ref=e20]: Incidents
        - link "Tasks" [ref=e21] [cursor=pointer]:
          - /url: /tasks
          - img [ref=e22]
          - generic [ref=e25]: Tasks
        - link "Settings" [ref=e26] [cursor=pointer]:
          - /url: /settings
          - img [ref=e27]
          - generic [ref=e30]: Settings
      - button "Collapse" [ref=e32]:
        - img [ref=e33]
        - generic [ref=e35]: Collapse
    - main [ref=e36]:
      - generic [ref=e38]:
        - generic [ref=e39]:
          - generic [ref=e40]:
            - heading "Create Incident" [level=1] [ref=e41]
            - paragraph [ref=e42]: Report a new incident
          - button "Back to List" [ref=e43]
        - generic [ref=e44]:
          - heading "Create New Incident" [level=3] [ref=e46]:
            - img [ref=e47]
            - text: Create New Incident
          - generic [ref=e49]:
            - generic [ref=e50]:
              - text: Incident Title *
              - textbox "Incident Title *" [ref=e51]:
                - /placeholder: Brief description of the incident
            - generic [ref=e52]:
              - text: Description *
              - textbox "Description *" [ref=e53]:
                - /placeholder: Detailed description of what happened...
            - generic [ref=e54]:
              - generic [ref=e55]:
                - text: Severity *
                - combobox "Severity *" [ref=e56]:
                  - option "Low"
                  - option "Medium" [selected]
                  - option "High"
                  - option "Critical"
              - generic [ref=e57]:
                - text: Category *
                - combobox "Category *" [ref=e58]:
                  - option "Security" [selected]
                  - option "Performance"
                  - option "Data Breach"
                  - option "Service Outage"
                  - option "Compliance"
                  - option "Other"
            - generic [ref=e59]:
              - text: Affected Systems
              - textbox "Affected Systems" [ref=e60]:
                - /placeholder: e.g., API Gateway, Database, Payment Service (comma-separated)
              - paragraph [ref=e61]: Enter system names separated by commas
            - generic [ref=e62]:
              - button "Cancel" [ref=e63]
              - button "Create Incident" [ref=e64]
  - alert [ref=e65]
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
  25  |     // Wait for page to be fully loaded
  26  |     await page.waitForLoadState('networkidle');
  27  |     
  28  |     // Click create incident button
  29  |     await page.getByRole("button", { name: /create incident/i }).click();
  30  |     
  31  |     // Wait for form to load
  32  |     await page.waitForLoadState('networkidle');
  33  |     
  34  |     // Verify form is displayed
> 35  |     await expect(page.getByRole("heading", { name: /create.*incident/i })).toBeVisible();
      |                                                                            ^ Error: expect(locator).toBeVisible() failed
  36  |     
  37  |     // Fill in the form with all required fields
  38  |     const timestamp = Date.now();
  39  |     await page.getByLabel(/title/i).fill(`Test Incident ${timestamp}`);
  40  |     await page.getByLabel(/description/i).fill("This is a test incident created by E2E tests to verify the incident creation functionality works correctly.");
  41  |     
  42  |     // Select severity using direct selector
  43  |     await page.locator('select[name="severity"]').selectOption('HIGH');
  44  |     
  45  |     // Select category using direct selector
  46  |     await page.locator('select[name="category"]').selectOption('SECURITY');
  47  |     
  48  |     // Fill affected systems
  49  |     await page.locator('input[name="affectedSystems"]').fill("API Gateway, Database, Payment Service");
  50  |     
  51  |     // Wait a moment for form validation
  52  |     await page.waitForTimeout(500);
  53  |     
  54  |     // Submit the form
  55  |     await page.getByRole("button", { name: /create incident/i }).click();
  56  |     
  57  |     // Wait for redirect back to list
  58  |     await page.waitForURL("/incidents", { timeout: 15000 });
  59  |     await page.waitForLoadState('networkidle');
  60  |     
  61  |     // Verify incident appears in list
  62  |     await expect(page.getByText(`Test Incident ${timestamp}`)).toBeVisible({ timeout: 10000 });
  63  |   });
  64  | 
  65  |   test("should view incident details", async ({ page }) => {
  66  |     // Wait for incidents to load
  67  |     await page.waitForTimeout(2000);
  68  |     
  69  |     // Click on first incident if available
  70  |     const firstIncident = page.locator('[data-testid="incident-card"], .hover\\:shadow-md').first();
  71  |     
  72  |     if (await firstIncident.isVisible()) {
  73  |       await firstIncident.click();
  74  |       
  75  |       // Verify detail page
  76  |       await expect(page.getByRole("heading", { name: "Incident Details" })).toBeVisible();
  77  |       await expect(page.getByText("View and manage incident information")).toBeVisible();
  78  |       
  79  |       // Check tabs are present
  80  |       await expect(page.getByRole("tab", { name: /overview|details/i })).toBeVisible();
  81  |     }
  82  |   });
  83  | 
  84  |   test("should display incident list with filters", async ({ page }) => {
  85  |     // Wait for incidents to load
  86  |     await page.waitForTimeout(2000);
  87  |     
  88  |     // Check if incident list or empty state is visible
  89  |     const pageContent = page.locator("main, [role='main']");
  90  |     await expect(pageContent).toBeVisible();
  91  |   });
  92  | 
  93  |   test("should navigate back from create form", async ({ page }) => {
  94  |     // Wait for page to be fully loaded
  95  |     await page.waitForLoadState('networkidle');
  96  |     
  97  |     // Click create incident button
  98  |     await page.getByRole("button", { name: /create incident/i }).click();
  99  |     
  100 |     // Wait for form to load
  101 |     await page.waitForLoadState('networkidle');
  102 |     
  103 |     // Wait for cancel button to be visible
  104 |     await page.waitForSelector('button:has-text("Cancel")', { state: 'visible', timeout: 5000 });
  105 |     
  106 |     // Click cancel button
  107 |     await page.getByRole("button", { name: /cancel/i }).click();
  108 |     
  109 |     // Wait for navigation
  110 |     await page.waitForLoadState('networkidle');
  111 |     
  112 |     // Verify we're back on incidents list
  113 |     await expect(page.getByRole("heading", { name: "Incidents" })).toBeVisible();
  114 |   });
  115 | 
  116 |   test("should navigate back from incident details", async ({ page }) => {
  117 |     // Wait for incidents to load
  118 |     await page.waitForTimeout(2000);
  119 |     
  120 |     // Click on first incident if available
  121 |     const firstIncident = page.locator('[data-testid="incident-card"], .hover\\:shadow-md').first();
  122 |     
  123 |     if (await firstIncident.isVisible()) {
  124 |       await firstIncident.click();
  125 |       
  126 |       // Click back button
  127 |       await page.getByRole("button", { name: /back to list/i }).click();
  128 |       
  129 |       // Verify we're back on incidents list
  130 |       await expect(page.getByRole("heading", { name: "Incidents" })).toBeVisible();
  131 |     }
  132 |   });
  133 | });
  134 | 
  135 | // Made with Bob
```