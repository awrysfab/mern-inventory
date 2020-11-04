import React, { Component } from 'react';
import axios from 'axios';

export default class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.onChangeSku = this.onChangeSku.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeVendorName = this.onChangeVendorName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      sku: '',
      name: '',
      vendor_name: '',
      price: 0,
      vendors: []
    }
  }
  componentDidMount() {
    axios.get('http://localhost:5000/vendors/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            vendors: response.data.map(vendors => vendors.name),
            vendor_name: response.data[0].name
          });
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }
  onChangeSku(e) {
    this.setState({
      sku: e.target.value
    });
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }
  onChangeVendorName(e) {
    this.setState({
      vendor_name: e.target.value
    });
  }
  onChangePrice(e) {
    this.setState({
      price: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const product = {
      sku: this.state.sku,
      name: this.state.name,
      vendor_name: this.state.vendor_name,
      price: this.state.price
    };
    console.log(product);
    axios.post('http://localhost:5000/products/add', product)
      .then(res => console.log(res.data));
    this.setState({
      sku: '',
      name: '',
      vendor_name: '',
      price: 0,
    })
  }

  render() {
    return (
      <div>
        <h3>Add New Product</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Sku: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.sku}
              onChange={this.onChangeSku}
            />
          </div>
          <div className="form-group">
            <label>Name: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <label>Vendor Name: </label>
            <select ref="userInput"
              required
              className="form-control"
              value={this.state.vendor_name}
              onChange={this.onChangeVendorName}>
              {
                this.state.vendors.map(function (vendor) {
                  return <option
                    key={vendor}
                    value={vendor}>{vendor}
                  </option>;
                })
              }
            </select>
          </div>
          <div className="form-group">
            <label>Price: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.price}
              onChange={this.onChangePrice}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Add Product" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}