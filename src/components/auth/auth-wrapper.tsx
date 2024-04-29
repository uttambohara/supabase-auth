import OAuth from "@/components/auth/oauth";
import OrBar from "@/components/auth/or-bar";

interface AuthCardProps {
  title: string;
  hasOAuth: boolean;
  OAuthDirection: "vertical" | "horizontal";
  hasORBar: boolean;
  children: React.ReactNode;
  hasForgetPassword: boolean;
}

export default function AuthCard({
  title,
  hasOAuth,
  OAuthDirection,
  hasORBar,
  children,
}: AuthCardProps) {
  return (
    <div className="space-y-6 mt-6">
      <h1 className="text-2xl">{title}</h1>
      {hasOAuth && <OAuth direction={OAuthDirection} />}
      {hasORBar && <OrBar />}
      <div>{children}</div>
    </div>
  );
}
