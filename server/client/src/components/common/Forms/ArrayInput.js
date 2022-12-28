import React, { Component } from 'react';


export class ArrayInput extends Component {


  constructor(props) {
    super(props)
    this.state = this.initialState();
  }

  initialState = () => {
    return {
      text: ''
    };
  };


  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }


  addItem = (e) => {
    this.props.updateArray([...this.props.values, this.state.text]);
    this.setState(this.initialState());
  };


  removeItem = (i) => {
    const { values } = this.props;
    values.splice(parseInt(i), 1)
    this.props.updateArray(values);
  };


  selectItem = (i) => {
    this.props.selectItem(i);
  };


  render() {

    const { name, label, required, selectedItem, values, errors } = this.props;
    const { text } = this.state;

    const inputId = name + '-input';

    return (
      <div id={inputId + '-container'}>
        <div className="input-group">
          <span className="input-group-text">{label || '*'}</span>
          <input
            id={inputId}
            className={"form-control" + (errors ? " is-invalid" : "")}
            type="text"
            required={required}
            // placeholder={label}
            name="text"
            onChange={this.onChange}
            value={text}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.addItem}
          >
            {'add'}
          </button>
          <div className="invalid-feedback">
            {errors}
          </div>
        </div>
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">preview</th>
              <th scope="col">path</th>
              <th scope="col">delete</th>
            </tr>
          </thead>
          <tbody>
            {values.map((value, i) =>
              <tr key={i}>
                <th scope="row">
                  <input
                    type="radio"
                    name="options"
                    id={i}
                    onClick={() => this.selectItem(i)}
                    autoComplete="off"
                    checked={i === selectedItem}
                    readOnly={true}
                  />
                </th>
                <td>
                  {value}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    name={i}
                    onClick={() => this.removeItem(i)}
                  >
                    ❌
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }

}

