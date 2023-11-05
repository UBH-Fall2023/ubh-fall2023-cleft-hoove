import { useListState, useLocalStorage, useSessionStorage } from '@mantine/hooks';
import React, { createContext, useReducer, useContext, useEffect } from 'react';

// Initial state
const initialState = {
  items: [],
};

// Action types


// Create context
const ListContext = createContext(initialState);

// Provider component
const ListProvider = ({ children }) => {

  
  const [items, setItems] = useSessionStorage({
    key: 'cart-items',
    defaultValue: []
  });

  const [values, handlers] = useListState(items);

  const addItem = (item) => {
    const a = items;
    a.push(item)
    setItems(a);
    handlers.append(item);
  }

  return (
    <ListContext.Provider value={{items:values, storageItems: items,  addItem: addItem}}>
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
