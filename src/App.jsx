import React from "react";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router";
import Layout from "./layouts/Layout.jsx";
import Homepage from "./pages/HomePage.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";



function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
        <Route index element={<Navigate to='/HomePage' replace />}/>
        <Route path='HomePage' element={<Homepage/>}/>
        <Route path='ProductDetail/:slug' element={<ProductDetail/>}/>
        <Route path='*' element={<NotFound/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </>
}
export default App;
