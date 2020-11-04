import React, { Component } from 'react';
import axios from 'axios';

export default class EditVendor extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      address: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/vendors/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          name: response.data.name,
          address: response.data.address
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }
  onChangeAddress(e) {
    this.setState({
      address: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const vendor = {
      name: this.state.name,
      address: this.state.address
    };
    console.log(vendor);
    axios.post('http://localhost:5000/vendors/update/' + this.props.match.params.id, vendor)
      .then(res => console.log(res.data));
    window.location = '/vendors';
  }

  render() {
    return (
      <div>
        <h3>Edit Vendor</h3>
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
            <input
              type="text"
              className="form-control"
              value={this.state.address}
              onChange={this.onChangeAddress}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Edit Vendor" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}