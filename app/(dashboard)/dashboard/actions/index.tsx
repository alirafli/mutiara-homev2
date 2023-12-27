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

export async function editReport(
  payload:
    | z.infer<typeof FormSchema>
    | {
        image_url?: string;
      },
  id: string
) {
  const supabase = await createSupabaseServerClient();

  try {
    const { data, error } = await supabase
      .from("report_renter")
      .update(payload)
      .eq("id", id)
      .select();

    revalidatePath("/dashboard");

    return { data, error };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function uploadReportImage(
  userId: string,
  file: string,
  fileName: string
) {
  const supabase = await createSupabaseServerClient();
  const buffer = Buffer.from(file.split(",")[1], "base64");

  const { data, error } = await supabase.storage
    .from("images")
    .upload(`report/${userId}_${fileName}.png`, buffer);

  revalidatePath("/dashboard");

  return { data, error };
}

export async function deleteReportImage(filePath?: string) {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.storage
    .from("images")
    .remove([`${filePath}`]);

  revalidatePath("/dashboard");

  return { data, error };
}
