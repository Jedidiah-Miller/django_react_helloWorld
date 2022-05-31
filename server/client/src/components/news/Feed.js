import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getarticles } from '../../actions/articles'
import FeedItem from './FeedItem';


export class Feed extends Component {

  static propTypes = {
    articles: PropTypes.array.isRequired,
    getarticles: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getarticles();
  }

  render() {
  
    const { articles } = this.props;
    return (
      <div>
        {articles.map((a, i) =>
        <div key={i}>
          <FeedItem article={a} />
          <br />
        </div>
        )}
      </div>
    )
  }
}



const mapStateToProps = state => ({
  articles: state.articles.articles
});

export default connect(mapStateToProps, { getarticles }) (Feed);;