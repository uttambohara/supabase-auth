"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { loginWithEmailAndPassword } from "@/actions/supabase";
import { AlertEl } from "@/components/auth/alert-message";
import ForgetPasswordLink from "@/components/auth/forget-password-link";
import OAuth from "@/components/auth/oauth";
import OrBar from "@/components/auth/or-bar";
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

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

export function LoginForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility1 = () => {
    setShowPassword(!showPassword);
  };

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // ...
  function onSubmit(values: FormSchema) {
    startTransition(async () => {
      setErrorMessage("");
      const response = await loginWithEmailAndPassword({ ...values });
      console.log(response);
      const { error, data } = JSON.parse(response);
      if (error) {
        setErrorMessage("Invalid credentials!");
      }
      router.push("/");
    });
  }

  return (
    <Form {...form}>
      <div className="space-y-6 mt-6">
        <h1 className="text-2xl">Login to your account</h1>
        <OAuth direction={"vertical"} />
        <OrBar />
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div>
                    <div className="relative">
                      <Input
                        placeholder="Password"
                        {...field}
                        type={showPassword ? "text" : "password"}
                      />
                      <div className="absolute top-3 right-2 cursor-pointer">
                        {showPassword ? (
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
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ForgetPasswordLink />
          {/* Alert message */}
          {errorMessage && <AlertEl type={"error"}>{errorMessage}</AlertEl>}
          {successMessage && (
            <AlertEl type={"success"}>{successMessage}</AlertEl>
          )}
          <Button type="submit" className="w-full !mt-8">
            <span>Login</span>
            <span>{isPending && <Loader className="animate-spin" />}</span>
          </Button>
        </form>
      </div>
    </Form>
  );
}
