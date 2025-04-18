
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { PlusCircle, Edit2, Trash2 } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string;
}

interface MenuManagementProps {
  items: MenuItem[];
  onUpdateItem: (item: MenuItem) => void;
  onAddItem: (item: Omit<MenuItem, "id">) => void;
  onDeleteItem: (id: string) => void;
}

const MenuManagement = ({ items, onUpdateItem, onAddItem, onDeleteItem }: MenuManagementProps) => {
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: 0,
    available: true,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
  });

  const handleToggleAvailable = (id: string, available: boolean) => {
    const item = items.find(item => item.id === id);
    if (item) {
      onUpdateItem({ ...item, available });
    }
  };

  const handleSaveEdit = () => {
    if (editingItem) {
      onUpdateItem(editingItem);
      setEditingItem(null);
    }
  };

  const handleSaveNew = () => {
    onAddItem(newItem);
    setNewItem({
      name: "",
      description: "",
      price: 0,
      available: true,
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Menu Items</h2>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="btn-vendor8">
              <PlusCircle className="mr-2" size={16} />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Menu Item</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Item Name</Label>
                <Input 
                  id="name" 
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={newItem.description}
                  onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input 
                  id="price" 
                  type="number" 
                  min="0" 
                  step="0.01"
                  value={newItem.price}
                  onChange={(e) => setNewItem({...newItem, price: parseFloat(e.target.value)})}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="available"
                  checked={newItem.available}
                  onCheckedChange={(checked) => setNewItem({...newItem, available: checked})}
                />
                <Label htmlFor="available">Available</Label>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit" className="btn-vendor8" onClick={handleSaveNew}>Add Item</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4">
        {items.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No menu items yet. Add your first item!
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm border flex items-center justify-between">
                <div className="flex items-center">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-12 h-12 object-cover rounded-md mr-4" 
                  />
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    <Switch
                      id={`available-${item.id}`}
                      checked={item.available}
                      onCheckedChange={(checked) => handleToggleAvailable(item.id, checked)}
                      className="mr-2"
                    />
                    <Label htmlFor={`available-${item.id}`} className="text-sm">
                      {item.available ? 'Available' : 'Sold Out'}
                    </Label>
                  </div>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => setEditingItem(item)}>
                        <Edit2 size={16} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit Menu Item</DialogTitle>
                      </DialogHeader>
                      {editingItem && (
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="edit-name">Item Name</Label>
                            <Input 
                              id="edit-name" 
                              value={editingItem.name}
                              onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="edit-description">Description</Label>
                            <Textarea 
                              id="edit-description" 
                              value={editingItem.description}
                              onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="edit-price">Price ($)</Label>
                            <Input 
                              id="edit-price" 
                              type="number" 
                              min="0" 
                              step="0.01"
                              value={editingItem.price}
                              onChange={(e) => setEditingItem({...editingItem, price: parseFloat(e.target.value)})}
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="edit-available"
                              checked={editingItem.available}
                              onCheckedChange={(checked) => setEditingItem({...editingItem, available: checked})}
                            />
                            <Label htmlFor="edit-available">Available</Label>
                          </div>
                        </div>
                      )}
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button" variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button type="submit" className="btn-vendor8" onClick={handleSaveEdit}>Save Changes</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  <Button variant="ghost" size="icon" onClick={() => onDeleteItem(item.id)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuManagement;
