# Route Documentation

## Route Structure (Expo Router)

```
src/app/
├── _layout.tsx                          # Root layout (providers, theme, HeroUI setup)
├── (auth)/                              # Auth group (unauthenticated routes)
│   ├── _layout.tsx                      # Auth layout (protection logic)
│   ├── login.tsx                        # /login
│   └── signup.tsx                       # /signup
└── (app)/                               # App group (authenticated routes)
    ├── _layout.tsx                      # App layout (protection logic)
    ├── index.tsx                        # / (home screen)
    ├── explore.tsx                      # /explore (component gallery)
    ├── test.tsx                         # /test (testing screen)
    ├── members/
    │   ├── index.tsx                    # /members (member list)
    │   └── add.tsx                      # /members/add (add member form)
    └── onboarding/
        ├── gym.tsx                      # /onboarding/gym (gym owner setup)
        └── join.tsx                     # /onboarding/join (member join gym)
```

---

## Route Access & Protection

### Unauthenticated Routes (Inside `(auth)` group)

| Route     | Accessibility    | Redirect If Authenticated | Description                        |
| --------- | ---------------- | ------------------------- | ---------------------------------- |
| `/login`  | ✅ Not logged in | → `/(app)`                | User login screen                  |
| `/signup` | ✅ Not logged in | → `/(app)`                | User registration & role selection |

**Layout Logic (`(auth)/_layout.tsx`):**

```typescript
if (session) {
  // User is authenticated → redirect to home
  return <Redirect href="/" />;
}

// Allow access to /login and /signup
return <Stack screenOptions={{ headerShown: false }} />;
```

---

### Authenticated Routes (Inside `(app)` group)

| Route              | Accessibility | Redirect If Not Authenticated | Description                           |
| ------------------ | ------------- | ----------------------------- | ------------------------------------- |
| `/`                | ✅ Logged in  | → `/login`                    | Home screen with HeroUI showcase      |
| `/explore`         | ✅ Logged in  | → `/login`                    | Component gallery & exploration       |
| `/test`            | ✅ Logged in  | → `/login`                    | Testing screen (remove in production) |
| `/members`         | ✅ Logged in  | → `/login`                    | List all members                      |
| `/members/add`     | ✅ Logged in  | → `/login`                    | Add new member form                   |
| `/onboarding/gym`  | ✅ Logged in  | → `/login`                    | Gym owner onboarding flow             |
| `/onboarding/join` | ✅ Logged in  | → `/login`                    | Member join gym flow                  |

**Layout Logic (`(app)/_layout.tsx`):**

```typescript
if (!session) {
  // User is not authenticated → redirect to login
  return <Redirect href="/login" />;
}

// Allow access to all (app) routes
return <AppTabs />;
```

---

## Navigation Flow

### Complete Authentication Flow

```
START
  ↓
User Not Logged In?
  ├─ YES → /login (login screen)
  │    ↓
  │    User clicks "Create account"?
  │    ├─ YES → /signup (signup screen)
  │    │    ↓
  │    │    User enters email, password, and selects role
  │    │    ├─ Role = "owner" → /onboarding/gym
  │    │    └─ Role = "member" → /onboarding/join
  │    │
  │    └─ NO → [Sign In]
  │       ↓
  │       /onboarding/gym (if owner)
  │       /onboarding/join (if member)
  │       ↓
  │       / (home screen - after onboarding)
  │
  └─ NO (Already logged in)
     ↓
     / (home screen)
     ↓
     User can access:
     ├─ /explore (component gallery)
     ├─ /members (member management)
     ├─ /members/add (add member)
     ├─ /onboarding/gym (if role = owner)
     └─ /onboarding/join (if role = member)
     ↓
     User clicks Sign Out
     ↓
     /login (session cleared)
```

---

## Tab Navigation (Authenticated Users)

When user is authenticated and inside `(app)`, native tab bar is shown:

| Tab     | Route      | Component     |
| ------- | ---------- | ------------- |
| Home    | `/`        | HomeScreen    |
| Explore | `/explore` | ExploreScreen |
| Members | `/members` | MembersScreen |

**Tab Bar Component:** `src/components/app-tabs.tsx`

---

## Session State & Redirects

### Session Loading (`isLoading`)

Both layouts wait for `isLoading` to be false before rendering:

```typescript
if (isLoading) {
  return null; // Show nothing while loading
}

// Then check session state and redirect if needed
```

This prevents:

- Flash of wrong UI on app startup
- Redirect loops
- Race conditions

---

## URL Reference

### Development (Expo)

- Local: http://localhost:19000
- Web: http://localhost:19006

### Routes in Browser (Web)

```
http://localhost:19006/login          # Login screen
http://localhost:19006/signup         # Signup screen
http://localhost:19006/                # Home (requires auth)
http://localhost:19006/explore        # Explore (requires auth)
http://localhost:19006/members        # Members list (requires auth)
http://localhost:19006/members/add    # Add member (requires auth)
http://localhost:19006/onboarding/gym # Gym setup (requires auth)
http://localhost:19006/onboarding/join # Join gym (requires auth)
```

---

## Important Rules

### ✅ DO:

- Use routes as defined above
- Use `router.push()` or `router.replace()` for navigation
- Check `session` state before rendering protected content
- Use native tab bar for authenticated navigation

### ❌ DO NOT:

- Navigate to undefined routes
- Try to access authenticated routes when logged out
- Hardcode absolute paths in components
- Create new route files without updating this doc

---

## Route Protection Implementation

### How Routes Are Protected

1. **Root App** (`src/app/_layout.tsx`)
   - Wraps everything with `AuthProvider`
   - Sets up HeroUI and theme providers

2. **Auth Layout** (`src/app/(auth)/_layout.tsx`)
   - Checks if `session` exists
   - If yes → Redirect to home (`/`)
   - If no → Allow access to `/login` and `/signup`

3. **App Layout** (`src/app/(app)/_layout.tsx`)
   - Checks if `session` exists
   - If no → Redirect to login (`/login`)
   - If yes → Render AppTabs (shows tab bar)

4. **useAuth Hook** (`src/providers/auth-provider.tsx`)
   - Provides `session` and `isLoading` state
   - Manages session persistence
   - Listens for auth state changes

---

## Testing Routes

### Quick Test Checklist

- [ ] Start app: `npm start`
- [ ] Not authenticated:
  - [ ] Can access `/login`
  - [ ] Can access `/signup`
  - [ ] Cannot access `/` (redirects to `/login`)
  - [ ] Cannot access `/members` (redirects to `/login`)
- [ ] After signup with role selection:
  - [ ] Owner role → redirects to `/onboarding/gym`
  - [ ] Member role → redirects to `/onboarding/join`
- [ ] After login:
  - [ ] Can access `/` (home screen)
  - [ ] Can access `/explore` (gallery)
  - [ ] Can access `/members` (member list)
  - [ ] Tab bar is visible
- [ ] After logout:
  - [ ] Redirects to `/login`
  - [ ] Cannot access protected routes
