"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { registerWithEmailForOTP } from "@/actions/supabase";
import { AlertEl } from "@/components/auth/alert-message";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import { useState, useTransition } from "react";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

export function MagicForm() {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // ...
  async function onSubmit(values: FormSchema) {
    startTransition(async () => {
      setErrorMessage("");
      setSuccessMessage("");
      const response = await registerWithEmailForOTP({ ...values });
      const { data, error } = JSON.parse(response);
      // This is not a proper solution
      // follow issue https://github.com/supabase/auth/issues/1517 for more information
      if (data?.user?.identities?.length === 0) {
        setErrorMessage("This user already exists");
      }
      if (error) {
        setErrorMessage(error.code);
      } else {
        setSuccessMessage("Verification link sucessfully sent to your email.");
      }
    });
  }

  return (
    <Form {...form}>
      <div className="space-y-6 mt-6">
        <h1 className="text-2xl my-6">Login to your account</h1>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Alert message */}
          {errorMessage && <AlertEl type={"error"}>{errorMessage}</AlertEl>}
          {successMessage && (
            <AlertEl type={"success"}>{successMessage}</AlertEl>
          )}
          <Button type="submit" className="w-full !mt-8 flex gap-2">
            <span>Login</span>
            <span>{isPending && <Loader className="animate-spin" />}</span>
          </Button>
        </form>
      </div>
    </Form>
  );
}
