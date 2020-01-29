import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { getPost } from '../../actions/post';
import { Card } from 'react-bootstrap';

import { connect } from 'react-redux';
import Loading from '../layouts/Loading';
//Markdown
import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/railscasts.css';

marked.setOptions({
  langPrefix: 'hljs language-',
  highlight: function(code) {
    return hljs.highlightAuto(code).value;
  }
});

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);

  console.log(post);

  return loading || post === null ? (
    <Loading />
  ) : (
    <Fragment>
      <Card bg="dark" text="white" className="mb-2">
        <Card.Header>Header</Card.Header>
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <div dangerouslySetInnerHTML={{ __html: marked(post.text) }} />
        </Card.Body>
      </Card>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
