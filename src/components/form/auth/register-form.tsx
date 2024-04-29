"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { registerWithEmailAndPassword } from "@/actions/supabase";
import { AlertEl } from "@/components/auth/alert-message";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { userRoles } from "@/lib/constants";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useState, useTransition } from "react";

const formSchema = z
  .object({
    email: z.string().min(2, {
      message: "Email must be at least 2 characters.",
    }),
    password: z.string().min(6, {
      message: "At least 6 characters required!",
    }),
    confirm: z.string().min(6, {
      message: "At least 6 characters required!",
    }),
    role: z.enum(["ADMIN", "VENDOR", "CLIENT"]),
  })
  .refine((val) => val.password === val.confirm, {
    message: "Passwords do not match!",
    path: ["confirm"],
  });

type FormSchema = z.infer<typeof formSchema>;

export function RegisterForm() {
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
      email: "",
      password: "",
      confirm: "",
    },
  });

  // ...
  function onSubmit(values: FormSchema) {
    startTransition(async () => {
      setErrorMessage("");
      setSuccessMessage("");
      const response = await registerWithEmailAndPassword({ ...values });
      const { error, data } = JSON.parse(response);
      // This is not a proper solution
      // follow issue https://github.com/supabase/auth/issues/1517 for more information
      if (data?.user?.identities?.length === 0) {
        setErrorMessage("This user already exists");
      }
      if (error) {
        setErrorMessage(error.code);
      } else {
        if (data?.user.identities?.length !== 0) {
          setSuccessMessage(
            "Verification link sucessfully sent to your email."
          );
        }
      }
    });
  }

  return (
    <Form {...form}>
      <div className="space-y-6 mt-6">
        <h1 className="text-2xl my-6">Create your account</h1>
        <OAuth direction={"horizontal"} />
        <OrBar />
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
                      placeholder="Confirm password"
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
          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {userRoles.map((role) => (
                          <SelectItem value={role} key={role}>
                            <div className="flex items-center gap-2">
                              <span>{role}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Alert message */}
          {errorMessage && <AlertEl type={"error"}>{errorMessage}</AlertEl>}
          {successMessage && (
            <AlertEl type={"success"}>{successMessage}</AlertEl>
          )}
          <Button type="submit" className="w-full !mt-8">
            <span>Register</span>
            <span>{isPending && <Loader className="animate-spin" />}</span>
          </Button>
        </form>
      </div>
    </Form>
  );
}
