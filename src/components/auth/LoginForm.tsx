
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOtp({
        email: values.email,
        options: {
          shouldCreateUser: true,
        },
      });

      if (error) {
        // Check if this is our custom error message
        if (error.message?.includes('Supabase not configured')) {
          toast.error("Supabase not configured", {
            description: "Please connect your project to Supabase to enable authentication."
          });
        } else {
          throw error;
        }
        return;
      }

      toast.success(
        "Check your email for a login link",
        {
          description: "We sent you a magic link to log in to your store."
        }
      );
      
    } catch (error) {
      toast.error("Failed to send login link", {
        description: "Please try again later."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
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
  );
};

export default LoginForm;
