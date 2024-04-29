import { supabaseServerClient } from "@/utils/supabase/supabase-server";
import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "../ui/button";

export default function LogoutButton() {
  const logout = async () => {
    "use server";
    const supbase = supabaseServerClient();
    await supbase.auth.signOut();
    redirect("/auth");
  };
  return (
    <form action={logout}>
      <Button>
        <LogOut />
        Sign out
      </Button>
    </form>
  );
}
