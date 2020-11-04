import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Product = props => (
  <tr>
    <td>{props.product.sku}</td>
    <td>{props.product.name}</td>
    <td>{props.product.vendor_name}</td>
    <td>{props.product.price}</td>
    <td>
      <Link to={"/edit-product/" + props.product._id}>edit</Link> | <a href="/" onClick={() => { props.deleteProduct(props.product._id) }}>delete</a>
    </td>
  </tr>
)
export default class ProductsList extends Component {
  constructor(props) {
    super(props);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.state = { products: [] };
  }
  componentDidMount() {
    axios.get('http://localhost:5000/products/')
      .then(response => {
        this.setState({ products: response.data });
      })
      .catch((error) => {
        console.log(error);
      })
  }
  deleteProduct(id) {
    axios.delete('http://localhost:5000/products/' + id)
      .then(res => console.log(res.data));
    this.setState({
      products: this.state.products.filter(el => el._id !== id)
    })
  }
  productList() {
    return this.state.products.map(currentproduct => {
      return <Product product={currentproduct} deleteproduct={this.deleteProduct} key={currentproduct._id} />;
    })
  }
  render() {
    return (
      <div>
        <h3>Product List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Sku</th>
              <th>Name</th>
              <th>Vendor Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.productList()}
          </tbody>
        </table>
      </div>
    )
  }
}