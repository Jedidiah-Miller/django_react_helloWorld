import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ReactTinyLink } from "react-tiny-link";


export class URLsInput extends Component {


  static propTypes = {
    url: PropTypes.string.isRequired,
    urls: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    updateURLs: PropTypes.func.isRequired,
  };

  onClick = (e) => {
    console.log('button clicked', e);
  };


  render() {

    const { url, urls, onChange, updateURLs } = this.props;

    return (
      <div className="form-group">
        <label>Source URLs</label>
        <div className="input-group mb-3">
          <button
            id="button-addon1"
            className="btn btn-primary"
            type="button"
            onClick={updateURLs}
          >
            add +
          </button>
          <input
            name="url"
            type="text"
            className="form-control"
            placeholder=""
            aria-label="Example text with button addon"
            aria-describedby="button-addon1"
            onChange={onChange}
            value={url}
          />
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">URL</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url, i) =>
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>
                  <ReactTinyLink
                    cardSize="small"
                    showGraphic={true}
                    maxLine={2}
                    minLine={1}
                    url={url}
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}
