
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

export interface MenuItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isSoldOut?: boolean;
  onAddToCart: (id: string, quantity: number) => void;
}

const MenuItem = ({ id, name, description, price, image, isSoldOut = false, onAddToCart }: MenuItemProps) => {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(id, quantity);
    setQuantity(1);
  };

  return (
    <div className={`menu-item-card ${isSoldOut ? 'opacity-75' : ''}`}>
      <div className="relative h-48 w-full">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover"
        />
        {isSoldOut && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold">
              Sold Out
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <span className="text-vendor8-500 font-semibold">${price.toFixed(2)}</span>
        </div>
        <p className="text-gray-500 text-sm mt-1">{description}</p>
        {!isSoldOut && (
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center border rounded">
                <button 
                  onClick={decrementQuantity}
                  className="p-2 text-gray-600 hover:text-vendor8-500 disabled:opacity-50"
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button 
                  onClick={incrementQuantity}
                  className="p-2 text-gray-600 hover:text-vendor8-500"
                >
                  <Plus size={16} />
                </button>
              </div>
              <Button onClick={handleAddToCart} className="btn-vendor8">
                Add to cart
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItem;
