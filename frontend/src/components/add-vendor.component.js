import React, { Component } from 'react';
import axios from 'axios';

export default class AddVendor extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      name: '',
      address: ''
    };
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }
  onChangeAddress(e){
    this.setState({
      address: e.target.value
    })
  }
  onSubmit(e) {
    e.preventDefault();
    const vendor = {
      name: this.state.name,
      address: this.state.address
    };
    console.log(vendor);
    axios.post('http://localhost:5000/vendors/add', vendor)
      .then(res => console.log(res.data))
    this.setState({
      name: '',
      address: ''
    })
    window.location = '/vendors';
  }
  render() {
    return (
      <div>
        <h3>Add New Vendor</h3>
        <form onSubmit={this.onSubmit}>
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
            <label>Address: </label>
            <input type="text"
              required
              className="form-control"
              value={this.state.address}
              onChange={this.onChangeAddress}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Add Vendor" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}