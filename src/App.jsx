import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Layout from "./layouts/Layout.jsx";
import Homepage from "./pages/HomePage.jsx";
import NotFound from "./pages/NotFound.jsx";
import { FavouritesProvider } from "./contexts/FavouritesContext.jsx";
import ProductDetail from "./pages/ProductDetail/ProductDetail.jsx";

import ProductsPage from "./pages/ProductsPage/ProductsPage.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";




function App() {
  return <>
    <FavouritesProvider>
    <BrowserRouter>
    <ScrollToTop/>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path='products' element={<ProductsPage />} />
          <Route path='products/:slug' element={<ProductDetail />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </FavouritesProvider>
  </>
}
export default App;
