import LogoutButton from "@/components/auth/logout-button";
import { supabaseServerClient } from "@/utils/supabase/supabase-server";

export default async function Home() {
  const supabase = supabaseServerClient();
  let { data: products, error } = await supabase.from("products").select("*");
  console.log(products);
  return (
    <div>
      <LogoutButton />
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </div>
  );
}
