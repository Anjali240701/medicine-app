import React, { useState, useEffect } from 'react';

function MedicineForm({ onAddToScreen }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState(1); // Default quantity to 1

  // Load form data from localStorage on component mount
  useEffect(() => {
    const storedFormData = JSON.parse(localStorage.getItem('medicineFormData')) || {};
    setName(storedFormData.name || '');
    setDescription(storedFormData.description || '');
    setPrice(storedFormData.price || '');
    setQuantity(storedFormData.quantity || 1);
  }, []);

  // Update localStorage whenever form data changes
  useEffect(() => {
    localStorage.setItem('medicineFormData', JSON.stringify({ name, description, price, quantity }));
  }, [name, description, price, quantity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMedicine = {
      name,
      description,
      price: parseFloat(price),
      quantity: parseInt(quantity),
    };
    onAddToScreen(newMedicine);
    setName('');
    setDescription('');
    setPrice('');
    setQuantity(1); // Reset quantity to 1 after submission
  };

  return (
    <form onSubmit={handleSubmit} className="medicine-form">
      <input
        type="text"
        placeholder="Medicine Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        name="medicineName" // Add name attribute
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        name="medicineDescription" // Add name attribute
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        name="medicinePrice" // Add name attribute
        required
      />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        min="1"
        name="medicineQuantity" // Add name attribute
        required
      />
      <button type="submit" style={{backgroundColor:'white'}}>Add to Screen</button>
    </form>
  );
}

export default MedicineForm;
