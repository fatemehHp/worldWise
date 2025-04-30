import React, { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AppLayout = lazy(() => import("./component/AppLayout"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));

import CityList from "./component/CityList";
import CountriesList from "./component/CountriesList";
import City from "./component/City";
import Form from "./component/Form";
import { CitiesProvider } from "./context/CitiesContext";
import { AuthContextaProvider } from "./context/AuthContext";
import Authentication from "./pages/Authentication";
import SpinnerFullPage from "./component/SpinnerFullPage";

const App = () => {
  return (
    <CitiesProvider>
      <AuthContextaProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage/>}> 
            <Routes>
              <Route index element={<Homepage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <Authentication>
                    <AppLayout />
                  </Authentication>
                }
              >
                <Route index element={<Navigate to="cities" replace />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="form" element={<Form />} />
                <Route path="countries" element={<CountriesList />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthContextaProvider>
    </CitiesProvider>
  );
};

export default App;
