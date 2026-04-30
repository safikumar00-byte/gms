import { Redirect } from "expo-router";

import AppTabs from "@/components/app-tabs";
import { useAuth } from "@/providers/auth-provider";

export default function ProtectedAppLayout() {
  const { isLoading, session } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return <AppTabs />;
}
