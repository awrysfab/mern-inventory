import React, { Component } from 'react';
import axios from 'axios';

export default class DeleteProduct extends Component {
  constructor(props) {
    super(props);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.state = {
      sku: '',
      name: ''
    }
  }
  componentDidMount() {
    axios.get('http://localhost:5000/products/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          sku: response.data.sku,
          name: response.data.name
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  deleteProduct() {
    axios.delete('http://localhost:5000/products/' + this.props.match.params.id)
      .then(res => console.log(res.data));
    window.location = '/';
  }

  render() {
    return (
      <div>
        <h3>Delete Product</h3>
        <h5>Are you sure want to delete {this.state.name} product data?</h5>
        <br></br>
        <button class="btn btn-primary" onClick={this.deleteProduct}>Delete Product</button>
      </div>
    )
  }
}
