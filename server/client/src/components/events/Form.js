import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createEvent } from '../../actions/events';
import { getAllCountries } from '../../actions/countries';
import { CountriesPicker } from './CountriesInput';
import { URLsInput } from './URLsInput';
import TextInput from '../common/Forms/TextInput';


export class Form extends Component {

  static propTypes = {
    createEvent: PropTypes.func.isRequired,
    getAllCountries: PropTypes.func.isRequired,
    isLoadingAllCountries: PropTypes.bool,
    countriesList: PropTypes.array,
  };

  constructor(props) {
    super(props)
    this.state = this.initialState();
  }

  componentDidMount() {
    this.props.getAllCountries();
  }

  initialState() {
    return {
      title: '',
      countries: [],
      text: '',
      url: '',
      urls: [],
      imageUrl: '',
      errors: {}
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCountriesChange = (e) => {
    // NOTE: relies on the country.id being the same as its index
    // adds country at index', idx
    const idx = e.target.value;
    console.log('onCountriesChange, adding country at index', idx);
    const newCountry = this.props.countriesList[idx].id;
    this.setState({ countries: [...this.state.countries, newCountry] });
  }

  removeCountry = (e) => {
    // NOTE: removes country from selectedCountries by index
    const idx = e.target.value;
    console.log('removeCountry at index', idx);
    const { countries } = this.state;
    countries.splice(idx, 1);
    this.setState({ countries: countries });
  };

  updateURLs = (e) => {
    e.preventDefault();
    const url = this.state.url;
    this.setState({
      url: '',
      urls: [...this.state.urls, url]
    });
  };


  validateEvent() {
    const errors = {};
    // strings
    const minLength = 2;
    ['title', 'text'].forEach((field) => {
      if (!this.state[field]) {
        errors[field] = `enter the ${field}`;
      }
      if (this.state[field].length < minLength) {
        errors[field] = `${field} must be at least ${minLength}`;
      }
    });
    // arrays
    ['countries', 'urls'].forEach((field) => {
      if (!this.state[field] || this.state[field].length < 1) {
        errors[field] = `there can't be 0 ${field}`;
      }
    });

    return Object.keys(errors).length === 0 ? null : errors;
  }

  eventObj = () => {
    return {
      title: this.state.title,
      countries: this.state.countries,
      text: this.state.text,
      urls: this.state.urls,
      imageUrl: this.state.imageUrl,
    };
  };

  onSubmit = (e) => {
    e.preventDefault();

    const errors = this.validateEvent();
    if (errors) {
      this.setState({errors});
      return;
    }

    const event = this.eventObj();
    console.log(event)
    this.props.createEvent(event);
    // we currently don't get errors in this component
    // back from the server
    if (true) {
      console.log('this is always going to be run as is');
      this.setState(this.initialState());
    }
  }

  render() {

    const { isLoadingAllCountries, countriesList } = this.props;

    const {
      title,
      countries,
      text,
      url,
      urls,
      imageUrl,
      errors
    } = this.state;

    return (
      <div className="card card-body mt-4 mb-4">
        <h2>Add Event</h2>
        <form onSubmit={this.onSubmit}>
          <TextInput
            name="title"
            label="Title"
            required={true}
            onChange={this.onChange}
            value={title}
            errors={errors.title}
          />
          <br />
          <div className="form-group">
            <label>Countries</label>
            <CountriesPicker
              isLoading={isLoadingAllCountries}
              countriesList={countriesList}
              selectedCountries={countries}
              onChange={this.onCountriesChange}
              removeCountry={this.removeCountry}
            />
            <span style={{color: "red"}}>{errors.countries}</span>
          </div>
          <hr />
          <div className="form-group">
            <URLsInput
              url={url}
              urls={urls}
              onChange={this.onChange}
              updateURLs={this.updateURLs}
            />
            <span style={{color: "red"}}>{errors.urls}</span>
          </div>
          <hr />
          <TextInput
            name="imageUrl"
            label="Image Url"
            required={false}
            onChange={this.onChange}
            value={imageUrl}
            errors={errors.imageUrl}
          />
          <hr />
          <div className="form-group">
            <label>Text</label>
            <textarea
              className="form-control"
              name="text"
              rows="9"
              onChange={this.onChange}
              value={text}
            />
            <span style={{color: "red"}}>{errors.text}</span>
          </div>
          <hr />
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  isLoadingAllCountries: state.countries.isLoadingAll,
  countriesList: state.countries.countries
});

export default connect(mapStateToProps, { createEvent, getAllCountries })(Form);