import React, { Component } from 'react';
import PropTypes from 'prop-types';



export class SearchBar extends Component {

  static propTypes = {
    cb: PropTypes.func.isRequired,
    isSearching: PropTypes.bool.isRequired
  }

  state = {
    text: ''
  };

  handleChange = (e) => {
    console.log('change', e.target.value)
    this.setState({text: e.target.value});
  };

  render() {
    return (
      <form className="d-flex" onSubmit={() => this.props.cb(this.state.text)}>
        <input
          className="form-control me-sm-2"
          type="text"
          placeholder="Search"
          onChange={this.handleChange} />
        <button
          className="btn btn-secondary my-2 my-sm-0"
          type="submit">
            Search
        </button>
      </form>
    )
  }
}


export default SearchBar;