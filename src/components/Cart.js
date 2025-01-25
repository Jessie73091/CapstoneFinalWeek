import React from 'react'; // Add React import here
import { useState } from 'react';

function Cart() {
  const [cart, setCart] = useState([]);
  const [showCheckout, setShowCheckout] = useState(false);
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });

  const addToCart = (movie) => {
    setCart([...cart, movie]);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    setShowCheckout(true);
  };

  const handlePurchase = () => {
    if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvv) {
      alert('Please fill in all credit card details.');
      return;
    }
    // Simulate payment processing
    alert('Payment successful! Thank you for your purchase.');
    setCart([]); // Clear cart after purchase
    setShowCheckout(false);
    setCardDetails({ number: '', expiry: '', cvv: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  return (
    <div>
      <h1>Your Cart</h1>
      <ul>
        {cart.map((movie, index) => (
          <li key={index}>{movie}</li>
        ))}
      </ul>
      <button onClick={handleCheckout}>Checkout</button>

      {showCheckout && (
        <div>
          <h2>Payment Details</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <label>Card Number:</label>
              <input
                type="text"
                name="number"
                value={cardDetails.number}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Expiry Date:</label>
              <input
                type="text"
                name="expiry"
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>CVV:</label>
              <input
                type="text"
                name="cvv"
                value={cardDetails.cvv}
                onChange={handleInputChange}
              />
            </div>
            <button onClick={handlePurchase}>Purchase</button>
          </form>
        </div>
      )}

      <div>
        <h2>Add a Movie to Your Cart</h2>
        <button onClick={() => addToCart('Inception')}>Add "Inception"</button>
        <button onClick={() => addToCart('The Dark Knight')}>Add "The Dark Knight"</button>
      </div>
    </div>
  );
}

export default Cart;
