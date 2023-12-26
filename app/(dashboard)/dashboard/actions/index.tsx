"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { Report } from "@/types/report";
import { PostgrestError, PostgrestSingleResponse } from "@supabase/supabase-js";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { FormSchema } from "../components/AddReport/schema";
import { z } from "zod";

type AddReportResponse = {
  report: Report | null;
  error: PostgrestError | null;
};

export type AddReportPayload =
  | z.infer<typeof FormSchema> & {
      user_id: string;
      status: string;
    };

export async function getReportData(): Promise<
  PostgrestSingleResponse<Report[]>
> {
  noStore();
  const supabase = await createSupabaseServerClient();

  return await supabase.from("report_renter").select(`*, user_id(*)`);
}

export async function addReport(
  data: AddReportPayload
): Promise<AddReportResponse> {
  const supabase = await createSupabaseServerClient();
  const { data: report, error } = await supabase
    .from("report_renter")
    .insert(data)
    .select()
    .single();

  revalidatePath("/dashboard");

  return { report, error };
}

export async function deleteReportById(id?: string) {
  const supabase = await createSupabaseServerClient();
  try {
    const { data, error } = await supabase
      .from("report_renter")
      .delete()
      .eq("id", id);

    revalidatePath("/dashboard");

    return { data, error };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}
