# Navigation & Routing Quick Reference

## 📍 Current Route Structure

```
/                          → (app) Home Screen [REQUIRES AUTH]
/explore                   → (app) Explore/Gallery [REQUIRES AUTH]
/test                      → (app) Testing Screen [REQUIRES AUTH]
/members                   → (app) Members List [REQUIRES AUTH]
/members/add               → (app) Add Member Form [REQUIRES AUTH]
/onboarding/gym            → (app) Gym Owner Setup [REQUIRES AUTH]
/onboarding/join           → (app) Join Gym [REQUIRES AUTH]
/login                     → (auth) Login Screen [REQUIRES NO AUTH]
/signup                    → (auth) Signup Screen [REQUIRES NO AUTH]
```

---

## 🔐 Authentication State & Access

### Not Authenticated

✅ Can access:

- `/login`
- `/signup`

❌ Cannot access:

- `/` (redirects to `/login`)
- `/explore` (redirects to `/login`)
- `/members` (redirects to `/login`)
- `/members/add` (redirects to `/login`)
- `/onboarding/gym` (redirects to `/login`)
- `/onboarding/join` (redirects to `/login`)

### Authenticated (After Login)

✅ Can access:

- All `/` routes
- All `/onboarding/` routes
- All `/members/` routes

❌ Cannot access:

- `/login` (redirects to `/`)
- `/signup` (redirects to `/`)

---

## 🔄 Navigation Flows

### Sign Up Flow

```
START → /signup
  ↓
User enters:
  - Email
  - Password
  - Role (Gym Owner OR Member)
  ↓
✅ Click "Create Account"
  ↓
Profile updated with role
  ↓
If role = 'owner'    → /onboarding/gym
If role = 'member'   → /onboarding/join
  ↓
After onboarding → / (home)
```

### Sign In Flow

```
START → /login
  ↓
User enters:
  - Email
  - Password
  ↓
✅ Click "Sign In"
  ↓
Authenticated
  ↓
/ (home screen with tabs)
```

### Sign Out Flow

```
Authenticated User → [Menu] → Sign Out
  ↓
Session cleared
  ↓
/login (forced redirect)
```

---

## 🛡️ Route Protection Mechanism

### How It Works

1. **AuthProvider** (root level)
   - Maintains `session` state
   - Provides `useAuth()` hook
   - Session auto-persists and restores

2. **Auth Layout** checks on every render:

   ```
   if (session exists) → redirect to /
   if (no session) → allow /login and /signup
   ```

3. **App Layout** checks on every render:

   ```
   if (no session) → redirect to /login
   if (session exists) → allow all (app) routes
   ```

4. **Components** can also check:
   ```typescript
   const { session } = useAuth();
   if (!session) return <Redirect href="/login" />;
   ```

---

## 💻 Programmatic Navigation

### Import router

```typescript
import { router } from "expo-router";
```

### Navigate to route

```typescript
// Push (adds to stack - can go back)
router.push("/members");

// Replace (replaces current - cannot go back)
router.replace("/onboarding/gym");

// Back to previous
router.back();
```

### Examples in Code

**Login screen:**

```typescript
router.replace("/"); // After successful login
```

**Signup screen:**

```typescript
if (role === "owner") {
  router.replace("/onboarding/gym");
} else {
  router.replace("/onboarding/join");
}
```

**Members screen:**

```typescript
<Button onPress={() => router.push('/members/add')}>
  Add Member
</Button>
```

---

## 🐛 Troubleshooting

### Issue: "router is not defined"

**Solution:** Import from expo-router

```typescript
import { router } from "expo-router";
```

### Issue: Cannot access /signup

**Expected behavior:** If you're already logged in, you can't signup again (redirects to /)

### Issue: Infinite redirect loop

**Cause:** Missing session state check or wrong redirect logic

**Check:**

1. Auth layout only redirects authenticated users to `/`
2. App layout only redirects unauthenticated users to `/login`
3. Both check `isLoading` before making decisions

### Issue: Blank screen on app start

**Expected:** Normal - app is loading session state
**Solution:** Just wait, it will resolve

### Issue: Session not persisting

**Check:** AuthProvider is wrapping entire app

```typescript
<AuthProvider>
  <Stack ... />
</AuthProvider>
```

---

## 📱 Tab Navigation (Authenticated Only)

When user is authenticated inside `(app)`, three tabs appear:

| Tab Name | Route      | Icon         |
| -------- | ---------- | ------------ |
| Home     | `/`        | home icon    |
| Explore  | `/explore` | explore icon |
| Members  | `/members` | people icon  |

Each tab is independent and maintains its own navigation stack.

---

## 📝 Adding New Routes

### Step 1: Create file

```
src/app/(app)/new-route.tsx
```

or

```
src/app/(app)/folder/new-route.tsx
```

### Step 2: Export default component

```typescript
export default function NewRoute() {
  return <View>...</View>;
}
```

### Step 3: Navigate to it

```typescript
router.push("/new-route");
// or if in folder:
router.push("/folder/new-route");
```

### Step 4: Update documentation

- Add to `/docs/routes.md`
- Add to this file if needed

---

## ✅ Testing Routes Locally

### Web (easiest to test)

```bash
npm run web
```

Then navigate using URL bar:

- http://localhost:19006/login
- http://localhost:19006/signup
- http://localhost:19006/
- http://localhost:19006/members

### Mobile (Expo Go)

```bash
npm start
```

Then use navigation buttons and tab bar

### iOS Simulator

```bash
npm run ios
```

### Android Emulator

```bash
npm run android
```

---

## 🎯 Key Principles

1. **Simple:** Routing logic is clear and predictable
2. **Secure:** Protected routes require authentication
3. **Consistent:** All redirects follow same patterns
4. **Maintainable:** Documentation stays updated
5. **Type-Safe:** TypeScript ensures correct routes

---

## 📚 Related Documentation

- **Detailed Routes:** See `/docs/routes.md`
- **API Documentation:** See `/docs/api.md`
- **Routing Fixes:** See `/docs/ROUTING_FIXES.md`
- **Source Code:** Check `/src/app/`
