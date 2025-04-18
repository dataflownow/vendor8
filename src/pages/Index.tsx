
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Play } from "lucide-react";

const Index = () => {
  return (
    <Layout hideFooter>
      <div className="min-h-screen bg-gradient-to-b from-vendor8-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[80vh]">
          {/* Main Content */}
          <div className="text-center space-y-8">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Start selling at your</span>
              <span className="block text-vendor8-500">next event</span>
            </h1>
            
            <p className="mt-3 text-xl text-gray-500 sm:mt-4 max-w-md mx-auto">
              Simple mobile ordering for food vendors. No app downloads required - just scan, order, and sell.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Button 
                size="lg"
                className="w-full sm:w-auto bg-vendor8-500 hover:bg-vendor8-600 text-white px-8"
              >
                Log in to my store
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full sm:w-auto"
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
      </div>
    </Layout>
  );
};

export default Index;
