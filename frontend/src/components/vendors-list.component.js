import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Vendor = props => (
  <tr>
    <td>{props.Vendor.name}</td>
    <td>{props.Vendor.address}</td>
    <td>
      <Link to={"/edit-vendor/" + props.Vendor._id}>edit</Link> | <a href="/" onClick={() => { props.deleteVendor(props.Vendor._id) }}>delete</a>
    </td>
  </tr>
)
export default class VendorsList extends Component {
  constructor(props) {
    super(props);
    this.deleteVendor = this.deleteVendor.bind(this);
    this.state = { vendors: [] };
  }
  componentDidMount() {
    axios.get('http://localhost:5000/vendors/')
      .then(response => {
        this.setState({ vendors: response.data });
      })
      .catch((error) => {
        console.log(error);
      })
  }
  deleteVendor(id) {
    axios.delete('http://localhost:5000/vendors/' + id)
      .then(res => console.log(res.data));
    this.setState({
      vendors: this.state.vendors.filter(el => el._id !== id)
    })
  }
  vendorList() {
    return this.state.vendors.map(currentvendor => {
      return <Vendor Vendor={currentvendor} deletevendor={this.deleteVendor} key={currentvendor._id} />;
    })
  }
  render() {
    return (
      <div>
        <h3>Vendor List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.vendorList()}
          </tbody>
        </table>
      </div>
    )
  }
}