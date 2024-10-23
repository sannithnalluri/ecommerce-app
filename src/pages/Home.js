import React, { useState, useEffect } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { FaShoppingCart } from 'react-icons/fa';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6); // Show 6 products per page
  const [totalProducts, setTotalProducts] = useState(0);

  const fetchProducts = async (page) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products`);
      const data = await response.json();
      setTotalProducts(data.length); // Total number of products for pagination
      setProducts(data.slice((page - 1) * productsPerPage, page * productsPerPage)); // Paginate data
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Check if a product is already in the cart
  const isProductInCart = (productId) => {
    return cart.some((product) => product.id === productId);
  };

  // Add product to the cart and store it in localStorage
  const addToCart = (product) => {
    if (!isProductInCart(product.id)) {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save to localStorage
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 p-20 m-10 px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-105"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-60 object-cover mb-4"
            />
            <div className="px-6 pb-6">
              <h2 className="text-lg font-semibold mb-3 text-gray-800">{product.title}</h2>
              <p className="text-sm text-gray-600 mb-4">{product.description.slice(0, 100)}...</p>
              <div className="flex items-center justify-between mb-4">
                <p className="text-xl font-bold text-gray-800">${product.price}</p>
                <div className="flex items-center text-yellow-500">
                  <AiFillStar />
                  <span className="ml-1 text-sm text-gray-600">{product.rating.rate} ({product.rating.count})</span>
                </div>
              </div>
              
              {/* Conditionally render "Add to Cart" button */}
              {!isProductInCart(product.id) ? (
                <button
                  onClick={() => addToCart(product)}
                  className="bg-blue-600 text-white w-full py-2 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300 hover:bg-blue-700"
                >
                  <FaShoppingCart />
                  Add to Cart
                </button>
              ) : (
                <div>
                <button className="bg-gray-400 text-white w-full py-2 rounded-lg cursor-not-allowed">
                  Added to Cart
                </button>
            
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center items-center mt-8 gap-4">
        <button
          onClick={handlePreviousPage}
          className={`px-4 py-2 text-white bg-blue-600 rounded ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-lg">{currentPage}</span>
        <button
          onClick={handleNextPage}
          className={`px-4 py-2 text-white bg-blue-600 rounded ${currentPage * productsPerPage >= totalProducts && 'opacity-50 cursor-not-allowed'}`}
          disabled={currentPage * productsPerPage >= totalProducts}
        >
          Next
        </button>
      </div>
    </div>
  );
}
