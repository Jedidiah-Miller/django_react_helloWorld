import React, { Component } from 'react';
import { ReactTinyLink } from "react-tiny-link";
import { LoaderSpinner } from '../common/UI/LoaderSpinner';


export class FeedItem extends Component {


  getLinks = () => {
    const { links } = this.props.article
    return links && links.length > 0 ? links : null;
  }

  cardLinks = (links = []) => {
    return (
      <div className="card-body">
      <h2>CARD LINKS</h2>
        {links.map((l, i) =>
          <a
            key={i}
            className="card-link"
            target="_blank"
            href={l.href}
          >
            link {i + 1}
          </a>
        )}
      </div>
    );
  };


  render() {

    const { headline, summary, source, url, image_url, time } = this.props.article;
    const links = this.getLinks();

    return (
      <div className="card mb-3">
        <div className="row g-0">
          <div id="image-container" className="col-md-4">
            <a href={url} target="_blank">
              <img src={image_url} className="img-fluid rounded-start" alt="" />
            </a>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <p className="card-text">
                <small className="text-muted">
                  {source}
                </small>
              </p>
              <a id="headline-container" href={url} target="_blank">
                <h5 className="card-title">{headline}</h5>
              </a>
              <p className="card-text">
                <div dangerouslySetInnerHTML={{__html: summary}} />
              </p>
              <p className="card-text"><small className="text-muted">{time}</small></p>
              {links && this.cardLinks(links)}
              <p className="card-text">
                <small className="text-muted">
                  <a href={url} target="_blank">
                    {url}
                  </a>
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FeedItem;