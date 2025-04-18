
import MenuItem, { MenuItemProps } from "./MenuItem";

interface MenuListProps {
  items: Omit<MenuItemProps, 'onAddToCart'>[];
  onAddToCart: (id: string, quantity: number) => void;
}

const MenuList = ({ items, onAddToCart }: MenuListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <MenuItem
          key={item.id}
          {...item}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default MenuList;
