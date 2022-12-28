import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './styles.css'


export class IFrame extends Component {


  constructor(props) {
    super(props)
    this.state = {
      selectedElement: 'null'
    };
  }


  componentDidMount() {
    // this.bindIFrameMousemove();
  }


  bindIFrameMousemove() {
    const iframe = document.getElementById('interactive-iframe');

    iframe.contentWindow.addEventListener('mousemove', function(event) {
        var clRect = iframe.getBoundingClientRect();
        var evt = new CustomEvent('mousemove', {bubbles: true, cancelable: false});

        evt.clientX = event.clientX + clRect.left;
        evt.clientY = event.clientY + clRect.top;

        iframe.dispatchEvent(evt);
    });
  }


  onMouseMove = (e) => {
    console.log('onMouseMove', e);
    this.setState({ selectedElement: e.target });
  };

  sandboxOptions = () => {
    return [
      'allow-same-origin',
      'allow-forms',
      'allow-pointer-lock',
      'allow-popups',
      'allow-scripts',
      'allow-top-navigation',
    ].join(' ');
  };


  render() {

    const { selectedElement, url } = this.props;

    return (
      <div id="iFrame-container">
        <span>{selectedElement}</span>
        <iframe
          id={'interactive-iframe'}
          // sandbox={this.sandboxOptions()}
          src={url}
          onMouseMove={this.onMouseMove}
        >
        </iframe>
      </div>
    )
  }
}
