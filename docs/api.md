# API Documentation

## Authentication APIs

### Sign Up

**Endpoint:** Client-side (Supabase Auth)
**Service Function:** `authService.signUp(email, password)`

```typescript
const { data, error } = await signUp("user@example.com", "password123");
```

**Response:**

- `data.user` - New user object
- `data.session` - Auth session (if email confirmation not required)
- `error` - Error object if signup fails

**Post-Signup:**
After successful signup, the profile role must be updated:

```typescript
const { error } = await updateUserProfile(userId, "owner" | "member");
```

**Redirect Flow:**

- Role = 'owner' → `/onboarding/gym`
- Role = 'member' → `/onboarding/join`

---

### Sign In

**Endpoint:** Client-side (Supabase Auth)
**Service Function:** `authService.signIn(email, password)`

```typescript
const { data, error } = await signIn("user@example.com", "password123");
```

**Response:**

- `data.session` - Auth session
- `data.user` - User object
- `error` - Error object if signin fails

**Post-Login:**

- Redirect to `/(app)` (home screen)

---

### Sign Out

**Service Function:** `authService.signOut()`

```typescript
const { error } = await signOut();
```

---

## Profile API

### Update User Profile - Set Role

**Endpoint:** Supabase `profiles` table
**Service Function:** `authService.updateUserProfile(userId, role)`

```typescript
const { error } = await updateUserProfile(
  "user-uuid-here",
  "owner", // or 'member'
);
```

**Database Table:** `profiles`
**Columns:**

- `id` (UUID, primary key)
- `role` (text: 'owner' | 'member')
- `created_at` (timestamp)
- `updated_at` (timestamp)

**Security:** RLS policy ensures users can only update their own profile

---

## Members API

### Get All Members

**Service Function:** `memberService.getMembers()`

```typescript
const { data, error } = await getMembers();
```

**Returns:** Array of member objects

```typescript
[
  {
    id: "uuid",
    name: "John Doe",
    phone: "+1234567890",
    created_at: "2026-04-30T00:00:00Z",
  },
];
```

**RLS:** Only returns members from the authenticated user's organization/branch

---

### Create Member

**Service Function:** `memberService.createMember(data)`

```typescript
const { error } = await createMember({
  name: "Jane Doe",
  phone: "+1234567890",
  branch_id: "branch-uuid",
  organization_id: "org-uuid",
});
```

**Required Fields:**

- `name` (string)
- `branch_id` (UUID)
- `organization_id` (UUID)

**Optional Fields:**

- `phone` (string)

**Returns:**

- `data` - Created member object
- `error` - Error object if creation fails

**RLS:** User must have permission to add members to the specified branch/organization

---

## Row Level Security (RLS) Behavior

### Current RLS Policies:

#### Members Table

- **SELECT:** Users can only view members from their organization/branch
- **INSERT:** Users must provide valid `branch_id` and `organization_id`
- **UPDATE/DELETE:** Users can only modify members from their organization

#### Profiles Table

- **SELECT:** Users can view only their own profile
- **UPDATE:** Users can only update their own profile

---

## Supabase Client Usage Rules

### ✅ DO:

- Always use service layer functions (`authService`, `memberService`)
- Pass `branch_id` and `organization_id` for member operations
- Handle errors from database calls
- Use Supabase auth session for authorization

### ❌ DO NOT:

- Call Supabase directly from UI components
- Bypass RLS policies
- Hardcode credentials in client code
- Use anon key for admin operations

---

## Error Handling

All service functions return standard Supabase response format:

```typescript
const { data, error } = await serviceFunction();

if (error) {
  console.error("Error:", error.message);
  // Display error to user
}

if (data) {
  // Process data
}
```

---

## Session & Authentication State

### useAuth() Hook

Access current auth state in any component:

```typescript
import { useAuth } from "@/providers/auth-provider";

export default function MyComponent() {
  const { session, isLoading } = useAuth();

  if (isLoading) return <LoadingSpinner />;
  if (!session) return <Redirect href="/login" />;

  // User is authenticated
}
```

**Returns:**

- `session` - Current Supabase session (null if not authenticated)
- `isLoading` - Boolean indicating if session is being loaded

---

## Key Concepts

### Session Persistence

- Session is automatically persisted in AsyncStorage (mobile) or LocalStorage (web)
- Session is automatically restored on app load
- Session is synced across all tabs/windows

### Auto Token Refresh

- Supabase automatically refreshes expired tokens
- No manual intervention needed

### Role-Based Redirection

- After signup, user role is stored in `profiles.role`
- Role determines initial redirect:
  - 'owner' → Gym owner onboarding flow
  - 'member' → Member join gym flow
