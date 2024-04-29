import { OAuthMap } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { supabaseBrowserClient } from "@/utils/supabase/supabase-client";
import { Provider } from "@supabase/supabase-js";
import { Button } from "../ui/button";

interface OAuthProps {
  direction: "vertical" | "horizontal";
}

async function socialAuth(provider: Provider) {
  const supabase = await supabaseBrowserClient();
  await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${location.origin}/auth/callback/`,
    },
  });
}

export default function OAuth({ direction = "horizontal" }: OAuthProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2",
        direction === "vertical" && "flex-col"
      )}
    >
      {OAuthMap.map((provider) => (
        <Button
          className="flex-1 text-2xl w-full gap-2"
          variant={"outline"}
          key={provider.name}
          onClick={() => socialAuth(provider.name)}
        >
          {provider.icon}
          {direction === "vertical" && (
            <span className="text-sm">
              Continue with{" "}
              {provider.name.charAt(0).toUpperCase() + provider.name.slice(1)}
            </span>
          )}
        </Button>
      ))}
    </div>
  );
}
