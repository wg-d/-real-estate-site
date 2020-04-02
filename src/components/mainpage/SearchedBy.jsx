import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  fetchAdvertsBySearchTerm,
  clearSearchedAdverts
} from "../../actions/advert";
import AdvertCard from "../advertcard/AdvertCard";

const initialState = {
  offset: 0,
  limit: 12
};
class MainPage extends Component {
  state = initialState;

  componentDidMount() {
    console.log(this.props);
    switch (this.props.match.params.keyword) {
      case "city":
        const { keyword, value } = this.props.match.params;
        if (this.props.allAdverts) {
          if (this.props.allAdverts.length !== 0) {
            this.setState({
              ...this.state,
              offset: this.props.allAdverts.length
            });
          } else {
            this.setState(initialState);
            this.props.fetchAdvertsBySearchTerm(
              this.state.offset,
              keyword,
              value,
              this.props.location.state
            );
            this.setState({ offset: this.state.offset + this.state.limit });
          }
        } else {
          this.props.fetchAdvertsBySearchTerm(
            0,
            keyword,
            value,
            this.props.location.state
          );
          this.setState({ offset: this.state.offset + this.state.limit });
        }
        break;
      default:
        break;
    }
  }

  loadMore = () => {
    const { keyword, value } = this.props.match.params;
    this.props.fetchAdvertsBySearchTerm(
      this.state.offset,
      keyword,
      value,
      this.props.location.state
    );
    this.setState({ offset: this.state.offset + this.state.limit });
  };

  numberWithSpaces = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  componentWillUnmount() {
    this.props.clearSearchedAdverts();
  }

  render() {
    // console.log(this.state);
    console.log();

    if (!this.props.allAdverts) {
      return (
        <div>
          <h4>Main page is here. Sorry no events yet!</h4>
        </div>
      );
    } else {
      return (
        <Fragment>
          <div className="row mt-3 d-flex justify-content-center">
            {this.props.allAdverts.map((advert, i) => {
              if (advert.advert_images && advert.advert_images.length !== 0) {
                advert.image = advert.advert_images[0].image.url;
              }
              return <AdvertCard advert={advert} key={i} />;
            })}
          </div>
          <div className="col-12 mt-3 mb-5 text-center">
            {this.props.advertsCount <= this.state.offset ? (
              <p className="text-danger">Sorry, no more advertisements</p>
            ) : (
              <button className="btn btn-primary" onClick={this.loadMore}>
                Load More
              </button>
            )}
          </div>
        </Fragment>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    allAdverts: state.advertReducer.searchedAdverts,
    advertsCount: state.advertReducer.advertsCount
  };
}

export default connect(mapStateToProps, {
  fetchAdvertsBySearchTerm,
  clearSearchedAdverts
})(MainPage);
