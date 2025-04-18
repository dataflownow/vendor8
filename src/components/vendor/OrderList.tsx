
import OrderCard, { Order, OrderStatus } from "./OrderCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface OrderListProps {
  orders: Order[];
  onUpdateStatus: (id: string, status: OrderStatus) => void;
}

const OrderList = ({ orders, onUpdateStatus }: OrderListProps) => {
  const activeOrders = orders.filter(
    (order) => ['pending', 'preparing', 'ready'].includes(order.status)
  );
  
  const completedOrders = orders.filter(
    (order) => ['completed', 'cancelled'].includes(order.status)
  );
  
  // Group active orders by status
  const pendingOrders = activeOrders.filter((order) => order.status === 'pending');
  const preparingOrders = activeOrders.filter((order) => order.status === 'preparing');
  const readyOrders = activeOrders.filter((order) => order.status === 'ready');
  
  return (
    <Tabs defaultValue="active" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="active">
          Active Orders ({activeOrders.length})
        </TabsTrigger>
        <TabsTrigger value="completed">
          Completed ({completedOrders.length})
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="active" className="mt-4">
        {activeOrders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No active orders at the moment
          </div>
        ) : (
          <div>
            {pendingOrders.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                  Pending ({pendingOrders.length})
                </h3>
                {pendingOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onUpdateStatus={onUpdateStatus}
                  />
                ))}
              </div>
            )}
            
            {preparingOrders.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                  Preparing ({preparingOrders.length})
                </h3>
                {preparingOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onUpdateStatus={onUpdateStatus}
                  />
                ))}
              </div>
            )}
            
            {readyOrders.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  Ready for Pickup ({readyOrders.length})
                </h3>
                {readyOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onUpdateStatus={onUpdateStatus}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="completed" className="mt-4">
        {completedOrders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No completed orders yet
          </div>
        ) : (
          <div>
            {completedOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onUpdateStatus={onUpdateStatus}
              />
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default OrderList;
