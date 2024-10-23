import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/CheckoutPage';
import Layout from './pages/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: 'cart',
    element: (
      <Layout>
        <Cart />
      </Layout>
    ),
  },
  {
    path: 'checkout',
    element: (
      <Layout>
        <Checkout />
      </Layout>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
