"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { sendPasswordResetLink } from "@/actions/supabase";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

export function ForgetPasswordForm() {
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
  function onSubmit(values: FormSchema) {
    startTransition(async () => {
      setErrorMessage("");
      setSuccessMessage("");
      const response = await sendPasswordResetLink({ ...values });
      const { error, data } = JSON.parse(response);
      if (error) {
        setErrorMessage(error.code);
      } else {
        setSuccessMessage("Password reset link sent");
      }
    });
  }

  return (
    <Form {...form}>
      <div className="space-y-4 mt-6">
        <h1 className="text-2xl">Reset your password</h1>
        <p>
          Type in your email and we'll send you a link to reset your password
        </p>
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
          <Button type="submit" className="w-full !mt-8">
            <span>Send reset email</span>
            <span>{isPending && <Loader className="animate-spin" />}</span>
          </Button>
        </form>
      </div>
    </Form>
  );
}
