import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component"
import ProductsList from "./components/products-list.component";
import EditProduct from "./components/edit-product.component";
import AddProduct from "./components/add-product.component";
import AddVendor from "./components/add-vendor.component";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <br />
        <Route path="/" exact component={ProductsList} />
        <Route path="/edit/:id" component={EditProduct} />
        <Route path="/add" component={AddProduct} />
        <Route path="/vendor" component={AddVendor} />
      </div>
    </Router>
  );
}

export default App;