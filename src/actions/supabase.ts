"use server";

import { supabaseServerClient } from "@/utils/supabase/supabase-server";

export async function registerWithEmailForOTP({ email }: { email: string }) {
  const supabase = await supabaseServerClient();
  const response = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm/`,
    },
  });
  return JSON.stringify(response);
}

export async function registerWithEmailAndPassword({
  email,
  password,
  role,
}: {
  email: string;
  password: string;
  confirm: string;
  role: "ADMIN" | "VENDOR" | "CLIENT";
}) {
  const supabase = await supabaseServerClient();
  // Check if email exists
  const response = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role,
      },
    },
  });
  console.log({ "After signup": response.data.user });
  return JSON.stringify(response);
}

export async function loginWithEmailAndPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const supabase = await supabaseServerClient();
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  console.log(response);
  return JSON.stringify(response);
}

// Password  reset
export async function sendPasswordResetLink({ email }: { email: string }) {
  const supabase = await supabaseServerClient();
  const response = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback-reset`,
  });
  return JSON.stringify(response);
}

export default async function changePassword({
  password,
  confirm,
}: {
  password: string;
  confirm: string;
}) {
  const supabase = await supabaseServerClient();
  const response = await supabase.auth.updateUser({
    password,
  });
  console.log(response);
  return JSON.stringify(response);
}
