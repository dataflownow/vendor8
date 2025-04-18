
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, X, Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onCheckout: () => void;
}

const Cart = ({ items, onRemoveItem, onUpdateQuantity, onCheckout }: CartProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  if (items.length === 0 && isOpen) {
    setIsOpen(false);
  }

  return (
    <>
      {/* Cart Button */}
      <button
        onClick={toggleCart}
        className="fixed bottom-6 right-6 bg-vendor8-500 text-white p-4 rounded-full shadow-lg hover:bg-vendor8-600 transition-colors z-50"
      >
        <ShoppingCart size={24} />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-white text-vendor8-500 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
            {totalItems}
          </span>
        )}
      </button>

      {/* Cart Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={toggleCart}
          ></div>
          
          {/* Cart Panel */}
          <div className="relative w-full max-w-md bg-white shadow-xl flex flex-col h-full animate-fade-in">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Your Cart</h2>
              <button onClick={toggleCart} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-4">
                <ShoppingCart size={64} className="text-gray-300 mb-4" />
                <p className="text-gray-500 text-center">Your cart is empty</p>
              </div>
            ) : (
              <>
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <div className="flex items-center mt-1">
                            <span className="text-gray-600 text-sm">${item.price.toFixed(2)} × {item.quantity}</span>
                            <span className="mx-2 text-gray-400">|</span>
                            <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center border rounded">
                            <button 
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              className="p-1 text-gray-600 hover:text-vendor8-500 disabled:opacity-50"
                              disabled={item.quantity <= 1}
                            >
                              <span className="sr-only">Decrease quantity</span>
                              <span className="text-sm px-1">-</span>
                            </button>
                            <span className="px-2 py-1 text-sm">{item.quantity}</span>
                            <button 
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="p-1 text-gray-600 hover:text-vendor8-500"
                            >
                              <span className="sr-only">Increase quantity</span>
                              <span className="text-sm px-1">+</span>
                            </button>
                          </div>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-gray-500 hover:text-red-500"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="p-4 border-t">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <Button
                    onClick={onCheckout}
                    className="w-full btn-vendor8"
                  >
                    Checkout
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
