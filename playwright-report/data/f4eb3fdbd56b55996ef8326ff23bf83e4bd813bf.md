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
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: 'Tasks' })

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
  - paragraph: Loading tasks...
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
  12  | test.describe("Tasks Management", () => {
  13  |   test.beforeEach(async ({ page }) => {
  14  |     await login(page);
  15  |     await page.goto("/tasks");
  16  |   });
  17  | 
  18  |   test("should display tasks page", async ({ page }) => {
> 19  |     await expect(page.getByRole("heading", { name: "Tasks" })).toBeVisible();
      |                                                                ^ Error: expect(locator).toBeVisible() failed
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
  108 |       expect(badgeCount).toBeGreaterThan(0);
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
```