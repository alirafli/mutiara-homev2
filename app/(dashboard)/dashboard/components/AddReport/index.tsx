import React, { useState, useTransition } from "react";
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
import { addReport, editReport, uploadReportImage } from "../../actions";
import { toast } from "@/components/ui/use-toast";
import { fileToBase64 } from "@/utils/FileToBase64";

interface AddReportProps {
  handleModalOpen: (value: boolean) => void;
}

const AddReport = ({ handleModalOpen }: AddReportProps) => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isPending, startTransition] = useTransition();
  const { userId } = useAppSelector((state) => state.persistUserReducer);

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    setSelectedFile(e.target.files[0]);
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const payload = {
        ...data,
        user_id: userId ?? "",
        status: "menunggu",
      };
      const { report: reportData, error } = await addReport(payload);

      if (selectedFile && reportData) {
        const fileData = (await fileToBase64(selectedFile)) as string;
        const { error: imageError, data: imageReportData } =
          await uploadReportImage(userId ?? "", fileData, selectedFile.name);

        await editReport(
          { image_url: imageReportData?.path },
          reportData.id ?? ""
        );

        if (imageError && imageError.message) {
          toast({
            variant: "destructive",
            title: "gagal mengupload Foto KTP!",
            description: `${imageError.message}`,
          });
        }
      }

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

        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel htmlFor="picture">foto keluhan</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    handleImageUpload(e);
                  }}
                />
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
