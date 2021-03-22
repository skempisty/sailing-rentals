import React from 'react';
import ContentWrapper from "../ContentWrapper";

import getPost from '../../api/getPost';
import LoadingPageMessage from "../LoadingPageMessage";

export default class ShowPost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }

  async componentDidMount() {
    const id = this.props.match.params.id

    try {
      this.post = await getPost(id);

      this.setState({ loading: false });
    } catch (err) {

    }
  }

  render() {
    const { loading } = this.state;
    const { post } = this;

    return (
      <ContentWrapper>
        {!loading ?
          <React.Fragment>
            <h3>{post.title}</h3>
            <img src={post.img_src} alt='' />
            <div>{post.description}</div>
          </React.Fragment>
          :
          <LoadingPageMessage />
        }
      </ContentWrapper>
    )
  }
}
