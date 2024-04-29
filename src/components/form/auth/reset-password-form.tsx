"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import changePassword from "@/actions/supabase";
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
import { Eye, EyeOff, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  password: z.string().min(6, {
    message: "At least 6 characters required!",
  }),
  confirm: z.string().min(6, {
    message: "At least 6 characters required!",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

export function ResetPasswordForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleTogglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };

  const handleTogglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirm: "",
    },
  });
  // ...
  function onSubmit(values: FormSchema) {
    startTransition(async () => {
      setErrorMessage("");
      setSuccessMessage("");
      const response = await changePassword({ ...values });
      const { error, data } = JSON.parse(response);
      if (error) {
        setErrorMessage(error.code);
      } else {
        router.push("/auth");
        toast("Password sucessfully reset.");
      }
    });
  }

  return (
    <Form {...form}>
      <div className="space-y-4 mt-6 w-[400px]">
        <h1 className="text-2xl">Reset your password</h1>
        <p>Please provide your new password.</p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Password"
                      {...field}
                      type={showPassword1 ? "text" : "password"}
                    />
                    <div className="absolute top-3 right-2 cursor-pointer">
                      {showPassword1 ? (
                        <EyeOff
                          onClick={handleTogglePasswordVisibility1}
                          size={18}
                        />
                      ) : (
                        <Eye
                          onClick={handleTogglePasswordVisibility1}
                          size={18}
                        />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Re-enter password"
                      {...field}
                      type={showPassword2 ? "text" : "password"}
                    />
                    <div className="absolute top-3 right-2 cursor-pointer">
                      {showPassword2 ? (
                        <EyeOff
                          onClick={handleTogglePasswordVisibility2}
                          size={18}
                        />
                      ) : (
                        <Eye
                          onClick={handleTogglePasswordVisibility2}
                          size={18}
                        />
                      )}
                    </div>
                  </div>
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
            <span>Change password</span>
            <span>{isPending && <Loader className="animate-spin" />}</span>
          </Button>
        </form>
      </div>
    </Form>
  );
}
