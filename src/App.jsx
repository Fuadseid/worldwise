import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from './pages/Homepage';
import Price from './pages/Pricing';
import Product from './pages/Product';
import PageNotfound from './pages/PageNotFound';
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import CitiesList from "./components/CitiesList";

const BASE_URL='http://localhost:9000';
function App() {
 const [cities,setCities]= useState([]);
 const [Loading,setisLoading]= useState(false);
 useEffect(function(){
 
  async function Loadcities() {
    try{
      setisLoading(true);
 const res= await fetch(`${BASE_URL}/cities`);
 const data = await res.json();
 setCities(data);



 
  } catch{
    alert("There is a problem on the fetching cities");
  } finally{
    setisLoading(false);
  }
  }
  Loadcities();
 },[])
  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route index element={<Home/>}/>
      <Route path="product" element={<Product/>}/>
      <Route path="price" element={<Price/>}/>
      <Route path="login" element={<Login/>}/>
      <Route path="app" element={<AppLayout/>}>
      <Route index element={<CitiesList cities={cities} Loading={Loading}/>} />

      <Route path="cities" element={<CitiesList cities={cities}/>}/>
      <Route path="countries" element={<p>List of Countries</p>} />

      </Route>

      <Route path="*" element={<PageNotfound/>}/>

    </Routes>
    </BrowserRouter>




    </div>
  )
}

export default App
