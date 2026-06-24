import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import Layout from "./layouts/Layout.jsx";
import Homepage from "./pages/HomePage.jsx";
import NotFound from "./pages/NotFound.jsx";
import { FavouritesProvider } from "./contexts/FavouritesContext.jsx";
import ProductsPage from "./pages/ProductsPage/ProductsPage.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ProductDetail from "./pages/ProductDetail/ProductDetail.jsx";
import FavouritesPage from "./pages/FavouritesPage.jsx"
import { CartProvider } from "./contexts/CartContext.jsx";
import CartPage from "./pages/CartPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";

function App() {
  return <>
    <CartProvider>
      <FavouritesProvider>
        <BrowserRouter>
        <ScrollToTop/>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Homepage />} />
              <Route path='products' element={<ProductsPage />} />
              <Route path='products/:slug' element={<ProductDetail />} />
              <Route path="favourites" element={<FavouritesPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </FavouritesProvider>
    </CartProvider>
  </>
}
export default App;
