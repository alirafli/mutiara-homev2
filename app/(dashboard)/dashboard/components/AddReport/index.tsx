import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { FormSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading } from "react-icons/ai";
import { Textarea } from "@/components/ui/textarea";
import { useAppSelector } from "@/hooks/useRedux";
import { addReport } from "../../actions";
import { toast } from "@/components/ui/use-toast";

interface AddReportProps {
  handleModalOpen: (value: boolean) => void;
}

const AddReport = ({ handleModalOpen }: AddReportProps) => {
  const [isPending, startTransition] = useTransition();
  const { userId } = useAppSelector((state) => state.persistUserReducer);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const payload = { ...data, user_id: userId ?? "", status: "menunggu" };
      const { error } = await addReport(payload);

      if (error && error.message) {
        toast({
          variant: "destructive",
          title: "gagal menambahkan keluhan",
          description: `${error.code}: ${error.message}`,
        });
      } else {
        toast({
          title: "keluhan berhasil ditambahkan!",
        });
      }

      handleModalOpen(false);
      form.reset();
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>judul keluhan</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>jenis keluhan</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catatan Tambahan</FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter className="gap-6">
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <AiOutlineLoading className="animate-spin" />
            ) : (
              "Tambah"
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default AddReport;
