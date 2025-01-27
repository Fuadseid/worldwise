import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Homepage";
import Price from "./pages/Pricing";
import Product from "./pages/Product";
import PageNotfound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CitiesList from "./components/CitiesList";
import CountriesList from "./components/CountriesList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./Contexts/CitiesContext";
import { AuthProvider } from "./Contexts/FakeAuthContext";
function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <div>
          <BrowserRouter>
            <Routes>
              <Route index element={<Home />} />
              <Route path="product" element={<Product />} />
              <Route path="price" element={<Price />} />
              <Route path="login" element={<Login />} />
              <Route path="app" element={<AppLayout />}>
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="form" element={<Form />} />
                <Route path="cities" element={<CitiesList />} />
                <Route path="countries" element={<CountriesList />} />
              </Route>
              <Route path="*" element={<PageNotfound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
