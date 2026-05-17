# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: complete-flow.spec.ts >> Complete User Flow >> should handle navigation between all pages
- Location: tests\e2e\complete-flow.spec.ts:75:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Tasks' })
Expected: visible
Error: strict mode violation: getByRole('heading', { name: 'Tasks' }) resolved to 3 elements:
    1) <h1 class="text-3xl font-bold text-gray-900">Tasks</h1> aka getByRole('heading', { name: 'Tasks', exact: true })
    2) <h3 class="tracking-tight text-sm font-medium text-gray-600">Pending Tasks</h3> aka getByRole('heading', { name: 'Pending Tasks' })
    3) <h2 class="text-xl font-semibold text-gray-900">All Tasks</h2> aka getByRole('heading', { name: 'All Tasks' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: 'Tasks' })

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
            - heading "Tasks" [level=1] [ref=e42]
            - paragraph [ref=e43]: Manage and track incident-related tasks
          - button "Create Task" [ref=e44]:
            - img
            - text: Create Task
        - generic [ref=e45]:
          - generic [ref=e46]:
            - generic [ref=e47]:
              - heading "Pending Tasks" [level=3] [ref=e48]
              - img [ref=e49]
            - generic [ref=e53]: "0"
          - generic [ref=e54]:
            - generic [ref=e55]:
              - heading "In Progress" [level=3] [ref=e56]
              - img [ref=e57]
            - generic [ref=e61]: "0"
          - generic [ref=e62]:
            - generic [ref=e63]:
              - heading "Completed" [level=3] [ref=e64]
              - img [ref=e65]
            - generic [ref=e69]: "0"
        - generic [ref=e70]:
          - heading "All Tasks" [level=2] [ref=e71]
          - generic [ref=e72]:
            - generic [ref=e76]:
              - generic [ref=e77]:
                - heading "Restore mobile-compatible response field" [level=3] [ref=e78]
                - generic [ref=e79]: InProgress
                - generic [ref=e80]: Medium
              - paragraph [ref=e81]: Add a backward-compatible response patch for mobile registration clients.
              - generic [ref=e82]:
                - generic [ref=e83]:
                  - img [ref=e84]
                  - generic [ref=e87]: Backend Team
                - generic [ref=e88]:
                  - img [ref=e89]
                  - generic [ref=e92]: "Due: 5/15/2026"
                - generic [ref=e93]: "Related: Mobile App Breaking Change"
            - generic [ref=e97]:
              - generic [ref=e98]:
                - heading "Add API contract regression test" [level=3] [ref=e99]
                - generic [ref=e100]: ToDo
                - generic [ref=e101]: Medium
              - paragraph [ref=e102]: Add regression coverage for user registration response contract compatibility.
              - generic [ref=e103]:
                - generic [ref=e104]:
                  - img [ref=e105]
                  - generic [ref=e108]: QA Team
                - generic [ref=e109]:
                  - img [ref=e110]
                  - generic [ref=e113]: "Due: 5/16/2026"
                - generic [ref=e114]: "Related: Mobile App Breaking Change"
            - generic [ref=e118]:
              - generic [ref=e119]:
                - heading "Preserve admin access logs" [level=3] [ref=e120]
                - generic [ref=e121]: InProgress
                - generic [ref=e122]: Critical
              - paragraph [ref=e123]: Export authentication logs and preserve suspicious IP evidence for security review.
              - generic [ref=e124]:
                - generic [ref=e125]:
                  - img [ref=e126]
                  - generic [ref=e129]: Security Team
                - generic [ref=e130]:
                  - img [ref=e131]
                  - generic [ref=e134]: "Due: 5/15/2026"
                - generic [ref=e135]: "Related: Unauthorized Admin Login Attempt"
            - generic [ref=e139]:
              - generic [ref=e140]:
                - heading "Rotate admin dashboard credentials" [level=3] [ref=e141]
                - generic [ref=e142]: ToDo
                - generic [ref=e143]: Critical
              - paragraph [ref=e144]: Rotate affected credentials and invalidate suspicious active sessions.
              - generic [ref=e145]:
                - generic [ref=e146]:
                  - img [ref=e147]
                  - generic [ref=e150]: Platform Team
                - generic [ref=e151]:
                  - img [ref=e152]
                  - generic [ref=e155]: "Due: 5/15/2026"
                - generic [ref=e156]: "Related: Unauthorized Admin Login Attempt"
            - generic [ref=e160]:
              - generic [ref=e161]:
                - heading "Review payment gateway timeout logs" [level=3] [ref=e162]
                - generic [ref=e163]: InProgress
                - generic [ref=e164]: High
              - paragraph [ref=e165]: Compare checkout payment errors with gateway timeout and deployment timeline.
              - generic [ref=e166]:
                - generic [ref=e167]:
                  - img [ref=e168]
                  - generic [ref=e171]: Backend Team
                - generic [ref=e172]:
                  - img [ref=e173]
                  - generic [ref=e176]: "Due: 5/15/2026"
                - generic [ref=e177]: "Related: Payment API Failure"
            - generic [ref=e181]:
              - generic [ref=e182]:
                - heading "Validate failed payment reconciliation" [level=3] [ref=e183]
                - generic [ref=e184]: ToDo
                - generic [ref=e185]: High
              - paragraph [ref=e186]: Verify failed payment records and confirm no duplicate charges were created.
              - generic [ref=e187]:
                - generic [ref=e188]:
                  - img [ref=e189]
                  - generic [ref=e192]: Payment Operations
                - generic [ref=e193]:
                  - img [ref=e194]
                  - generic [ref=e197]: "Due: 5/15/2026"
                - generic [ref=e198]: "Related: Payment API Failure"
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
  48  |     await expect(page.getByText(incidentTitle)).toBeVisible({ timeout: 10000 });
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
> 86  |     await expect(page.getByRole("heading", { name: "Tasks" })).toBeVisible();
      |                                                                ^ Error: expect(locator).toBeVisible() failed
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