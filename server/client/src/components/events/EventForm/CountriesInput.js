import React, { Component } from 'react';
import PropTypes from 'prop-types';


export class CountriesPicker extends Component {

  static propTypes = {
    isLoading: PropTypes.bool,
    countriesList: PropTypes.array,
    selectedCountries: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    removeCountry: PropTypes.func.isRequired,
  };


  selectedCountriesView = ({ countriesList, selectedCountries, removeCountry } = this.props) => {
    return selectedCountries.map((countryIdx, i) =>
      <div key={i} className="form-check">
        <input
          checked
          className="form-check-input"
          type="checkbox"
          id="defaultCheck1"
          // value is the selectedCountries array index
          // easier to remove this way
          value={i}
          onChange={removeCountry}
        />
        <label className="form-check-label" htmlFor="defaultCheck1">
          {countriesList[countryIdx].name}
        </label>
      </div>
    )
  };


  render() {
    const { isLoading, countriesList, onChange } = this.props;
    console.log('LOAD' + (isLoading ? 'ING' : 'ED'));
    return (
      <div className="form-group">
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={onChange}
        >
          <option disabled defaultValue>Choose Country</option>
          {countriesList.map((country, i) =>
            // value is the countriesList array index
            // easier to remove this way
            <option key={i} value={i}>{country.name}</option>
          )}
        </select>
        {this.selectedCountriesView()}
      </div>
    )
  }
}