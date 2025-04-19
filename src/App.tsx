
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MenuPage from "./pages/MenuPage";
import VendorPage from "./pages/VendorPage";
import AuthPage from "./pages/AuthPage";

const queryClient = new QueryClient();

const App = () => {
  const [session, setSession] = useState(null);
  const [isVendor, setIsVendor] = useState(false);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      
      // If session exists, check if user is a vendor
      if (session) {
        supabase
          .from('profiles')
          .select('is_vendor')
          .eq('id', session.user.id)
          .single()
          .then(({ data, error }) => {
            if (data) {
              setIsVendor(data.is_vendor);
            }
          });
      }
    });

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        
        // Check vendor status when auth state changes
        if (session) {
          supabase
            .from('profiles')
            .select('is_vendor')
            .eq('id', session.user.id)
            .single()
            .then(({ data, error }) => {
              if (data) {
                setIsVendor(data.is_vendor);
              }
            });
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Protected Route Component
  const ProtectedRoute = ({ children, requireVendor = false }) => {
    if (!session) {
      return <Navigate to="/auth" replace />;
    }

    if (requireVendor && !isVendor) {
      return <Navigate to="/vendor/setup" replace />;
    }

    return children;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            
            {/* Vendor routes with authentication */}
            <Route 
              path="/vendor" 
              element={
                <ProtectedRoute requireVendor={true}>
                  <VendorPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Add a vendor setup page */}
            <Route 
              path="/vendor/setup" 
              element={
                <ProtectedRoute>
                  {/* You'll create this component later */}
                  <div>Complete Your Vendor Profile</div>
                </ProtectedRoute>
              } 
            />
            
            <Route path="/menu" element={<MenuPage />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
