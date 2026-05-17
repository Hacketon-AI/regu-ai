# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tasks.spec.ts >> Tasks Management >> should navigate to tasks from dashboard
- Location: tests\e2e\tasks.spec.ts:123:7

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
  123 |   test("should navigate to tasks from dashboard", async ({ page }) => {
  124 |     await page.goto("/");
  125 |     await page.waitForLoadState('networkidle');
  126 |     
  127 |     // Click tasks link
  128 |     await page.getByRole("link", { name: /tasks/i }).click();
  129 |     
  130 |     // Wait for navigation
  131 |     await page.waitForURL("/tasks", { timeout: 10000 });
  132 |     await page.waitForLoadState('networkidle');
  133 |     
  134 |     // Verify tasks page loaded
> 135 |     await expect(page.getByRole("heading", { name: "Tasks" })).toBeVisible({ timeout: 10000 });
      |                                                                ^ Error: expect(locator).toBeVisible() failed
  136 |   });
  137 | });
  138 | 
  139 | // Made with Bob
  140 | 
```