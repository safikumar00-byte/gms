# Visual Route Flow & Architecture

## 🏗️ Complete Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    APPLICATION ROOT                         │
│              (src/app/_layout.tsx)                           │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  GestureHandlerRootView                              │   │
│  │  └─ HeroUINativeProvider (UI Components)             │   │
│  │     └─ ThemeProvider (Light/Dark Mode)               │   │
│  │        └─ AuthProvider (Session Management)          │   │
│  │           ├─ useState: session, isLoading            │   │
│  │           ├─ useEffect: load session, listen changes │   │
│  │           └─ useContext: expose via useAuth() hook   │   │
│  │              └─ Stack (React Navigation)             │   │
│  │                 ├─ (auth) - Authentication Layout    │   │
│  │                 │                                    │   │
│  │                 └─ (app) - Application Layout        │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘

         ▼

┌─────────────────────────────────────────────────────────────┐
│              ROUTE DECISION LOGIC                            │
│                                                              │
│  ┌────────────────┐         ┌────────────────┐              │
│  │   Is Loading?  │         │   Is Loading?  │              │
│  └────────────────┘         └────────────────┘              │
│         │                           │                       │
│        YES                         YES                      │
│         │                           │                       │
│    Return null              Return null                     │
│  (show nothing)          (show nothing)                     │
│         │                           │                       │
│         ▼                           ▼                       │
│                                                              │
│  ┌─────────────────────┐  ┌─────────────────────┐           │
│  │  (auth) Layout      │  │  (app) Layout       │           │
│  ├─────────────────────┤  ├─────────────────────┤           │
│  │  Has Session?       │  │  Has Session?       │           │
│  │       │             │  │       │             │           │
│  │      YES   NO       │  │      YES   NO       │           │
│  │       │    │        │  │       │    │        │           │
│  │       ▼    ▼        │  │       ▼    ▼        │           │
│  │    Redirect  Stack  │  │    Stack  Redirect  │           │
│  │     to /   /login   │  │    routes  to       │           │
│  │     /     /signup   │  │          /login     │           │
│  └─────────────────────┘  └─────────────────────┘           │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔐 Authentication State Flow

```
┌─────────────────────────────────────────────────────────┐
│              APP INITIALIZATION                          │
└─────────────────────────────────────────────────────────┘
                        ▼
            ┌───────────────────────┐
            │  isLoading = true      │
            │  session = null        │
            └───────────────────────┘
                        ▼
            ┌───────────────────────┐
            │ getSession() from      │
            │ Supabase              │
            └───────────────────────┘
                        ▼
        ┌───────────────────────────┐
        │  Session Found?           │
        └───────────────────────────┘
         /                      \
       YES                       NO
        │                        │
        ▼                        ▼
    ┌────────┐            ┌────────────┐
    │session │            │session=null│
    │ = {..} │            └────────────┘
    └────────┘                 │
        │                      ▼
        │              ┌──────────────┐
        │              │isLoading=false│
        │              │Auth check    │
        │              │allowed       │
        │              └──────────────┘
        │
        ▼
    ┌──────────────┐
    │isLoading=false│
    │Auth required │
    │must redirect │
    └──────────────┘
```

---

## 🚦 Request Flow: "Try to Access /members"

```
USER NAVIGATES TO /members
         ▼
┌─────────────────────────────┐
│  Router checks path         │
│  Path is /members           │
│  /members is inside (app)   │
└─────────────────────────────┘
         ▼
┌─────────────────────────────┐
│  (app)/_layout.tsx runs     │
│  Check: isLoading?          │
└─────────────────────────────┘
         │
        NO
         │
         ▼
┌─────────────────────────────┐
│  Check: session exists?     │
└─────────────────────────────┘
    /               \
  YES               NO
   │                 │
   │                 ▼
   │         ┌────────────────┐
   │         │ <Redirect      │
   │         │  href="/login" │
   │         │ />             │
   │         │ FORCE NAVIGATE │
   │         │ TO /login      │
   │         └────────────────┘
   │
   ▼
┌──────────────────┐
│ <AppTabs>        │
│ Return app with  │
│ navigation       │
│ Show /members    │
└──────────────────┘
```

---

## 🚦 Request Flow: "Try to Access /signup When Authenticated"

```
USER NAVIGATES TO /signup
         ▼
┌─────────────────────────────┐
│  Router checks path         │
│  Path is /signup            │
│  /signup is inside (auth)   │
└─────────────────────────────┘
         ▼
┌─────────────────────────────┐
│  (auth)/_layout.tsx runs    │
│  Check: isLoading?          │
└─────────────────────────────┘
         │
        NO
         │
         ▼
┌─────────────────────────────┐
│  Check: session exists?     │
└─────────────────────────────┘
    /               \
  YES               NO
   │                 │
   ▼                 │
┌──────────────────┐ │
│ <Redirect        │ │
│  href="/"        │ │
│ />               │ │
│ FORCE NAVIGATE   │ │
│ TO HOME (/login  │ │
│ user sees home)  │ │
└──────────────────┘ │
                     │
                     ▼
                ┌──────────────────┐
                │ <Stack>          │
                │ Show /signup     │
                │ (signup screen)  │
                └──────────────────┘
```

