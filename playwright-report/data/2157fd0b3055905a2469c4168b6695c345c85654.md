# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tasks.spec.ts >> Tasks Management >> should display tasks page
- Location: tests\e2e\tasks.spec.ts:18:7

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
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('heading', { name: 'Tasks' })

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
            - heading "Tasks" [level=1] [ref=e41]
            - paragraph [ref=e42]: Manage and track incident-related tasks
          - button "Create Task" [ref=e43]:
            - img
            - text: Create Task
        - generic [ref=e44]:
          - generic [ref=e45]:
            - generic [ref=e46]:
              - heading "Pending Tasks" [level=3] [ref=e47]
              - img [ref=e48]
            - generic [ref=e52]: "0"
          - generic [ref=e53]:
            - generic [ref=e54]:
              - heading "In Progress" [level=3] [ref=e55]
              - img [ref=e56]
            - generic [ref=e60]: "0"
          - generic [ref=e61]:
            - generic [ref=e62]:
              - heading "Completed" [level=3] [ref=e63]
              - img [ref=e64]
            - generic [ref=e68]: "0"
        - generic [ref=e69]:
          - heading "All Tasks" [level=2] [ref=e70]
          - generic [ref=e71]:
            - generic [ref=e75]:
              - generic [ref=e76]:
                - heading "Restore mobile-compatible response field" [level=3] [ref=e77]
                - generic [ref=e78]: InProgress
                - generic [ref=e79]: Medium
              - paragraph [ref=e80]: Add a backward-compatible response patch for mobile registration clients.
              - generic [ref=e81]:
                - generic [ref=e82]:
                  - img [ref=e83]
                  - generic [ref=e86]: Backend Team
                - generic [ref=e87]:
                  - img [ref=e88]
                  - generic [ref=e91]: "Due: 5/15/2026"
                - generic [ref=e92]: "Related: Mobile App Breaking Change"
            - generic [ref=e96]:
              - generic [ref=e97]:
                - heading "Add API contract regression test" [level=3] [ref=e98]
                - generic [ref=e99]: ToDo
                - generic [ref=e100]: Medium
              - paragraph [ref=e101]: Add regression coverage for user registration response contract compatibility.
              - generic [ref=e102]:
                - generic [ref=e103]:
                  - img [ref=e104]
                  - generic [ref=e107]: QA Team
                - generic [ref=e108]:
                  - img [ref=e109]
                  - generic [ref=e112]: "Due: 5/16/2026"
                - generic [ref=e113]: "Related: Mobile App Breaking Change"
            - generic [ref=e117]:
              - generic [ref=e118]:
                - heading "Preserve admin access logs" [level=3] [ref=e119]
                - generic [ref=e120]: InProgress
                - generic [ref=e121]: Critical
              - paragraph [ref=e122]: Export authentication logs and preserve suspicious IP evidence for security review.
              - generic [ref=e123]:
                - generic [ref=e124]:
                  - img [ref=e125]
                  - generic [ref=e128]: Security Team
                - generic [ref=e129]:
                  - img [ref=e130]
                  - generic [ref=e133]: "Due: 5/15/2026"
                - generic [ref=e134]: "Related: Unauthorized Admin Login Attempt"
            - generic [ref=e138]:
              - generic [ref=e139]:
                - heading "Rotate admin dashboard credentials" [level=3] [ref=e140]
                - generic [ref=e141]: ToDo
                - generic [ref=e142]: Critical
              - paragraph [ref=e143]: Rotate affected credentials and invalidate suspicious active sessions.
              - generic [ref=e144]:
                - generic [ref=e145]:
                  - img [ref=e146]
                  - generic [ref=e149]: Platform Team
                - generic [ref=e150]:
                  - img [ref=e151]
                  - generic [ref=e154]: "Due: 5/15/2026"
                - generic [ref=e155]: "Related: Unauthorized Admin Login Attempt"
            - generic [ref=e159]:
              - generic [ref=e160]:
                - heading "Review payment gateway timeout logs" [level=3] [ref=e161]
                - generic [ref=e162]: InProgress
                - generic [ref=e163]: High
              - paragraph [ref=e164]: Compare checkout payment errors with gateway timeout and deployment timeline.
              - generic [ref=e165]:
                - generic [ref=e166]:
                  - img [ref=e167]
                  - generic [ref=e170]: Backend Team
                - generic [ref=e171]:
                  - img [ref=e172]
                  - generic [ref=e175]: "Due: 5/15/2026"
                - generic [ref=e176]: "Related: Payment API Failure"
            - generic [ref=e180]:
              - generic [ref=e181]:
                - heading "Validate failed payment reconciliation" [level=3] [ref=e182]
                - generic [ref=e183]: ToDo
                - generic [ref=e184]: High
              - paragraph [ref=e185]: Verify failed payment records and confirm no duplicate charges were created.
              - generic [ref=e186]:
                - generic [ref=e187]:
                  - img [ref=e188]
                  - generic [ref=e191]: Payment Operations
                - generic [ref=e192]:
                  - img [ref=e193]
                  - generic [ref=e196]: "Due: 5/15/2026"
                - generic [ref=e197]: "Related: Payment API Failure"
  - alert [ref=e198]
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
  12  | test.describe("Tasks Management", () => {
  13  |   test.beforeEach(async ({ page }) => {
  14  |     await login(page);
  15  |     await page.goto("/tasks");
  16  |   });
  17  | 
  18  |   test("should display tasks page", async ({ page }) => {
  19  |     // Wait for page to be fully loaded
  20  |     await page.waitForLoadState('networkidle');
  21  |     
> 22  |     await expect(page.getByRole("heading", { name: "Tasks" })).toBeVisible({ timeout: 10000 });
      |                                                                ^ Error: expect(locator).toBeVisible() failed
  23  |     await expect(page.getByText("Manage and track incident-related tasks")).toBeVisible();
  24  |     await expect(page.getByRole("button", { name: /create task/i })).toBeVisible();
  25  |   });
  26  | 
  27  |   test("should display task statistics", async ({ page }) => {
  28  |     // Wait for tasks to load
  29  |     await page.waitForTimeout(2000);
  30  |     
  31  |     // Check for stats cards
  32  |     await expect(page.getByText("Pending Tasks")).toBeVisible();
  33  |     await expect(page.getByText("In Progress")).toBeVisible();
  34  |     await expect(page.getByText("Completed")).toBeVisible();
  35  |   });
  36  | 
  37  |   test("should display task list", async ({ page }) => {
  38  |     // Wait for tasks to load
  39  |     await page.waitForTimeout(2000);
  40  |     
  41  |     // Check for "All Tasks" heading
  42  |     await expect(page.getByRole("heading", { name: "All Tasks" })).toBeVisible();
  43  |     
  44  |     // Check if task list or empty state is visible
  45  |     const pageContent = page.locator("main, [role='main']");
  46  |     await expect(pageContent).toBeVisible();
  47  |   });
  48  | 
  49  |   test("should display task cards with metadata", async ({ page }) => {
  50  |     // Wait for tasks to load
  51  |     await page.waitForTimeout(2000);
  52  |     
  53  |     // Check if any task cards exist
  54  |     const taskCards = page.locator(".hover\\:shadow-md, [data-testid='task-card']");
  55  |     const count = await taskCards.count();
  56  |     
  57  |     if (count > 0) {
  58  |       // Check first task card has expected elements
  59  |       const firstCard = taskCards.first();
  60  |       await expect(firstCard).toBeVisible();
  61  |       
  62  |       // Task cards should have badges for status and priority
  63  |       const badges = firstCard.locator(".bg-green-100, .bg-blue-100, .bg-yellow-100, .bg-red-100, .bg-orange-100");
  64  |       await expect(badges.first()).toBeVisible();
  65  |     }
  66  |   });
  67  | 
  68  |   test("should show empty state when no tasks exist", async ({ page }) => {
  69  |     // Wait for tasks to load
  70  |     await page.waitForTimeout(2000);
  71  |     
  72  |     // Check if empty state or tasks are visible
  73  |     const emptyState = page.getByText("No tasks found");
  74  |     const tasksList = page.locator(".space-y-3");
  75  |     
  76  |     // Either empty state or tasks list should be visible
  77  |     const isEmptyStateVisible = await emptyState.isVisible();
  78  |     const isTasksListVisible = await tasksList.isVisible();
  79  |     
  80  |     expect(isEmptyStateVisible || isTasksListVisible).toBeTruthy();
  81  |   });
  82  | 
  83  |   test("should display task priority badges", async ({ page }) => {
  84  |     // Wait for tasks to load
  85  |     await page.waitForTimeout(2000);
  86  |     
  87  |     // Check if any task cards exist
  88  |     const taskCards = page.locator(".hover\\:shadow-md, [data-testid='task-card']");
  89  |     const count = await taskCards.count();
  90  |     
  91  |     if (count > 0) {
  92  |       // Priority badges should be visible (High, Medium, Low)
  93  |       const priorityBadges = page.locator(".bg-red-100, .bg-orange-100, .bg-blue-100").filter({ hasText: /high|medium|low/i });
  94  |       const badgeCount = await priorityBadges.count();
  95  |       expect(badgeCount).toBeGreaterThan(0);
  96  |     }
  97  |   });
  98  | 
  99  |   test("should display task status badges", async ({ page }) => {
  100 |     // Wait for tasks to load
  101 |     await page.waitForLoadState('networkidle');
  102 |     await page.waitForTimeout(2000);
  103 |     
  104 |     // Check if any task cards exist
  105 |     const taskCards = page.locator(".hover\\:shadow-md, [data-testid='task-card']");
  106 |     const count = await taskCards.count();
  107 |     
  108 |     if (count > 0) {
  109 |       // Status badges should be visible - use more flexible selectors
  110 |       const statusBadges = page.locator('[class*="bg-"][class*="100"]').filter({ hasText: /done|in progress|to do|pending|completed/i });
  111 |       const badgeCount = await statusBadges.count();
  112 |       
  113 |       // If no badges found with text filter, just check for badge elements
  114 |       if (badgeCount === 0) {
  115 |         const anyBadges = taskCards.first().locator('[class*="bg-"][class*="100"]');
  116 |         expect(await anyBadges.count()).toBeGreaterThan(0);
  117 |       } else {
  118 |         expect(badgeCount).toBeGreaterThan(0);
  119 |       }
  120 |     }
  121 |   });
  122 | 
```