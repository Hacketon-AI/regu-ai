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

Locator: getByText('E2E Test Incident 1779018920820')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByText('E2E Test Incident 1779018920820')

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
  - heading "Create Incident" [level=1]
  - paragraph: Report a new incident
  - button "Back to List"
  - heading "Create New Incident" [level=3]
  - text: Incident Title *
  - textbox "Incident Title *":
    - /placeholder: Brief description of the incident
    - text: E2E Test Incident 1779018920820
  - text: Description *
  - textbox "Description *":
    - /placeholder: Detailed description of what happened...
    - text: Complete workflow test incident with full details
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
    - text: Payment Gateway
  - paragraph: Enter system names separated by commas
  - button "Cancel"
  - button "Create Incident"
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
  8   |     await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  9   |     
  10  |     // Step 2: Navigate to incidents page
  11  |     await page.getByRole("link", { name: /incidents/i }).click();
  12  |     await page.waitForURL("/incidents");
  13  |     await expect(page.getByRole("heading", { name: "Incidents" })).toBeVisible();
  14  |     
  15  |     // Step 3: Create a new incident
  16  |     await page.getByRole("button", { name: /create incident/i }).click();
  17  |     await expect(page.getByRole("heading", { name: "Create Incident" })).toBeVisible();
  18  |     
  19  |     const timestamp = Date.now();
  20  |     const incidentTitle = `E2E Test Incident ${timestamp}`;
  21  |     
  22  |     await page.getByLabel(/title/i).fill(incidentTitle);
  23  |     await page.getByLabel(/description/i).fill("Complete workflow test incident with full details");
  24  |     
  25  |     // Select severity
  26  |     const severitySelect = page.locator('select, [role="combobox"]').filter({ hasText: /severity/i }).first();
  27  |     if (await severitySelect.isVisible()) {
  28  |       await severitySelect.selectOption({ label: "High" });
  29  |     }
  30  |     
  31  |     // Select category
  32  |     const categorySelect = page.locator('select, [role="combobox"]').filter({ hasText: /category/i }).first();
  33  |     if (await categorySelect.isVisible()) {
  34  |       await categorySelect.selectOption({ index: 1 });
  35  |     }
  36  |     
  37  |     // Fill affected systems
  38  |     const affectedSystemsInput = page.getByLabel(/affected system/i);
  39  |     if (await affectedSystemsInput.isVisible()) {
  40  |       await affectedSystemsInput.fill("Payment Gateway");
  41  |     }
  42  |     
  43  |     // Submit the form
  44  |     await page.getByRole("button", { name: /create|submit/i }).click();
  45  |     await page.waitForURL("/incidents", { timeout: 10000 });
  46  |     
  47  |     // Step 4: Verify incident appears in list
> 48  |     await expect(page.getByText(incidentTitle)).toBeVisible({ timeout: 10000 });
      |                                                 ^ Error: expect(locator).toBeVisible() failed
  49  |     
  50  |     // Step 5: View incident details
  51  |     await page.getByText(incidentTitle).click();
  52  |     await expect(page.getByRole("heading", { name: "Incident Details" })).toBeVisible();
  53  |     
  54  |     // Step 6: Check incident tabs
  55  |     const overviewTab = page.getByRole("tab", { name: /overview|details/i });
  56  |     if (await overviewTab.isVisible()) {
  57  |       await overviewTab.click();
  58  |     }
  59  |     
  60  |     // Step 7: Navigate back to dashboard
  61  |     await page.getByRole("link", { name: /dashboard/i }).click();
  62  |     await page.waitForURL("/");
  63  |     await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  64  |     
  65  |     // Step 8: Check tasks page
  66  |     await page.getByRole("link", { name: /tasks/i }).click();
  67  |     await page.waitForURL("/tasks");
  68  |     await expect(page.getByRole("heading", { name: "Tasks" })).toBeVisible();
  69  |     
  70  |     // Step 9: Return to dashboard
  71  |     await page.getByRole("link", { name: /dashboard/i }).click();
  72  |     await page.waitForURL("/");
  73  |   });
  74  | 
  75  |   test("should handle navigation between all pages", async ({ page }) => {
  76  |     await login(page);
  77  |     
  78  |     // Dashboard -> Incidents
  79  |     await page.getByRole("link", { name: /incidents/i }).click();
  80  |     await page.waitForURL("/incidents");
  81  |     await expect(page.getByRole("heading", { name: "Incidents" })).toBeVisible();
  82  |     
  83  |     // Incidents -> Tasks
  84  |     await page.getByRole("link", { name: /tasks/i }).click();
  85  |     await page.waitForURL("/tasks");
  86  |     await expect(page.getByRole("heading", { name: "Tasks" })).toBeVisible();
  87  |     
  88  |     // Tasks -> Dashboard
  89  |     await page.getByRole("link", { name: /dashboard/i }).click();
  90  |     await page.waitForURL("/");
  91  |     await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  92  |     
  93  |     // Dashboard -> Settings (if available)
  94  |     const settingsLink = page.getByRole("link", { name: /settings/i });
  95  |     if (await settingsLink.isVisible()) {
  96  |       await settingsLink.click();
  97  |       await page.waitForURL("/settings");
  98  |     }
  99  |   });
  100 | 
  101 |   test("should display consistent UI elements across pages", async ({ page }) => {
  102 |     await login(page);
  103 |     
  104 |     // Check sidebar on dashboard
  105 |     await expect(page.getByText("ReguAI")).toBeVisible();
  106 |     
  107 |     // Navigate to incidents
  108 |     await page.goto("/incidents");
  109 |     await expect(page.getByText("ReguAI")).toBeVisible();
  110 |     
  111 |     // Navigate to tasks
  112 |     await page.goto("/tasks");
  113 |     await expect(page.getByText("ReguAI")).toBeVisible();
  114 |   });
  115 | 
  116 |   test("should handle form validation", async ({ page }) => {
  117 |     await login(page);
  118 |     await page.goto("/incidents");
  119 |     
  120 |     // Open create form
  121 |     await page.getByRole("button", { name: /create incident/i }).click();
  122 |     
  123 |     // Try to submit empty form
  124 |     await page.getByRole("button", { name: /create|submit/i }).click();
  125 |     
  126 |     // Form should still be visible (validation prevents submission)
  127 |     await expect(page.getByRole("heading", { name: "Create Incident" })).toBeVisible();
  128 |   });
  129 | });
  130 | 
  131 | // Made with Bob
  132 | 
```