# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: complete-flow.spec.ts >> Complete User Flow >> should complete full incident management workflow
- Location: tests\e2e\complete-flow.spec.ts:5:7

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
  - alert [ref=e2]
  - generic [ref=e3]:
    - complementary [ref=e4]:
      - generic [ref=e6]:
        - generic [ref=e8]: R
        - heading "ReguAI" [level=1] [ref=e9]
      - navigation [ref=e10]:
        - link "Dashboard" [ref=e11] [cursor=pointer]:
          - /url: /
          - img [ref=e12]
          - generic [ref=e17]: Dashboard
        - link "Incidents" [ref=e18] [cursor=pointer]:
          - /url: /incidents
          - img [ref=e19]
          - generic [ref=e21]: Incidents
        - link "Tasks" [ref=e22] [cursor=pointer]:
          - /url: /tasks
          - img [ref=e23]
          - generic [ref=e26]: Tasks
        - link "Settings" [ref=e27] [cursor=pointer]:
          - /url: /settings
          - img [ref=e28]
          - generic [ref=e31]: Settings
      - button "Collapse" [ref=e33]:
        - img [ref=e34]
        - generic [ref=e36]: Collapse
    - main [ref=e37]:
      - generic [ref=e39]:
        - generic [ref=e40]:
          - generic [ref=e41]:
            - heading "Create Incident" [level=1] [ref=e42]
            - paragraph [ref=e43]: Report a new incident
          - button "Back to List" [ref=e44]
        - generic [ref=e45]:
          - heading "Create New Incident" [level=3] [ref=e47]:
            - img [ref=e48]
            - text: Create New Incident
          - generic [ref=e50]:
            - generic [ref=e51]:
              - text: Incident Title *
              - textbox "Incident Title *" [ref=e52]:
                - /placeholder: Brief description of the incident
            - generic [ref=e53]:
              - text: Description *
              - textbox "Description *" [ref=e54]:
                - /placeholder: Detailed description of what happened...
            - generic [ref=e55]:
              - generic [ref=e56]:
                - text: Severity *
                - combobox "Severity *" [ref=e57]:
                  - option "Low"
                  - option "Medium" [selected]
                  - option "High"
                  - option "Critical"
              - generic [ref=e58]:
                - text: Category *
                - combobox "Category *" [ref=e59]:
                  - option "Security" [selected]
                  - option "Performance"
                  - option "Data Breach"
                  - option "Service Outage"
                  - option "Compliance"
                  - option "Other"
            - generic [ref=e60]:
              - text: Affected Systems
              - textbox "Affected Systems" [ref=e61]:
                - /placeholder: e.g., API Gateway, Database, Payment Service (comma-separated)
              - paragraph [ref=e62]: Enter system names separated by commas
            - generic [ref=e63]:
              - button "Cancel" [ref=e64]
              - button "Create Incident" [ref=e65]
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | import { login } from "./helpers/auth";
  3   | 
  4   | test.describe("Complete User Flow", () => {
  5   |   test("should complete full incident management workflow", async ({ page }) => {
  6   |     // Step 1: Login
  7   |     await login(page);
  8   |     await page.waitForLoadState('networkidle');
  9   |     await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  10  |     
  11  |     // Step 2: Navigate to incidents page
  12  |     await page.getByRole("link", { name: /incidents/i }).click();
  13  |     await page.waitForURL("/incidents", { timeout: 10000 });
  14  |     await page.waitForLoadState('networkidle');
  15  |     await expect(page.getByRole("heading", { name: "Incidents" })).toBeVisible();
  16  |     
  17  |     // Step 3: Create a new incident
  18  |     await page.getByRole("button", { name: /create incident/i }).click();
  19  |     await page.waitForLoadState('networkidle');
> 20  |     await expect(page.getByRole("heading", { name: /create.*incident/i })).toBeVisible();
      |                                                                            ^ Error: expect(locator).toBeVisible() failed
  21  |     
  22  |     const timestamp = Date.now();
  23  |     const incidentTitle = `E2E Test Incident ${timestamp}`;
  24  |     
  25  |     await page.getByLabel(/title/i).fill(incidentTitle);
  26  |     await page.getByLabel(/description/i).fill("Complete workflow test incident with full details for E2E testing");
  27  |     
  28  |     // Use direct selectors for form fields
  29  |     await page.locator('select[name="severity"]').selectOption('HIGH');
  30  |     await page.locator('select[name="category"]').selectOption('SECURITY');
  31  |     await page.locator('input[name="affectedSystems"]').fill("Payment Gateway, API Server");
  32  |     
  33  |     // Wait for form validation
  34  |     await page.waitForTimeout(500);
  35  |     
  36  |     // Submit the form
  37  |     await page.getByRole("button", { name: /create incident/i }).click();
  38  |     await page.waitForURL("/incidents", { timeout: 15000 });
  39  |     await page.waitForLoadState('networkidle');
  40  |     
  41  |     // Step 4: Verify incident appears in list
  42  |     await expect(page.getByText(incidentTitle)).toBeVisible({ timeout: 10000 });
  43  |     
  44  |     // Step 5: View incident details
  45  |     await page.getByText(incidentTitle).click();
  46  |     await page.waitForLoadState('networkidle');
  47  |     await expect(page.getByRole("heading", { name: "Incident Details" })).toBeVisible();
  48  |     
  49  |     // Step 6: Check incident tabs
  50  |     const overviewTab = page.getByRole("tab", { name: /overview|details/i });
  51  |     if (await overviewTab.isVisible()) {
  52  |       await overviewTab.click();
  53  |       await page.waitForTimeout(500);
  54  |     }
  55  |     
  56  |     // Step 7: Navigate back to dashboard
  57  |     await page.getByRole("link", { name: /dashboard/i }).click();
  58  |     await page.waitForURL("/", { timeout: 10000 });
  59  |     await page.waitForLoadState('networkidle');
  60  |     await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  61  |     
  62  |     // Step 8: Check tasks page
  63  |     await page.getByRole("link", { name: /tasks/i }).click();
  64  |     await page.waitForURL("/tasks", { timeout: 10000 });
  65  |     await page.waitForLoadState('networkidle');
  66  |     await expect(page.getByRole("heading", { name: "Tasks" })).toBeVisible({ timeout: 10000 });
  67  |     
  68  |     // Step 9: Return to dashboard
  69  |     await page.getByRole("link", { name: /dashboard/i }).click();
  70  |     await page.waitForURL("/", { timeout: 10000 });
  71  |     await page.waitForLoadState('networkidle');
  72  |   });
  73  | 
  74  |   test("should handle navigation between all pages", async ({ page }) => {
  75  |     await login(page);
  76  |     await page.waitForLoadState('networkidle');
  77  |     
  78  |     // Dashboard -> Incidents
  79  |     await page.getByRole("link", { name: /incidents/i }).click();
  80  |     await page.waitForURL("/incidents", { timeout: 10000 });
  81  |     await page.waitForLoadState('networkidle');
  82  |     await expect(page.getByRole("heading", { name: "Incidents" })).toBeVisible({ timeout: 10000 });
  83  |     
  84  |     // Incidents -> Tasks
  85  |     await page.getByRole("link", { name: /tasks/i }).click();
  86  |     await page.waitForURL("/tasks", { timeout: 10000 });
  87  |     await page.waitForLoadState('networkidle');
  88  |     await expect(page.getByRole("heading", { name: "Tasks" })).toBeVisible({ timeout: 10000 });
  89  |     
  90  |     // Tasks -> Dashboard
  91  |     await page.getByRole("link", { name: /dashboard/i }).click();
  92  |     await page.waitForURL("/", { timeout: 10000 });
  93  |     await page.waitForLoadState('networkidle');
  94  |     await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible({ timeout: 10000 });
  95  |     
  96  |     // Dashboard -> Settings (if available)
  97  |     const settingsLink = page.getByRole("link", { name: /settings/i });
  98  |     if (await settingsLink.isVisible()) {
  99  |       await settingsLink.click();
  100 |       await page.waitForURL("/settings", { timeout: 10000 });
  101 |       await page.waitForLoadState('networkidle');
  102 |     }
  103 |   });
  104 | 
  105 |   test("should display consistent UI elements across pages", async ({ page }) => {
  106 |     await login(page);
  107 |     
  108 |     // Check sidebar on dashboard
  109 |     await expect(page.getByText("ReguAI")).toBeVisible();
  110 |     
  111 |     // Navigate to incidents
  112 |     await page.goto("/incidents");
  113 |     await expect(page.getByText("ReguAI")).toBeVisible();
  114 |     
  115 |     // Navigate to tasks
  116 |     await page.goto("/tasks");
  117 |     await expect(page.getByText("ReguAI")).toBeVisible();
  118 |   });
  119 | 
  120 |   test("should handle form validation", async ({ page }) => {
```