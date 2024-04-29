import Link from "next/link";

export default function ForgetPasswordLink() {
  return (
    <div className="flex">
      <Link
        className="ml-auto text-sm text-muted-foreground hover:underline hover:underline-offset-4"
        href={"/auth/forget-password"}
      >
        Forget Password?
      </Link>
    </div>
  );
}
