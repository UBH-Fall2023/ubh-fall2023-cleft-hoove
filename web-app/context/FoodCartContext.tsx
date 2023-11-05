import { useListState, useLocalStorage, useSessionStorage } from '@mantine/hooks';
import React, { createContext, useReducer, useContext, useEffect } from 'react';

interface FoodItem {
  name: string;
  price: number;
  pickup: string;
}

interface CartItem {
  items: FoodItem[];
  storageItems: FoodItem[];
  removeItems: any;
  addItem: any;
}

// Initial state
const initialState = {
  items: [],
  storageItems: [],
  removeItems: null,
  addItem: null,
};

// Action types

// Create context
const ListContext = createContext<CartItem>(initialState);

// Provider component
const ListProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems, removeItems] = useSessionStorage<FoodItem[]>({
    key: 'cart-items',
    defaultValue: [],
  });

  const [values, handlers] = useListState(items);

  const addItem = (item: FoodItem) => {
    let a = items;
    a!.push(item);
    setItems(a!);
    handlers.append(item);
  };

  return (
    <ListContext.Provider
      value={{ items: values, storageItems: items!, removeItems, addItem: addItem }}
    >
      {children}
    </ListContext.Provider>
  );
};

// Custom hook to use the context
const useList = () => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error('useList must be used within a ListProvider');
  }
  return context;
};

export { ListProvider, useList };
