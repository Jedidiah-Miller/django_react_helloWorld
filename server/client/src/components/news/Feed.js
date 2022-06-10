import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getArticles } from '../../actions/articles'
import { LoaderSpinner } from '../common/UI/LoaderSpinner';
import SearchBar from '../common/UI/SearchBar';
import FeedItem from './FeedItem';


export class Feed extends Component {

  static propTypes = {
    articles: PropTypes.array.isRequired,
    isLoadingArticles: PropTypes.bool.isRequired,
    getArticles: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getArticles();
  }

  loaderSpinner = () => {
    return (
      <div className="spinner-border text-info" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    )
  };

  handleSeach = (q) => {
    this.props.getArticles(q)
  };

  render() {

    if (this.props.isLoadingArticles) {
      return <LoaderSpinner type="primary" />
    }
  
    const { articles } = this.props;
    return (
      <div>
        {/* <SearchBar cb={this.handleSeach.bind(this)} isSearching={false}/> */}
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
  articles: state.articles.articles,
  isLoadingArticles: state.articles.isLoadingArticles,
});

export default connect(mapStateToProps, { getArticles }) (Feed);;