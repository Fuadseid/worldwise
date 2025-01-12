import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from './page/Home';
import Price from './page/Price';
import Product from './page/Product';
import PageNotfound from './page/PageNotfound';

function App() {
  
  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="product" element={<Product/>}/>
      <Route path="price" element={<Price/>}/>
      <Route path="*" element={<PageNotfound/>}/>

    </Routes>
    </BrowserRouter>




    </div>
  )
}

export default App
