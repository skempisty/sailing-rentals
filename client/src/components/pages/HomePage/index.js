import React from 'react';
import { Carousel, Card, Button } from "react-bootstrap";

import ContentWrapper from "../../ContentWrapper";
import getCarouselSlides from "../../../api/getCarouselSlides";
import getPosts from "../../../api/getPosts";

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.carouselSlides = [];
    this.posts = [];

    this.state = {
      loadingPage: true
    }
  }

  async componentDidMount() {
    try {
      this.carouselSlides = await getCarouselSlides();
      this.posts = await getPosts();

      this.setState({ loadingPage: false });
    } catch (err) {
      alert(err)
    }
  }

  render() {
    const { history } = this.props;
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

        <ContentWrapper>
          <div style={{ margin: '0 auto', maxWidth: '45em' }}>
            <h2
              style={{
                marginBottom: '1em',
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
              {this.posts.map(post =>
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={post.img_src} />
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.short_description}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => history.push(`/posts/${post.id}`)}
                    >
                      See more
                    </Button>
                  </Card.Body>
                </Card>
              )}
            </div>
          </div>
        </ContentWrapper>
      </React.Fragment>
    )
  }
}