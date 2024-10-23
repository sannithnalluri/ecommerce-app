import React, { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // Fetch cart items from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
    calculateSummary(storedCart);
  }, []);

  // Calculate total items and total price
  const calculateSummary = (cart) => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const items = cart.reduce((acc, item) => acc + item.quantity, 0);
    setTotalPrice(total.toFixed(2));
    setTotalItems(items);
  };

  // Remove product from cart
  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateSummary(updatedCart);
  };

  // Update product quantity
  const handleQuantityChange = (id, operation) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === id) {
        if (operation === 'increase') {
          item.quantity += 1;
        } else if (operation === 'decrease' && item.quantity > 1) {
          item.quantity -= 1;
        }
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateSummary(updatedCart);
  };

  return (
    <div className="p-16">
      <h1 className="text-3xl mb-6">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-xl">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid gap-6">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
                <img src={item.image} alt={item.title} className="w-24 h-24 object-cover" />
                <div className="ml-4">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-gray-600">Price: ${item.price}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <button
                      className="px-2 py-1 bg-gray-200 rounded"
                      onClick={() => handleQuantityChange(item.id, 'decrease')}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="px-2 py-1 bg-gray-200 rounded"
                      onClick={() => handleQuantityChange(item.id, 'increase')}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemove(item.id)}
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-bold">Cart Summary</h3>
            <p>Total Items: {totalItems}</p>
            <p>Total Price: ${totalPrice}</p>
            <Link to="/checkout">
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
