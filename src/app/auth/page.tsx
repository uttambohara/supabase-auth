import { AuthTabs } from "@/components/auth/auth-tabs";
import CompanyLogo from "@/components/global/company-logo";
import { supabaseServerClient } from "@/utils/supabase/supabase-server";

export default async function AuthPage() {
  const supabase = await supabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log({ user });
  return (
    <div>
      <CompanyLogo />
      <AuthTabs />
    </div>
  );
}
