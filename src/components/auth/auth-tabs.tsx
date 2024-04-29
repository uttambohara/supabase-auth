import { LoginForm } from "@/components/form/auth/login-form";
import { MagicForm } from "@/components/form/auth/magic-form";
import { RegisterForm } from "@/components/form/auth/register-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AuthTabs() {
  return (
    <Tabs defaultValue="login" className="w-[28rem] p-6 rounded-md">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="magic">Magic Link</TabsTrigger>
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="magic">
        <MagicForm />
      </TabsContent>
      <TabsContent value="login">
        <LoginForm />
      </TabsContent>
      <TabsContent value="register">
        <RegisterForm />
      </TabsContent>
    </Tabs>
  );
}
