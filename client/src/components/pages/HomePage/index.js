import React from 'react';
import { Carousel, Card, Button } from "react-bootstrap";

import getHomePageCarouselSlides from "../../../api/getHomePageCarouselSlides";

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.carouselSlides = [];

    this.state = {
      loadingPage: true
    }
  }

  async componentDidMount() {
    try {
      this.carouselSlides = await getHomePageCarouselSlides();

      this.setState({ loadingPage: false });
    } catch (err) {
      alert(err)
    }
  }

  render() {
    const { carouselSlides } = this;

    return (
      <React.Fragment>
        <Carousel controls>
          {carouselSlides.map(slide =>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={slide.img_src}
                style={{
                  height: '22.5em',
                  objectFit: 'cover'
                }}
              />

              <Carousel.Caption>
                <h3>{slide.label}</h3>
                <p>{slide.sub_text}</p>
              </Carousel.Caption>
            </Carousel.Item>
          )}
        </Carousel>

        <div style={{ margin: '0 auto', maxWidth: '45em' }}>
          <h2
            style={{
              margin: '1em auto',
              color: 'white',
              textAlign: 'center'
            }}
          >
            News/Announcements
          </h2>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              margin: '1em auto 0 auto'
            }}
          >
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="http://loremflickr.com/400/200/sailor" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>

            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="http://loremflickr.com/400/200/captain" />
              <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </React.Fragment>
    )
  }
}