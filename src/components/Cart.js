import { useState } from 'react';

function Cart() {
  const [cart, setCart] = useState([]);

  const addToCart = (movie) => {
    setCart([...cart, movie]);
  };

  return (
    <div>
      <h1>Your Cart</h1>
      <button onClick={() => alert('Temporary not available')}>Checkout</button>
    </div>
  );
}

export default Cart;
