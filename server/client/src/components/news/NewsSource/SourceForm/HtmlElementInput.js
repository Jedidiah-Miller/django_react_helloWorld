import React, { Component } from 'react';
import TextInput from '../../../common/Forms/TextInput';


export class HtmlElementInput extends Component {

  onChange = (e) => {
    this.props.onChange(this.props.name, e);
  };

  render() {

    const { name, value } = this.props;

    return (
      <div
        id={name + '-input-container'}
        className={'HtmlElementInput-container' + 'form-inline' }
      >
        <span>{name}</span>
        <TextInput
          name={'className'}
          label={name + ' Class Name'}
          value={value.className}
          onChange={this.onChange}
        />
        <TextInput
          name={'elementType'}
          label={name + ' Element Type'}
          value={value.elementType}
          onChange={this.onChange}
        />
        <hr />
      </div>
    )
  }
}
