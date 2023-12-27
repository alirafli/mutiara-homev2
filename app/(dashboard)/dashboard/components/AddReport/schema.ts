import { z } from "zod";

export const FormSchema = z.object({
  title: z.string({ required_error: "wajib di isi!" }),
  type: z.string({ required_error: "wajib di isi!" }),
  note: z.string({ required_error: "wajib di isi!" }),
  image_url: z.string({ required_error: "wajib di isi!" }),
});
