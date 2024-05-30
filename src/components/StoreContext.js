import React, { createContext, useState } from 'react';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [medicines, setMedicines] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  return (
    <StoreContext.Provider value={{ medicines, cartItems, setMedicines, setCartItems }}>
      {children}
    </StoreContext.Provider>
  );
};
