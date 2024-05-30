import React, { useEffect } from 'react';

function Cart({ cartItems, onBuy }) {
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Update localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="cart">
      <h2>Cart</h2>
      {cartItems.map((item, index) => (
        <div key={index} className="cart-item">
          <p>{item.name}</p>
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => onBuy(item.id)}>Buy</button> {/* Pass item.id instead of index */}
        </div>
      ))}
      <p>Total Quantity: {totalQuantity}</p>
      <p>Total Cost: ${totalPrice}</p>
    </div>
  );
}

export default Cart;
