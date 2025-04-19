
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Play } from "lucide-react";
import Layout from "@/components/layout/Layout";
import LoginForm from "@/components/auth/LoginForm";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <Layout hideFooter>
      <div className="min-h-screen bg-gradient-to-b from-vendor8-50 to-white flex items-center justify-center">
        <div className="text-center max-w-md px-4">
<div className="h-16 w-16 bg-vendor8-500 rounded-md flex items-center justify-center text-white font-bold text-4xl mx-auto mb-6">
  8
</div>
          
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            vendor8
          </h1>
          
          <p className="text-xl text-gray-500 mb-8">
            Mobile ordering for food vendors.
          </p>

          <div className="flex flex-col space-y-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  size="lg"
                  className="w-full bg-vendor8-500 hover:bg-vendor8-600 text-white"
                >
                  Start selling
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Start selling</DialogTitle>
                </DialogHeader>
                <LoginForm />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="w-full"
                >
                  <Play className="mr-2 h-4 w-4" />
                  See how it works
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle>How vendor8 works</DialogTitle>
                </DialogHeader>
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Marketing video will go here</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
