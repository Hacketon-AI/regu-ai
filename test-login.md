# Login Authentication Test Plan

## Test Environment

- Server running on: http://localhost:3001
- Demo credentials:
  - Email: demo@reguai.local
  - Password: demo-password

## Test Cases

### 1. Valid Credentials Test ✓

**Steps:**

1. Navigate to http://localhost:3001/login
2. Enter email: demo@reguai.local
3. Enter password: demo-password
4. Click "Sign In"

**Expected Result:**

- Login succeeds
- User is redirected to "/" (dashboard)
- Session is created
- Console shows: "[Auth] Login successful for: demo@reguai.local"

### 2. Invalid Credentials Test ✓

**Steps:**

1. Navigate to http://localhost:3001/login
2. Enter email: wrong@email.com
3. Enter password: wrongpassword
4. Click "Sign In"

**Expected Result:**

- Login fails
- Page redirects to /login?error=CredentialsSignin
- Error message displays: "Invalid email or password. Please try again."
- Console shows: "[Auth] API returned error: { status: 401, ... }"

### 3. Missing Email Test ✓

**Steps:**

1. Navigate to http://localhost:3001/login
2. Leave email empty
3. Enter password: demo-password
4. Click "Sign In"

**Expected Result:**

- Browser validation prevents form submission (HTML5 required attribute)
- If bypassed, validation fails and returns null
- Console shows: "[Auth] Validation failed: ..."

### 4. Missing Password Test ✓

**Steps:**

1. Navigate to http://localhost:3001/login
2. Enter email: demo@reguai.local
3. Leave password empty
4. Click "Sign In"

**Expected Result:**

- Browser validation prevents form submission (HTML5 required attribute)
- If bypassed, validation fails and returns null
- Console shows: "[Auth] Validation failed: ..."

### 5. Invalid Email Format Test ✓

**Steps:**

1. Navigate to http://localhost:3001/login
2. Enter email: notanemail
3. Enter password: demo-password
4. Click "Sign In"

**Expected Result:**

- Browser validation prevents form submission (HTML5 email type)
- If bypassed, Zod validation fails
- Console shows: "[Auth] Validation failed: ..."

### 6. API Server Error Test ✓

**Simulation:** Stop the API or modify auth.ts to point to wrong URL

**Expected Result:**

- Login fails gracefully
- Error message displays
- Console shows: "[Auth] Unexpected error during authorization: ..."
- No sensitive data exposed

### 7. Wrong API Response Shape Test ✓

**Simulation:** Modify API to return different structure

**Expected Result:**

- Login fails gracefully
- Console shows: "[Auth] Response missing success or data: ..."
- Returns null, triggering CredentialsSignin error

### 8. URL Error Parameter Display Test ✓

**Steps:**

1. Navigate directly to http://localhost:3001/login?error=CredentialsSignin

**Expected Result:**

- Error message displays immediately: "Invalid email or password. Please try again."
- No console errors

### 9. Session Persistence Test ✓

**Steps:**

1. Login successfully
2. Navigate to protected route (e.g., /incidents)
3. Refresh page

**Expected Result:**

- User remains logged in
- Session persists
- No redirect to login

### 10. Logout and Redirect Test ✓

**Steps:**

1. Login successfully
2. Logout (if logout button exists)
3. Try to access protected route

**Expected Result:**

- User is logged out
- Redirected to /login
- Session cleared

## Security Checks

### ✓ No Sensitive Data in Logs

- Passwords are never logged
- Only email addresses logged in development mode
- Production logs contain no PII

### ✓ Proper Error Handling

- All errors return null (not throwing exceptions)
- Generic error messages to users
- Detailed logs only in development

### ✓ Token/Session Callbacks

- JWT callback receives user object correctly
- Session callback maps token to session correctly
- All required fields (id, name, email, role) present

## Manual Testing Instructions

1. Open browser DevTools Console
2. Set NODE_ENV to development (if not already)
3. Navigate to http://localhost:3001/login
4. Run through each test case above
5. Verify console logs match expected output
6. Verify UI displays correct error messages
7. Verify successful login redirects to dashboard

## Automated Testing (Future)

Consider adding:

- E2E tests with Playwright/Cypress
- Unit tests for authorize() function
- Integration tests for API endpoints
- Session management tests
