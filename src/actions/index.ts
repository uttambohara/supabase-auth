"use server";

import { supabaseServerClient } from "@/utils/supabase/supabase-server";

export default async function readUserSession() {
  const supabase = await supabaseServerClient();
  return supabase.auth.getSession();
}
