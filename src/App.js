import React, { useState, useContext, useEffect } from 'react';
import MedicineForm from './components/MedicineForm';
import Cart from './components/Cart';
import Modal from './components/Modal';
import './App.css';
import { StoreContext } from './components/StoreContext';

function App() {
  const { cartItems, medicines, setMedicines, setCartItems } = useContext(StoreContext);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const storedMedicines = JSON.parse(localStorage.getItem('medicines')) || [];
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setMedicines(storedMedicines);
    setCartItems(storedCartItems);
  }, [setMedicines, setCartItems]);

  useEffect(() => {
    localStorage.setItem('medicines', JSON.stringify(medicines));
  }, [medicines]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const generateUniqueId = () => {
    return Math.floor(Math.random() * Date.now()).toString(16);
  };

  const handleAddToCart = (medicine, selectedQuantity) => {
    const remainingQuantity = medicine.quantity - selectedQuantity;
    if (selectedQuantity > 0) {
      if (selectedQuantity <= medicine.quantity) {
        const updatedMedicines = medicines.map((item) => {
          if (item.id === medicine.id) {
            return { ...item, quantity: remainingQuantity >= 0 ? remainingQuantity : 0 };
          }
          return item;
        });
        setMedicines(updatedMedicines);
        const newItem = { ...medicine, quantity: selectedQuantity, id: generateUniqueId() };
        setCartItems([...cartItems, newItem]);
      } else {
        alert("Item out of stock.");
      }
    } else {
      alert("Please select a quantity greater than 0.");
    }
  };

  const handleBuy = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    alert("Order on the way");
  };

  const handleRemoveFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const handleAddToScreen = (medicine) => {
    const newMedicine = { ...medicine, id: generateUniqueId() };
    setMedicines([...medicines, newMedicine]);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Cure Corner - Providing hope, healing, and health</h1>
        <button onClick={toggleCart} className="cart-btn">Cart</button>
      </header>
      <div className='end'>
      </div>
      <div className="container">
        <MedicineForm onAddToScreen={handleAddToScreen} />
        <div className="medicine-items">
          {medicines.map((medicine) => (
            <div key={medicine.id} className="medicine-items">
              <p>Name: {medicine.name}</p>
              <p>Description: {medicine.description}</p>
              <p>Price for one: Rs.{medicine.price}</p>
              <select
                value={medicine.selectedQuantity || 1}
                onChange={(e) => {
                  const selectedQuantity = parseInt(e.target.value);
                  const updatedMedicines = medicines.map((item) => {
                    if (item.id === medicine.id) {
                      return { ...item, selectedQuantity };
                    }
                    return item;
                  });
                  setMedicines(updatedMedicines);
                }}
              >
                {[...Array(medicine.quantity).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>{num + 1}</option>
                ))}
              </select>
              <button onClick={() => handleAddToCart(medicine, medicine.selectedQuantity || 1)}>Add to Cart</button>
              <hr/>
            </div>
          ))}
        </div>
      </div>
      {showCart && (
        <Modal onClose={toggleCart}>
          <div className="cart">
            <button className="close-cart-btn" onClick={toggleCart}>Close Cart</button>
            <h2>Cart</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <p>Name: {item.name}</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => handleBuy(item.id)}>Buy</button>
                <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                
              </div>
            ))}
          </div>
        </Modal>
      )}
    
    </div>
  );
}

export default App;
