
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useState } from "react";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel } from "@/components/ui/alert-dialog";

const emailFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const signupFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
});

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [emailToSignup, setEmailToSignup] = useState("");
  
  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const signupForm = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: "",
      password: "",
      businessName: "",
    },
  });

  const checkEmail = async (values: z.infer<typeof emailFormSchema>) => {
    try {
      setIsLoading(true);
      
      // First check if the user exists
      const { data, error: userError } = await supabase.auth.signInWithOtp({
        email: values.email,
        options: {
          shouldCreateUser: false, // Don't create a new user yet
        },
      });

      if (userError) {
        if (userError.message === "User not found") {
          // Show signup form if user doesn't exist
          setEmailToSignup(values.email);
          setShowSignupForm(true);
          return;
        }
        throw userError;
      }

      // If we get here, user exists and magic link was sent
      toast.success(
        "Check your email for a login link",
        {
          description: "We sent you a magic link to log in to your store."
        }
      );
      
    } catch (error: any) {
      toast.error("Failed to process request", {
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (values: z.infer<typeof signupFormSchema>) => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            business_name: values.businessName,
          }
        }
      });

      if (error) throw error;

      toast.success("Account created successfully", {
        description: "Please check your email to verify your account."
      });
      
      setShowSignupForm(false);
    } catch (error: any) {
      toast.error("Failed to create account", {
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...emailForm}>
        <form onSubmit={emailForm.handleSubmit(checkEmail)} className="space-y-4">
          <FormField
            control={emailForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    autoComplete="email"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            className="w-full bg-vendor8-500 hover:bg-vendor8-600" 
            disabled={isLoading}
          >
            Continue with Email
          </Button>
        </form>
      </Form>

      <AlertDialog open={showSignupForm} onOpenChange={setShowSignupForm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create your account</AlertDialogTitle>
            <AlertDialogDescription>
              Set up your vendor account to start selling.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <Form {...signupForm}>
            <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4 py-4">
              <FormField
                control={signupForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        type="email"
                        autoComplete="email"
                        disabled={true}
                        value={emailToSignup}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        autoComplete="new-password"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signupForm.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Business name"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button 
                  type="submit"
                  className="bg-vendor8-500 hover:bg-vendor8-600"
                  disabled={isLoading}
                >
                  Create Account
                </Button>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default LoginForm;
