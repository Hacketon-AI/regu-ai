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