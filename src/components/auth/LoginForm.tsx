
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EmailFormData {
  email: string;
}

interface SignupFormData extends EmailFormData {
  password: string;
  businessName: string;
}

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  
  const emailForm = useForm<EmailFormData>();
  const signupForm = useForm<SignupFormData>();

  // Get the current site URL
  const siteUrl = window.location.origin;

  const checkEmailExists = async ({ email }: EmailFormData) => {
    setIsLoading(true);
    try {
      // Try to sign in - this is the most reliable way to check if an email exists
      const { error } = await supabase.auth.signInWithOtp({ 
        email,
        options: {
          emailRedirectTo: `${siteUrl}/dashboard`
        }
      });

      if (error?.message.includes("Email not confirmed")) {
        toast.error("Please confirm your email first");
        return;
      }

      if (!error) {
        toast.success("Check your email for a login link");
        return;
      }

      // If we get here, the email doesn't exist
      setEmailValue(email);
      setShowSignupForm(true);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            business_name: data.businessName
          },
          emailRedirectTo: `${siteUrl}/dashboard`
        }
      });

      if (error) throw error;
      toast.success("Check your email to confirm your account");
      setShowSignupForm(false);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (showSignupForm) {
    return (
      <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            value={emailValue}
            disabled
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            {...signupForm.register("password", { required: true })}
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="businessName">Business Name</Label>
          <Input
            id="businessName"
            {...signupForm.register("businessName", { required: true })}
            disabled={isLoading}
          />
        </div>
        <Button type="submit" disabled={isLoading} className="w-full">
          Create Account
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={emailForm.handleSubmit(checkEmailExists)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...emailForm.register("email", { required: true })}
          disabled={isLoading}
        />
      </div>
      <Button type="submit" disabled={isLoading} className="w-full">
        Continue
      </Button>
    </form>
  );
}
