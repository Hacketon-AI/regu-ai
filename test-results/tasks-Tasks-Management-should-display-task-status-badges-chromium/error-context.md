# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tasks.spec.ts >> Tasks Management >> should display task status badges
- Location: tests\e2e\tasks.spec.ts:96:7

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 0
Received:   0
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
  19  |     await expect(page.getByRole("heading", { name: "Tasks" })).toBeVisible();
  20  |     await expect(page.getByText("Manage and track incident-related tasks")).toBeVisible();
  21  |     await expect(page.getByRole("button", { name: /create task/i })).toBeVisible();
  22  |   });
  23  | 
  24  |   test("should display task statistics", async ({ page }) => {
  25  |     // Wait for tasks to load
  26  |     await page.waitForTimeout(2000);
  27  |     
  28  |     // Check for stats cards
  29  |     await expect(page.getByText("Pending Tasks")).toBeVisible();
  30  |     await expect(page.getByText("In Progress")).toBeVisible();
  31  |     await expect(page.getByText("Completed")).toBeVisible();
  32  |   });
  33  | 
  34  |   test("should display task list", async ({ page }) => {
  35  |     // Wait for tasks to load
  36  |     await page.waitForTimeout(2000);
  37  |     
  38  |     // Check for "All Tasks" heading
  39  |     await expect(page.getByRole("heading", { name: "All Tasks" })).toBeVisible();
  40  |     
  41  |     // Check if task list or empty state is visible
  42  |     const pageContent = page.locator("main, [role='main']");
  43  |     await expect(pageContent).toBeVisible();
  44  |   });
  45  | 
  46  |   test("should display task cards with metadata", async ({ page }) => {
  47  |     // Wait for tasks to load
  48  |     await page.waitForTimeout(2000);
  49  |     
  50  |     // Check if any task cards exist
  51  |     const taskCards = page.locator(".hover\\:shadow-md, [data-testid='task-card']");
  52  |     const count = await taskCards.count();
  53  |     
  54  |     if (count > 0) {
  55  |       // Check first task card has expected elements
  56  |       const firstCard = taskCards.first();
  57  |       await expect(firstCard).toBeVisible();
  58  |       
  59  |       // Task cards should have badges for status and priority
  60  |       const badges = firstCard.locator(".bg-green-100, .bg-blue-100, .bg-yellow-100, .bg-red-100, .bg-orange-100");
  61  |       await expect(badges.first()).toBeVisible();
  62  |     }
  63  |   });
  64  | 
  65  |   test("should show empty state when no tasks exist", async ({ page }) => {
  66  |     // Wait for tasks to load
  67  |     await page.waitForTimeout(2000);
  68  |     
  69  |     // Check if empty state or tasks are visible
  70  |     const emptyState = page.getByText("No tasks found");
  71  |     const tasksList = page.locator(".space-y-3");
  72  |     
  73  |     // Either empty state or tasks list should be visible
  74  |     const isEmptyStateVisible = await emptyState.isVisible();
  75  |     const isTasksListVisible = await tasksList.isVisible();
  76  |     
  77  |     expect(isEmptyStateVisible || isTasksListVisible).toBeTruthy();
  78  |   });
  79  | 
  80  |   test("should display task priority badges", async ({ page }) => {
  81  |     // Wait for tasks to load
  82  |     await page.waitForTimeout(2000);
  83  |     
  84  |     // Check if any task cards exist
  85  |     const taskCards = page.locator(".hover\\:shadow-md, [data-testid='task-card']");
  86  |     const count = await taskCards.count();
  87  |     
  88  |     if (count > 0) {
  89  |       // Priority badges should be visible (High, Medium, Low)
  90  |       const priorityBadges = page.locator(".bg-red-100, .bg-orange-100, .bg-blue-100").filter({ hasText: /high|medium|low/i });
  91  |       const badgeCount = await priorityBadges.count();
  92  |       expect(badgeCount).toBeGreaterThan(0);
  93  |     }
  94  |   });
  95  | 
  96  |   test("should display task status badges", async ({ page }) => {
  97  |     // Wait for tasks to load
  98  |     await page.waitForTimeout(2000);
  99  |     
  100 |     // Check if any task cards exist
  101 |     const taskCards = page.locator(".hover\\:shadow-md, [data-testid='task-card']");
  102 |     const count = await taskCards.count();
  103 |     
  104 |     if (count > 0) {
  105 |       // Status badges should be visible (To Do, In Progress, Done)
  106 |       const statusBadges = page.locator(".bg-green-100, .bg-blue-100, .bg-yellow-100").filter({ hasText: /done|in progress|to do/i });
  107 |       const badgeCount = await statusBadges.count();
> 108 |       expect(badgeCount).toBeGreaterThan(0);
      |                          ^ Error: expect(received).toBeGreaterThan(expected)
  109 |     }
  110 |   });
  111 | 
  112 |   test("should navigate to tasks from dashboard", async ({ page }) => {
  113 |     await page.goto("/");
  114 |     await page.getByRole("link", { name: /tasks/i }).click();
  115 |     await page.waitForURL("/tasks");
  116 |     
  117 |     await expect(page.getByRole("heading", { name: "Tasks" })).toBeVisible();
  118 |   });
  119 | });
  120 | 
  121 | // Made with Bob
  122 | 
```