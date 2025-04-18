
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import MenuList from "@/components/menu/MenuList";
import Cart, { CartItem } from "@/components/menu/Cart";
import { useToast } from "@/components/ui/use-toast";
import { QrCode } from "lucide-react";

// Mock data for menu items
const mockMenuItems = [
  {
    id: "1",
    name: "Loaded Nachos",
    description: "Corn tortilla chips topped with cheese, jalapeños, guacamole, and sour cream",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1582169296194-e4d644c48063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80"
  },
  {
    id: "2",
    name: "Chicken Wings",
    description: "Crispy chicken wings tossed in your choice of sauce: Buffalo, BBQ, or Honey Sriracha",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80"
  },
  {
    id: "3",
    name: "Pulled Pork Sandwich",
    description: "Slow-cooked pulled pork with BBQ sauce on a brioche bun, served with coleslaw",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80"
  },
  {
    id: "4",
    name: "Loaded Fries",
    description: "Crispy fries topped with cheese sauce, bacon bits, and green onions",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
    isSoldOut: true
  },
  {
    id: "5",
    name: "Beef Brisket Plate",
    description: "Smoked beef brisket with two sides: mac & cheese, coleslaw, or baked beans",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80"
  },
  {
    id: "6",
    name: "Street Tacos",
    description: "Three soft corn tortillas with grilled chicken or beef, onions, cilantro, and salsa",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80"
  }
];

const MenuPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();
  
  const handleAddToCart = (id: string, quantity: number) => {
    const itemToAdd = mockMenuItems.find(item => item.id === id);
    
    if (itemToAdd && !itemToAdd.isSoldOut) {
      setCartItems(prev => {
        const existingItem = prev.find(item => item.id === id);
        
        if (existingItem) {
          return prev.map(item => 
            item.id === id 
              ? { ...item, quantity: item.quantity + quantity } 
              : item
          );
        } else {
          return [...prev, { 
            id, 
            name: itemToAdd.name, 
            price: itemToAdd.price, 
            quantity 
          }];
        }
      });
      
      toast({
        title: "Added to cart",
        description: `${quantity} × ${itemToAdd.name} added to your cart`,
      });
    }
  };
  
  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };
  
  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      handleRemoveItem(id);
      return;
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  const handleCheckout = () => {
    toast({
      title: "Checkout initiated",
      description: "In a real implementation, this would redirect to Stripe checkout.",
    });
    
    // Reset cart after checkout
    setTimeout(() => {
      setCartItems([]);
    }, 2000);
  };

  return (
    <Layout hideFooter>
      <div className="relative">
        {/* Store header */}
        <div className="bg-vendor8-500 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold">The Wing Stand</h1>
                <p className="opacity-90 mt-1">Food vendor at Downtown Summer Festival</p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center">
                <div className="bg-white p-2 rounded-md mr-2">
                  <QrCode className="h-8 w-8 text-vendor8-500" />
                </div>
                <div>
                  <p className="text-sm opacity-90">Scan the QR code or</p>
                  <p className="font-semibold">Share this menu</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Menu content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-bold mb-6">Menu</h2>
          <MenuList 
            items={mockMenuItems} 
            onAddToCart={handleAddToCart} 
          />
        </div>
        
        {/* Cart */}
        <Cart 
          items={cartItems}
          onRemoveItem={handleRemoveItem}
          onUpdateQuantity={handleUpdateQuantity}
          onCheckout={handleCheckout}
        />
      </div>
    </Layout>
  );
};

export default MenuPage;
