
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { QrCode, Receipt, CreditCard, Clock, Smartphone, Store } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: <QrCode className="h-6 w-6 text-vendor8-500" />,
      title: "QR Code Ordering",
      description: "Customers scan a QR code to instantly access your menu - no app downloads required"
    },
    {
      icon: <Smartphone className="h-6 w-6 text-vendor8-500" />,
      title: "Mobile-First Design",
      description: "Optimized for smartphones with an intuitive interface for quick ordering"
    },
    {
      icon: <Receipt className="h-6 w-6 text-vendor8-500" />,
      title: "Real-Time Orders",
      description: "View and manage incoming orders instantly on your vendor dashboard"
    },
    {
      icon: <CreditCard className="h-6 w-6 text-vendor8-500" />,
      title: "Stripe Payments",
      description: "Secure payment processing with Stripe Connect integration"
    },
    {
      icon: <Clock className="h-6 w-6 text-vendor8-500" />,
      title: "Quick Setup",
      description: "Be up and running in minutes with a frictionless setup process"
    },
    {
      icon: <Store className="h-6 w-6 text-vendor8-500" />,
      title: "Menu Management",
      description: "Easily add, remove, or mark items as sold out during your event"
    }
  ];

  return (
    <Layout>
      {/* Hero section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg 
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2" 
              fill="currentColor" 
              viewBox="0 0 100 100" 
              preserveAspectRatio="none" 
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>
            <div className="pt-10 sm:pt-16 lg:pt-8 xl:pt-16">
              <div className="sm:text-center lg:text-left px-4 sm:px-8 xl:pl-0">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Mobile Ordering for</span>
                  <span className="block text-vendor8-500">Food Event Vendors</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto lg:mx-0">
                  Streamline your food stand operations with vendor8. No app downloads required for customers - just scan a QR code, order, and pay. Manage orders in real-time and focus on what matters most: serving amazing food.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-vendor8-500 hover:bg-vendor8-600 md:py-4 md:text-lg md:px-10">
                      Get Started
                    </Button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link to="/menu">
                      <Button variant="outline" className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                        Try Demo
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
            alt="Food vendor at an event"
          />
        </div>
      </div>

      {/* Features section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-vendor8-500 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to run your food stand
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              vendor8 provides a complete solution for event-based food vendors to take orders, process payments, and manage their business.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div key={index} className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-vendor8-100 rounded-md shadow-lg">
                          {feature.icon}
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.title}</h3>
                      <p className="mt-5 text-base text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-vendor8-500">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to streamline your food sales?</span>
            <span className="block">Start using vendor8 today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-vendor8-100">
            Join other food vendors who are improving their operations and increasing sales with vendor8.
          </p>
          <Button className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-vendor8-600 bg-white hover:bg-vendor8-50 sm:w-auto">
            Sign up for free
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
