import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from './page/Home';
import Price from './page/Price';
import Product from './page/Product';
import PageNotfound from './page/PageNotfound';
import AppLayout from "./page/AppLayout";

function App() {
  
  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="product" element={<Product/>}/>
      <Route path="price" element={<Price/>}/>
      <Route path="app" element={<AppLayout/>}/>

      <Route path="*" element={<PageNotfound/>}/>

    </Routes>
    </BrowserRouter>




    </div>
  )
}

export default App
