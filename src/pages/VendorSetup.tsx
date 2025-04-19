
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const VendorSetup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const user = (await supabase.auth.getUser()).data.user;
      
      if (!user) {
        throw new Error("No user found");
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          business_name: businessName,
          is_vendor: true
        })
        .eq('id', user.id);

      if (error) throw error;

      toast.success("Vendor profile created successfully!");
      navigate("/vendor");
    } catch (error: any) {
      toast.error("Error creating vendor profile", {
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-vendor8-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Complete Your Vendor Profile</h1>
          <p className="text-gray-500 mt-2">Set up your vendor account to start selling</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
              placeholder="Enter your business name"
              disabled={isLoading}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-vendor8-500 hover:bg-vendor8-600"
            disabled={isLoading}
          >
            Complete Setup
          </Button>
        </form>
      </div>
    </div>
  );
};

export default VendorSetup;
