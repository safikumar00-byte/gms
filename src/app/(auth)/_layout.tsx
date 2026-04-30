import { Redirect, Stack } from "expo-router";

import { useAuth } from "@/providers/auth-provider";

export default function AuthLayout() {
  const { isLoading, session } = useAuth();

  if (isLoading) {
    return null;
  }

  if (session) {
    return <Redirect href="/" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
