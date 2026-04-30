import { supabase } from "../lib/supabase";

export const signUp = async (email: string, password: string) => {
  return await supabase.auth.signUp({ email, password });
};

export const signIn = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password });
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};

export const getSession = async () => {
  return await supabase.auth.getSession();
};

export const onAuthStateChange = (
  callback: Parameters<typeof supabase.auth.onAuthStateChange>[0],
) => {
  return supabase.auth.onAuthStateChange(callback);
};

export const updateUserProfile = async (
  userId: string,
  role: "owner" | "member",
) => {
  return await supabase.from("profiles").update({ role }).eq("id", userId);
};
