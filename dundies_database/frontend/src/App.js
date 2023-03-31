import './index.css';
import {Route, Routes} from 'react-router-dom';
import Index from './Pages/Index';
import Employees from './Pages/Employees';
import Customers from './Pages/Customers';
import Orders from './Pages/Orders';
import Products from './Pages/Products';
import ProductsOrderd from './Pages/ProductsOrderd'
import Roles from './Pages/Roles';

import Navigation from './Components/Navigation';
import Header from './Components/Header';
import Footer from './Components/Footer';

// Server URL -> http://flip1.engr.oregonstate.edu:9638
const BASE_URL = 'http://flip1.engr.oregonstate.edu:9638';

function App() {
  return (
    <div className="text-xl	">
    <Header />
    <Navigation />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/employees" element={<Employees url={BASE_URL} />} />
      <Route path="/customers" element={<Customers url={BASE_URL}/>} />
      <Route path="/products" element={<Products url={BASE_URL}/>} />
      <Route path="/orders" element={<Orders url={BASE_URL}/>} />
      <Route path="/products-ordered" element={<ProductsOrderd url={BASE_URL}/>} />
      <Route path="/roles" element={<Roles url={BASE_URL} />} />
    </Routes>
    <Footer />
    </div>
  );
}

export default App;
