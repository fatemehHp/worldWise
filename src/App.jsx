import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./component/AppLayout";
import Pricing from "./pages/Pricing"
const App = () => {
  return <BrowserRouter>
  <Routes>
    <Route path="/" element={<Homepage/>}/>
    <Route path="product" element={<Product/>}/>
    <Route path="pricing" element={<Pricing/>}/>
    <Route path="app" element={<AppLayout/>}/>
    <Route path="*" element={<PageNotFound/>}/>
  </Routes>
  </BrowserRouter>;
};

export default App;