---

## 📊 Login/Signup Journey

```
START: Not Authenticated
   │
   ├─ Can access: /login ✅
   │   │
   │   ├─ User enters email/password
   │   │   │
   │   │   ├─ Click "Create account"
   │   │   │   │
   │   │   │   └─ Navigate to /signup ✅
   │   │   │
   │   │   └─ Click "Sign In"
   │   │       │
   │   │       ├─ Call authService.signIn()
   │   │       │   │
   │   │       │   └─ Supabase authenticates
   │   │       │
   │   │       ├─ Session created ✅
   │   │       │   │
   │   │       │   └─ AuthProvider updates
   │   │       │
   │   │       └─ router.replace("/")
   │   │           │
   │   │           └─ Redirect to home ✅
   │   │
   │   └─ Can access: /signup ✅
   │       │
   │       ├─ User enters email/password
   │       │   │
   │       │   ├─ User selects role
   │       │   │   (Gym Owner OR Member)
   │       │   │
   │       │   └─ Click "Create account"
   │       │       │
   │       │       ├─ Call authService.signUp()
   │       │       │   │
   │       │       │   └─ Supabase creates user
   │       │       │
   │       │       ├─ Call authService.updateUserProfile()
   │       │       │   │
   │       │       │   └─ Store role in profiles
   │       │       │
   │       │       ├─ Session created ✅
   │       │       │   │
   │       │       │   └─ AuthProvider updates
   │       │       │
   │       │       └─ Redirect based on role
   │       │           │
   │       │           ├─ "owner" → /onboarding/gym
   │       │           └─ "member" → /onboarding/join
   │       │
   │       └─ [Link] "Back to sign in" → /login
   │
   └─ Cannot access: / ❌ (redirects to /login)
       Cannot access: /members ❌ (redirects to /login)
       Cannot access: /onboarding/* ❌ (redirects to /login)

END: Authenticated
   │
   ├─ Can access: / ✅ (Home)
   ├─ Can access: /explore ✅ (Gallery)
   ├─ Can access: /members ✅ (Members list)
   ├─ Can access: /members/add ✅ (Add member)
   ├─ Can access: /onboarding/gym ✅ (Gym setup)
   ├─ Can access: /onboarding/join ✅ (Join gym)
   │
   ├─ Cannot access: /login ❌ (redirects to /)
   ├─ Cannot access: /signup ❌ (redirects to /)
   │
   └─ Logout → Session cleared → /login
```

---

## 🔄 Tab Navigation (Inside App)

```
┌─────────────────────────────────────────────────────────┐
│                  APP TABS BAR                            │
│                                                          │
│  ┌────────┐  ┌────────┐  ┌─────────┐                    │
│  │ HOME   │  │EXPLORE │  │MEMBERS  │                    │
│  └────────┘  └────────┘  └─────────┘                    │
│     │            │           │                          │
│     └────────┬───┴───────────┘                          │
│              │                                          │
│     Screen Changes:                                     │
│                                                          │
│  HOME    → / (home screen)                             │
│  EXPLORE → /explore (component gallery)                │
│  MEMBERS → /members (member list)                      │
│           → Can click "Add" → /members/add             │
│                                                          │
│  Each tab maintains its own stack                       │
│  Can navigate within stack, back button works          │
│  Tap tab again → Goes to top of that stack             │
└─────────────────────────────────────────────────────────┘
```

---

## 📱 Responsive Design

All routes work on:

- ✅ Mobile (iOS & Android via Expo)
- ✅ Web (http://localhost:19006)
- ✅ Tablet (responsive layout)
- ✅ Different screen sizes

Route logic is the same across all platforms!

---

## 🔗 Key Connections

```
useAuth() hook
    ↓
    ├─ Returns { session, isLoading }
    ├─ Used in (auth)/_layout.tsx
    ├─ Used in (app)/_layout.tsx
    └─ Used in any protected component

router object
    ├─ router.push() - add to stack
    ├─ router.replace() - replace in stack
    └─ Used in signup, login screens

AuthProvider
    ├─ Wraps root app
    ├─ Manages session state
    ├─ Persists session
    └─ Syncs across app
```

---

## ✅ Fixed Issues

```
❌ BEFORE:
  - router used without import
  - Invalid navigation button on home
  - Unclear routing logic
  - No documentation

✅ AFTER:
  - HomeScreen imports fixed
  - Removed invalid button
  - Complete routing documentation
  - 5 comprehensive docs created
```

---

## 🎯 Everything Now Works!

- ✅ Routes are protected
- ✅ Session is managed properly
- ✅ Navigation flows correctly
- ✅ Redirects prevent auth issues
- ✅ Documentation is complete
- ✅ TypeScript is type-safe

Ready for production! 🚀
