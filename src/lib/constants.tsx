import { Provider } from "@supabase/supabase-js";
import { Github } from "lucide-react";
import React from "react";
import { BsGoogle } from "react-icons/bs";

interface OAuthMapInterface {
  name: Provider;
  icon: React.ReactNode;
}

export const OAuthMap: OAuthMapInterface[] = [
  {
    name: "github",
    icon: <Github />,
  },
  {
    name: "google",
    icon: <BsGoogle />,
  },
];

export const userRoles = ["ADMIN", "VENDOR", "CLIENT"];
