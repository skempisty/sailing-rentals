import React from 'react';

import LoadingPageMessage from '../../LoadingPageMessage';

export default class HomePageManagement extends React.Component {
  constructor(props) {
    super(props);

    this.carouselImages = [];

    this.state = {
      loadingPage: true
    }
  }

  componentDidMount() {
    try {
      // const carouselImages = getCarouselImages();

      this.setState({ loadingPage: false });
    } catch (err) {

    }
  }

  render() {
    const { loadingPage } = this.state;
    const { carouselImages } = this;


    return (
      <React.Fragment>
        {false ?
          <React.Fragment></React.Fragment>
          :
          <LoadingPageMessage />
        }

      </React.Fragment>
    )
  }
}