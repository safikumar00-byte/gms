import { supabase } from "../lib/supabase";

export const createMember = async (data: any) => {
  return await supabase.from("members").insert(data);
};

export const getMembers = async () => {
  return await supabase.from("members").select("*");
};
