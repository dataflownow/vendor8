
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Clock, Check, ChefHat, AlertTriangle } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export type OrderStatus = "pending" | "preparing" | "ready" | "completed" | "cancelled";

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  createdAt: Date;
}

interface OrderCardProps {
  order: Order;
  onUpdateStatus: (id: string, status: OrderStatus) => void;
}

const OrderCard = ({ order, onUpdateStatus }: OrderCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const getStatusClasses = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'order-pending';
      case 'preparing':
        return 'order-preparing';
      case 'ready':
        return 'order-ready';
      case 'completed':
        return 'order-completed';
      case 'cancelled':
        return 'border-red-500';
      default:
        return '';
    }
  };
  
  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return <Clock size={18} className="text-yellow-500" />;
      case 'preparing':
        return <ChefHat size={18} className="text-blue-500" />;
      case 'ready':
        return <Check size={18} className="text-green-500" />;
      case 'completed':
        return <Check size={18} className="text-gray-500" />;
      case 'cancelled':
        return <AlertTriangle size={18} className="text-red-500" />;
      default:
        return null;
    }
  };
  
  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'preparing':
        return 'Preparing';
      case 'ready':
        return 'Ready';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return '';
    }
  };

  return (
    <div className={`order-card mb-4 ${getStatusClasses(order.status)}`}>
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <span className="font-semibold text-lg">{order.customerName}</span>
          <span className="ml-2 text-gray-500 text-sm">#{order.id.slice(-4)}</span>
        </div>
        <div className="flex items-center">
          <div className="flex items-center mr-4">
            {getStatusIcon(order.status)}
            <span className="ml-1 text-sm">{getStatusText(order.status)}</span>
          </div>
          <span className="text-sm text-gray-500">{formatTime(order.createdAt)}</span>
        </div>
      </div>
      
      {isExpanded && (
        <div className="mt-4">
          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Order Items</h4>
            <ul className="space-y-2">
              {order.items.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <div>
                    <span>{item.quantity}x </span>
                    <span>{item.name}</span>
                  </div>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="border-t mt-3 pt-3 flex justify-between font-medium">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="mt-4 flex justify-between">
            <div className="text-sm text-gray-500">
              Ordered at {formatTime(order.createdAt)}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Update Status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onUpdateStatus(order.id, 'pending')}>
                  <Clock size={16} className="mr-2 text-yellow-500" />
                  Pending
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onUpdateStatus(order.id, 'preparing')}>
                  <ChefHat size={16} className="mr-2 text-blue-500" />
                  Preparing
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onUpdateStatus(order.id, 'ready')}>
                  <Check size={16} className="mr-2 text-green-500" />
                  Ready
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onUpdateStatus(order.id, 'completed')}>
                  <Check size={16} className="mr-2 text-gray-500" />
                  Completed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onUpdateStatus(order.id, 'cancelled')}>
                  <AlertTriangle size={16} className="mr-2 text-red-500" />
                  Cancel Order
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
