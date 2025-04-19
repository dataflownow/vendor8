// src/components/auth/LoginForm.tsx
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit } = useForm<{ email: string }>();

  const onSubmit = async ({ email }: { email: string }) => {
    setIsLoading(true);
    try {
      // 1️⃣ Try to sign them up
      const { error: signUpError } = await supabase.auth.signUp(
        { email },
        {
          // Where should the user land after they click the "confirm account" link?
          emailRedirectTo: `${window.location.origin}/complete-signup`,
        }
      );

      if (signUpError) {
        // If it's “user already registered”, send a login link instead
        if (
          signUpError.status === 400 &&
          signUpError.message.includes("User already registered")
        ) {
          const { error: loginError } = await supabase.auth.signInWithOtp({
            email,
            options: {
              emailRedirectTo: `${window.location.origin}/dashboard`,
            },
          });
          if (loginError) throw loginError;
          toast.success("Check your inbox for a login link.");
        } else {
          throw signUpError;
        }
      } else {
        toast.success("Check your inbox for a signup confirmation link.");
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        {...register("email", { required: true })}
        type="email"
        placeholder="you@example.com"
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading} className="w-full">
        Continue with Email
      </Button>
    </form>
  );
}
