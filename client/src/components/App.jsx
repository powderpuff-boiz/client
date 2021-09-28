/* eslint-disable camelcase */
import React from 'react';
import axios from 'axios';
import './App.css';
import RnR from './RnR/RnR.jsx';
import '../fa-icons/fa-icons.js';
import RelatedProducts from './RelatedProducts/RelatedProducts.jsx';
import OutfitProducts from './RelatedProducts/OutfitProducts.jsx';
import QuestionsNAnswersContainer from './QnA/QuestionsNAnswersContainer.jsx';
import ProductDetailContainer from './ProductDetail/productDetailContainer.jsx';
import DefaultState from './defaultState';
//=====SVG Images=====//
import EmptyStar from './svgImages/EmptyStar.svg';
import FullStar from './svgImages/FullStar.svg';
import HalfStar from './svgImages/HalfStar.svg';
import OneQStar from './svgImages/OneQStar.svg';
import ThreeQStar from './svgImages/ThreeQStar.svg';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 47425,
      displayProduct: DefaultState.displayProduct,
      displayStyles: DefaultState.diplayStyles,
      reviews: DefaultState.reviews,
      ratings: DefaultState.reviewsMeta,
      questionList: DefaultState.questionList,
      productName: DefaultState.displayProduct.name,
      didUpdate: false,
      productRating: 3.5, // <---- default rating for 47425
      productRatingStars: [
        'http://localhost:3000/images/320a8dcdfa8630bb027068d685345d55-FullStar.svg',
        'http://localhost:3000/images/320a8dcdfa8630bb027068d685345d55-FullStar.svg',
        'http://localhost:3000/images/320a8dcdfa8630bb027068d685345d55-FullStar.svg',
        'http://localhost:3000/images/c3f4068a636879b5661c5ecffac61ec0-HalfStar.svg',
        'http://localhost:3000/images/e97013bc81d13a03fd96102d552868ef-EmptyStar.svg',
      ],
    };
    this.formatBody = this.formatBody.bind(this);
    this.starRatingRender = this.starRatingRender.bind(this);
  }

  formatBody(method, apiRoute, params = {}, data = {}) {
    let bodyObj = {
      method: method,
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp${apiRoute}`,
      data: data,
      params: params,
      headers: { Authorization: '' },
    };

    return bodyObj;
  }

  // componentDidMount() {
  //   let totalReviewCount = DefaultState.reviews.count;
  //   const starRatingObj = DefaultState.reviewsMeta.ratings;
  //   let starRating = 0; let vals = 0;
  //   if (starRatingObj) {
  //     vals = Object.values(starRatingObj);
  //     vals = vals.reduce((prev, cur) => (Number(prev) + Number(cur)));
  //     for (let key in starRatingObj) {
  //       starRating += Number(key) * Number(starRatingObj[key]);
  //     }
  //   }
  //   const starRatingGenerator = this.starRatingRender(starRating / vals);
  //   starRating = Math.round(starRating / vals * 10) / 10;

  //   this.setState({
  //     productRating: starRating,
  //     productRatingStars: starRatingGenerator
  //   });
  // }

  componentDidMount() {
    let productId = window.location.pathname.substring(10);
    console.log('Product ID is: ', productId);
    this.setState({ productId: productId });
  }

  starRatingRender(rating) {
    let result = [];
    let count = 0;
    rating = (Math.round(rating * 4) / 4).toFixed(2);
    while (count !== 5) {
      if (rating >= 1) {
        result.push(FullStar);
        rating -= 1;
        count += 1;
      } else if (rating === 0.5) {
        result.push(HalfStar);
        rating -= 0.5;
        count += 1;
      } else if (rating === 0.75) {
        result.push(ThreeQStar);
        rating -= 0.75;
        count += 1;
      } else if (rating === 0.25) {
        result.push(OneQStar);
        rating -= 0.25;
        count += 1;
      } else {
        result.push(EmptyStar);
        count += 1;
      }
    }
    return result;
  }

  // componentDidMount() {
  //   // eslint-disable-next-line quotes
  //   let body = this.formatBody('GET', `/products/${this.state.productId}`);
  //   axios
  //     .post('/api/*', body)
  //     .then((results) => {
  //       console.log('results', results);
  //       this.setState({ displayProduct: results.data, didUpdate: true });
  //       console.log('this.state', this.state);
  //     })
  //     .catch((err) => {
  //       console.log('error', err);
  //     });
  // }

  render() {
    return (
      <React.Fragment>
        <div>
          <ProductDetailContainer
            productRatingStars={this.state.productRatingStars}
            productId={this.state.productId}
            displayProduct={this.state.displayProduct}
            displayStyles={this.state.displayStyles}
            formatBody={this.formatBody}
          />

          <RelatedProducts relatedProd={this.state.displayProduct} />
          <OutfitProducts />

          <QuestionsNAnswersContainer formatBody={this.formatBody} />

          <RnR
            productID={this.state.productId}
            formatBody={this.formatBody}
            productRating={this.state.productRating}
            productStars={this.state.productRatingStars}
            reviews={this.state.reviews}
            reviewsMeta={this.state.ratings}
            starGenerator={this.starRatingRender}
            productName={this.state.productName}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
