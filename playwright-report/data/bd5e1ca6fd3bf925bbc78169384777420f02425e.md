# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: incidents.spec.ts >> Incidents Management >> should navigate back from create form
- Location: tests\e2e\incidents.spec.ts:93:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Incidents' })
Expected: visible
Error: strict mode violation: getByRole('heading', { name: 'Incidents' }) resolved to 2 elements:
    1) <h1 class="text-3xl font-bold text-gray-900">Incidents</h1> aka getByRole('heading', { name: 'Incidents', exact: true })
    2) <h3 class="text-2xl font-semibold leading-none tracking-tight">Recent Incidents</h3> aka getByRole('heading', { name: 'Recent Incidents' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: 'Incidents' })

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
            - heading "Incidents" [level=1] [ref=e41]
            - paragraph [ref=e42]: Manage and track all incidents
          - button "Create Incident" [ref=e43]:
            - img
            - text: Create Incident
        - generic [ref=e44]:
          - heading "Recent Incidents" [level=3] [ref=e46]
          - generic [ref=e48]:
            - generic [ref=e49]:
              - generic [ref=e50]:
                - generic [ref=e51]:
                  - img [ref=e52]
                  - heading "E2E Test Incident" [level=3] [ref=e54]
                - generic [ref=e55]:
                  - generic [ref=e56]: High
                  - generic [ref=e57]: •
                  - generic [ref=e58]: Open
                  - generic [ref=e59]: •
                  - generic [ref=e60]: 5/17/2026
                - generic [ref=e61]:
                  - generic [ref=e62]: "Affected:"
                  - generic [ref=e63]: Payment API
              - button "View details for E2E Test Incident" [ref=e64]:
                - img
                - text: View
            - generic [ref=e65]:
              - generic [ref=e66]:
                - generic [ref=e67]:
                  - img [ref=e68]
                  - heading "Mobile App Breaking Change" [level=3] [ref=e70]
                - generic [ref=e71]:
                  - generic [ref=e72]: Medium
                  - generic [ref=e73]: •
                  - generic [ref=e74]: Unknown
                  - generic [ref=e75]: •
                  - generic [ref=e76]: 5/16/2026
                - generic [ref=e77]:
                  - generic [ref=e78]: "Affected:"
                  - generic [ref=e79]: User Registration API
              - button "View details for Mobile App Breaking Change" [ref=e80]:
                - img
                - text: View
            - generic [ref=e81]:
              - generic [ref=e82]:
                - generic [ref=e83]:
                  - img [ref=e84]
                  - heading "Unauthorized Admin Login Attempt" [level=3] [ref=e86]
                - generic [ref=e87]:
                  - generic [ref=e88]: Critical
                  - generic [ref=e89]: •
                  - generic [ref=e90]: Unknown
                  - generic [ref=e91]: •
                  - generic [ref=e92]: 5/16/2026
                - generic [ref=e93]:
                  - generic [ref=e94]: "Affected:"
                  - generic [ref=e95]: Admin Dashboard
              - button "View details for Unauthorized Admin Login Attempt" [ref=e96]:
                - img
                - text: View
            - generic [ref=e97]:
              - generic [ref=e98]:
                - generic [ref=e99]:
                  - img [ref=e100]
                  - heading "Payment API Failure" [level=3] [ref=e102]
                - generic [ref=e103]:
                  - generic [ref=e104]: High
                  - generic [ref=e105]: •
                  - generic [ref=e106]: Unknown
                  - generic [ref=e107]: •
                  - generic [ref=e108]: 5/16/2026
                - generic [ref=e109]:
                  - generic [ref=e110]: "Affected:"
                  - generic [ref=e111]: Mobile Checkout Service
              - button "View details for Payment API Failure" [ref=e112]:
                - img
                - text: View
  - alert [ref=e113]
```

# Test source

```ts
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
  35  |     await expect(page.getByRole("heading", { name: /create.*incident/i })).toBeVisible();
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
> 113 |     await expect(page.getByRole("heading", { name: "Incidents" })).toBeVisible();
      |                                                                    ^ Error: expect(locator).toBeVisible() failed
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
  136 | 
```