import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component"

import ProductList from "./components/products-list.component";
import AddProduct from "./components/add-product.component";
import EditProduct from "./components/edit-product.component";
import DeleteProduct from "./components/delete-product.component";

import VendorList from "./components/vendors-list.component";
import AddVendor from "./components/add-vendor.component";
import EditVendor from "./components/edit-vendor.component";
import DeleteVendor from "./components/delete-vendor.component";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <br/>
        <Route path="/" exact component={ProductList} />
        <Route path="/add-product" component={AddProduct} />
        <Route path="/edit-product/:id" component={EditProduct} />
        <Route path="/delete-product/:id" component={DeleteProduct} />

        <Route path="/vendors" exact component={VendorList} />
        <Route path="/add-vendor" component={AddVendor} />
        <Route path="/edit-vendor/:id" component={EditVendor} />
        <Route path="/delete-vendor/:id" component={DeleteVendor} />
      </div>
    </Router>
  );
}

export default App;