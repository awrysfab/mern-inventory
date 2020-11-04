import React, { Component } from 'react';
import axios from 'axios';

export default class DeleteVendor extends Component {
  constructor(props) {
    super(props);
    this.deleteVendor = this.deleteVendor.bind(this);
    this.state = {
      name: ''
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
  deleteVendor() {
    axios.delete('http://localhost:5000/vendors/' + this.props.match.params.id)
      .then(res => console.log(res.data));
    window.location = '/vendors';
  }

  render() {
    return (
      <div>
        <h3>Delete Vendor</h3>
        <h5>Are you sure want to delete {this.state.name} vendor data?</h5>
        <br></br>
        <button class="btn btn-primary" onClick={this.deleteVendor}>Delete Vendor</button>
      </div>
    )
  }
}
