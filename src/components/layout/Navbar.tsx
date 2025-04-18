
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="h-8 w-8 bg-vendor8-500 rounded-md flex items-center justify-center text-white font-bold mr-2">
                8
              </div>
              <span className="text-xl font-bold text-vendor8-800">vendor8</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link to="/" className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-vendor8-500">
                Home
              </Link>
              <Link to="/vendor" className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-vendor8-500">
                Vendors
              </Link>
              <Link to="/menu" className="px-3 py-2 text-sm font-medium text-gray-900 hover:text-vendor8-500">
                Menu Demo
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            <Button variant="outline" size="sm" className="mr-2">
              Log in
            </Button>
            <Button size="sm" className="btn-vendor8">
              Sign up
            </Button>
          </div>
          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-vendor8-500 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white z-50">
          <div className="pt-2 pb-3 space-y-1 px-4">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-vendor8-50"
            >
              Home
            </Link>
            <Link
              to="/vendor"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-vendor8-50"
            >
              Vendors
            </Link>
            <Link
              to="/menu"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-vendor8-50"
            >
              Menu Demo
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 px-4 flex flex-col space-y-2">
            <Button variant="outline" className="w-full justify-center" size="sm">
              Log in
            </Button>
            <Button className="w-full btn-vendor8 justify-center" size="sm">
              Sign up
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
