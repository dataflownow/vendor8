
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import OrderList from "@/components/vendor/OrderList";
import StoreControls from "@/components/vendor/StoreControls";
import MenuManagement from "@/components/vendor/MenuManagement";
import { Order, OrderStatus } from "@/components/vendor/OrderCard";
import { MenuItem } from "@/components/vendor/MenuManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

// Mock data for orders
const mockOrders: Order[] = [
  {
    id: "order-123",
    customerName: "John D.",
    items: [
      { id: "item-1", name: "Chicken Wings", quantity: 2, price: 12.99 },
      { id: "item-2", name: "Loaded Nachos", quantity: 1, price: 10.99 }
    ],
    status: "pending",
    total: 36.97,
    createdAt: new Date(Date.now() - 5 * 60000) // 5 minutes ago
  },
  {
    id: "order-124",
    customerName: "Sarah M.",
    items: [
      { id: "item-5", name: "Beef Brisket Plate", quantity: 1, price: 15.99 },
      { id: "item-6", name: "Street Tacos", quantity: 1, price: 9.99 }
    ],
    status: "preparing",
    total: 25.98,
    createdAt: new Date(Date.now() - 12 * 60000) // 12 minutes ago
  },
  {
    id: "order-125",
    customerName: "Mike T.",
    items: [
      { id: "item-3", name: "Pulled Pork Sandwich", quantity: 1, price: 11.99 }
    ],
    status: "ready",
    total: 11.99,
    createdAt: new Date(Date.now() - 18 * 60000) // 18 minutes ago
  },
  {
    id: "order-126",
    customerName: "Emily R.",
    items: [
      { id: "item-2", name: "Loaded Nachos", quantity: 1, price: 10.99 },
      { id: "item-6", name: "Street Tacos", quantity: 2, price: 9.99 }
    ],
    status: "completed",
    total: 30.97,
    createdAt: new Date(Date.now() - 45 * 60000) // 45 minutes ago
  }
];

// Mock data for menu items
const mockMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Loaded Nachos",
    description: "Corn tortilla chips topped with cheese, jalapeños, guacamole, and sour cream",
    price: 10.99,
    available: true,
    image: "https://images.unsplash.com/photo-1582169296194-e4d644c48063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1100&q=80"
  },
  {
    id: "2",
    name: "Chicken Wings",
    description: "Crispy chicken wings tossed in your choice of sauce: Buffalo, BBQ, or Honey Sriracha",
    price: 12.99,
    available: true,
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80"
  },
  {
    id: "3",
    name: "Pulled Pork Sandwich",
    description: "Slow-cooked pulled pork with BBQ sauce on a brioche bun, served with coleslaw",
    price: 11.99,
    available: true,
    image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80"
  },
  {
    id: "4",
    name: "Loaded Fries",
    description: "Crispy fries topped with cheese sauce, bacon bits, and green onions",
    price: 8.99,
    available: false,
    image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80"
  },
  {
    id: "5",
    name: "Beef Brisket Plate",
    description: "Smoked beef brisket with two sides: mac & cheese, coleslaw, or baked beans",
    price: 15.99,
    available: true,
    image: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80"
  },
  {
    id: "6",
    name: "Street Tacos",
    description: "Three soft corn tortillas with grilled chicken or beef, onions, cilantro, and salsa",
    price: 9.99,
    available: true,
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80"
  }
];

const VendorPage = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(mockMenuItems);
  const [isSessionActive, setIsSessionActive] = useState(true);
  const { toast } = useToast();

  const handleUpdateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === id ? { ...order, status } : order
      )
    );
    
    toast({
      title: "Order Updated",
      description: `Order #${id.slice(-4)} has been updated to ${status}`,
    });
  };
  
  const handleToggleSession = () => {
    setIsSessionActive(!isSessionActive);
    
    toast({
      title: isSessionActive ? "Session Ended" : "Session Started",
      description: isSessionActive ? "Your store is now closed" : "Your store is now open for orders",
    });
  };
  
  const handleUpdateMenuItem = (updatedItem: MenuItem) => {
    setMenuItems(prev => 
      prev.map(item => 
        item.id === updatedItem.id ? updatedItem : item
      )
    );
    
    toast({
      title: "Menu Item Updated",
      description: `${updatedItem.name} has been updated`,
    });
  };
  
  const handleAddMenuItem = (newItem: Omit<MenuItem, "id">) => {
    const id = `item-${Date.now()}`;
    setMenuItems(prev => [...prev, { ...newItem, id }]);
    
    toast({
      title: "Menu Item Added",
      description: `${newItem.name} has been added to your menu`,
    });
  };
  
  const handleDeleteMenuItem = (id: string) => {
    const itemToDelete = menuItems.find(item => item.id === id);
    setMenuItems(prev => prev.filter(item => item.id !== id));
    
    if (itemToDelete) {
      toast({
        title: "Menu Item Deleted",
        description: `${itemToDelete.name} has been removed from your menu`,
      });
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Vendor Dashboard</h1>
        
        <div className="mb-6">
          <StoreControls 
            isSessionActive={isSessionActive}
            onToggleSession={handleToggleSession}
          />
        </div>
        
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="menu">Menu Management</TabsTrigger>
          </TabsList>
          
          <TabsContent value="orders" className="mt-2">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-4">Order Management</h2>
              <OrderList 
                orders={orders} 
                onUpdateStatus={handleUpdateOrderStatus}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="menu" className="mt-2">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <MenuManagement 
                items={menuItems}
                onUpdateItem={handleUpdateMenuItem}
                onAddItem={handleAddMenuItem}
                onDeleteItem={handleDeleteMenuItem}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default VendorPage;
