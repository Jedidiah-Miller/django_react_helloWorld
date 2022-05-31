import React, { Component } from 'react'


export class FeedItem extends Component {


  getLinks = () => {
    const { links } = this.props.article
    return links && links.length > 0 ? links : null;
  }

  cardLinks = (links = []) => {
    return (
      <div className="card-body">
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


  tempCardSummary = (s) => {
    /**
     * EX:
      <a href="https://www.reuters.com/world/china/tsai-says-us-national-guard-planning-cooperation-with-taiwan-military-2022-05-31/" target="_blank">Tsai says U.S. National Guard planning 'cooperation' with Taiwan military</a>&nbsp;&nbsp;<font color="#6f6f6f">Reuters</font><strong><a href="https://news.google.com/stories/CAAqNggKIjBDQklTSGpvSmMzUnZjbmt0TXpZd1NoRUtEd2lZMzVpd0JSR3hqNkpjam0zMm9TZ0FQAQ?oc=5" target="_blank">View Full Coverage on Google News</a></strong>
     */

      var parser = new DOMParser();
      const wrapper = `<div>${s}</div>`
      var doc = parser.parseFromString(wrapper, 'text/html');
      return doc.body.firstChild;
  };


  render() {

    console.log(this.props)
    const { title, summary, source, published } = this.props.article;
    const links = this.getLinks();

    return (
      <div className="card mb-3" style={{'max-width': '540px'}}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src="..." className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">
                <small className="text-muted">
                  <a href={source.href} target="_blank">
                    {source.title}
                  </a>
                </small>
              </p>
              <p className="card-text"><small className="text-muted">{published}</small></p>
              <p className="card-text">
                <div dangerouslySetInnerHTML={{__html: summary}} />
              </p>
            {links && this.cardLinks(links)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FeedItem;