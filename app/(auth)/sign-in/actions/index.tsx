"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

export async function login(email: string, password: string) {
  noStore();
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("user")
    .select(`*,house_name(*)`)
    .eq("role", "renter")
    .eq("email", email)
    .eq("password", password)
    .single();

  revalidatePath("sign-in");

  return { data, error };
}
