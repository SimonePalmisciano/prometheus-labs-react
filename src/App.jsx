import React from "react";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router";
import Layout from "./layouts/Layout.jsx";
import Homepage from "./pages/HomePage.jsx";



function App() {
  return <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
        <Route index element={<Navigate to='/HomePage' replace />}/>
        <Route path='HomePage' element={<Homepage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </>
}
export default App;
