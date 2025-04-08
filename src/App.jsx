import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./component/AppLayout";
import Pricing from "./pages/Pricing";
import CityList from "./component/CityList";
import CountriesList from "./component/CountriesList";
import City from "./component/City";
import Form from "./component/Form";

export const DataContext = createContext();
const App = () => {
  const [cities, setCities] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(function () {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/cities");
        const data = await response.json();
        setCities(data);
      } catch (error) {
        setError(error?.message || "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ cities, isLoading, error }}>

      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="app" element={<AppLayout />}>

            <Route index element={<p>list of cities</p>} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="form" element={< Form/>} />
            <Route path="countries" element={<CountriesList/>} />

          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </DataContext.Provider>

  );
};

export default App;
