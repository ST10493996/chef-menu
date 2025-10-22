import React, { createContext, useState, ReactNode } from "react";

export interface Dish {
  id: string;
  name: string;
  description: string;
  course: "Starters" | "Mains" | "Desserts";
  price: string;
}

interface MenuContextType {
  dishes: Dish[];
  addDish: (dish: Dish) => void;
}

export const MenuContext = createContext<MenuContextType>({
  dishes: [],
  addDish: () => {},
});

interface ProviderProps {
  children: ReactNode;
}

export const MenuProvider: React.FC<ProviderProps> = ({ children }) => {
  // 👩🏽‍🍳 Preloaded menu items (chef’s prepared dishes)
  const [dishes, setDishes] = useState<Dish[]>([
    {
      id: "1",
      name: "Roasted Tomato Soup",
      description: "Creamy soup made with slow-roasted tomatoes and basil.",
      course: "Starters",
      price: "60",
    },
    {
      id: "2",
      name: "Grilled Ribeye Steak",
      description: "Juicy ribeye served with garlic butter and roasted potatoes.",
      course: "Mains",
      price: "180",
    },
    {
      id: "3",
      name: "Chocolate Lava Cake",
      description: "Warm molten chocolate cake with vanilla ice cream.",
      course: "Desserts",
      price: "85",
    },
  ]);

  const addDish = (dish: Dish) => {
    setDishes((prev) => [...prev, { ...dish, id: Date.now().toString() }]);
  };

  return (
    <MenuContext.Provider value={{ dishes, addDish }}>
      {children}
    </MenuContext.Provider>
  );
};
