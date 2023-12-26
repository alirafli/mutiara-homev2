"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Report } from "@/types/report";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { unstable_noStore as noStore } from "next/cache";

export async function getReportData(): Promise<
  PostgrestSingleResponse<Report[]>
> {
  noStore();
  const supabase = await createSupabaseServerClient();

  return await supabase.from("report_renter").select(`*, user_id(*)`);
}
