"use client";

import React, { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AiOutlineLoading } from "react-icons/ai";

const formSchema = z.object({
  email: z
    .string({ required_error: "Email wajib di isi!" })
    .min(1, { message: "Email wajib di isi!" })
    .email("Email tidak valid."),
  password: z
    .string({ required_error: "Password wajib di isi!" })
    .min(8, { message: "Password harus lebih dari 8 karakter!" })
    .max(50),
});

function SigninForm() {
  // const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      // const result = await signInWithEmailAndPassword(values);
      // const { error } = JSON.parse(result);
      // eslint-disable-next-line no-console
      console.log(values);

      // if (error && error.message)
      //   toast({
      //     variant: "destructive",
      //     title: "Fail to Login",
      //     description: `${error.status}: ${error.message}`,
      //   });
      form.reset();
    });
  }

  return (
    <Card className="shadow-lg dark:shadow-lg-dark p-4 md:p-6 md:w-[380px] mx-5 md:mx-auto mt-20">
      <div>
        <CardTitle className="mb-2">Halaman Login</CardTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@gmail.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Password Minimal 8 karakter!"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <AiOutlineLoading className="animate-spin" />
              ) : (
                "Masuk"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </Card>
  );
}

export default SigninForm;
