import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createNewsSource } from '../../../../actions/newsSource';
import TextInput from '../../../common/Forms/TextInput';
import { IFrame } from '../../../common/iFrame/main';
import { HtmlElementInput } from './HtmlElementInput';
import { ArrayInput } from '../../../common/Forms/ArrayInput';
import { NewsSource } from '../../../../models/NewsSource';


export class Form extends Component {

  static propTypes = {
    createNewsSource: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props)
    this.state = this.initialState();
  }


  initialState() {
    return {
      name: '',
      url: '',
      urlRequirements: '',
      paths: [],
      selectedPath: 0,
      htmlElements: {
        listItem: {
          className: '',
          elementType: ''
        },
        headline: {
          className: '',
          elementType: ''
        },
        image: {
          className: '',
          elementType: ''
        },
        summary: {
          className: '',
          elementType: ''
        },
        time: {
          className: '',
          elementType: ''
        },
      },
      errors: {}
    }
  }


  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onHtmlElementChange = (name, e) => {
    e.persist();

    this.setState({
      htmlElements: {
        ...this.state.htmlElements,
        [name]: {
          ...this.state.htmlElements[name],
          [e.target.name]: e.target.value
        }
      }
    });
    // }, () => this.highlightIframeElements(this.state.htmlElements[name]));
  }


  iFrameUrl = (url, paths, i) => {
    if(!url) {
      return '';
    }
    return url + (paths.length ? paths[i] : '');
  };


  onPathsChange = (array) => {
    // receives an already updated array
    if (array.length <= this.state.selectedPath) {
      this.setState({ selectedPath: array.length - 1});
    }
    this.setState({paths: array});
  };


  onSelectedPathChange = (i) => {
    this.setState({ selectedPath: i});
  };


  onSubmit = (e) => {
    e.preventDefault();

    // TODO: validate & convert to correct casing
    const newsSource = new NewsSource(this.state);
    this.props.createNewsSource(newsSource.as_snake_case_for_django());
    
    // TODO: check for errors
    if (false) {
      this.setState(this.initialState());
    }
  }


  highlightIframeElements = (element) => {
    if (!(this.state.url && element.className && element.elementType)) {
      console.log('missing info', element);
      return;
    }

    const iframe = document.getElementById('interactive-iframe');
    const elements = iframe.contentWindow.document.getElementsByClassName(element.className);

    for (var i = 0; i < elements.length; i++) {
      // elements[i].style.backgroundColor = "red";
      console.log(elements[i]);
    }
  };


  htmlElementsInputs = () => {
    const { htmlElements } = this.state;

    return (
      <div id="htmlElementsInputs">
        {Object.keys(htmlElements).map((element, i) => 
          <HtmlElementInput
            key={i}
            name={element}
            label={element}
            onChange={this.onHtmlElementChange}
            value={htmlElements[element]}
          />
        )}
      </div>
    );
  };


  render() {

    const {
      name,
      url,
      urlRequirements,
      paths,
      selectedPath,
      errors
    } = this.state;

    return (
      <div id="NewsSourceForm-container">
        <form onSubmit={this.onSubmit}>
          <TextInput
              name="name"
              label="Name"
              required={true}
              onChange={this.onChange}
              value={name}
              // errors={errors.url}
          />
          <hr />
          <TextInput
              name="url"
              label="URL"
              required={true}
              onChange={this.onChange}
              value={url}
              // errors={errors.url}
          />
          <hr />
          <span>Paths</span>
          <ArrayInput
              name="paths"
              label={url}
              required={true}
              updateArray={this.onPathsChange}
              selectItem={this.onSelectedPathChange}
              selectedItem={selectedPath}
              values={paths}
              // errors={errors.url}
          />
          <hr />
          <TextInput
              name="urlRequirements"
              label="URL Requirements - Regex"
              required={true}
              onChange={this.onChange}
              value={urlRequirements}
              // errors={errors.url}
          />
          <hr />
          {this.htmlElementsInputs()}
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
        <IFrame id={'interactive-iframe'} url={this.iFrameUrl(url, paths, selectedPath)} />
      </div>
    )
  }
}



export default connect(null, { createNewsSource })(Form);