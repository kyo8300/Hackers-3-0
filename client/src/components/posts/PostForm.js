import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import { Redirect } from 'react-router-dom';

import { getCommunities } from '../../actions/community';
import { addPost } from '../../actions/post';
import Loading from '../layouts/Loading';

//Markdown
import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/railscasts.css';

marked.setOptions({
  langPrefix: 'hljs language-',
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  },
});

const PostForm = ({
  addPost,
  getCommunities,
  community: { communities, loading },
  auth,
}) => {
  useEffect(() => {
    getCommunities();
  }, [getCommunities]);

  const [formData, setFormData] = useState({
    title: '',
    text: '',
    mycommunity: '',
  });

  const { title, text, mycommunity } = formData;

  const options = communities.map((community) => ({
    label: community.name,
    value: community._id,
  }));

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onChangeSelect = (e, name) => {
    setFormData({ ...formData, [name]: e.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addPost({ title, text, mycommunity });
    setFormData({ title: '', text: '', mycommunity: '' });
  };

  if (!auth.isAuthenticated && !auth.loading) return <Redirect to="/" />;

  return loading || communities === null ? (
    <Loading />
  ) : (
    <Fragment>
      <Form onSubmit={(e) => onSubmit(e)}>
        <Form.Group className="mt-4 h5">
          <Form.Label>Community</Form.Label>
          <Select
            options={options}
            name="mycommunity"
            onChange={(e) => onChangeSelect(e, 'mycommunity')}
            className="text-dark icon"
            placeholder="&#xf002; Search communities..."
            required
          />
        </Form.Group>
        <Form.Group className="mt-4 h5">
          <Form.Label>Title</Form.Label>
          <Form.Control
            size="lg"
            type="text"
            placeholder="Title"
            name="title"
            value={title}
            onChange={(e) => onChange(e)}
            required
          />
        </Form.Group>
        <Row>
          <Col style={{ width: '50%' }}>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label className="h5">Body</Form.Label>
              <Form.Control
                as="textarea"
                size="sm"
                name="text"
                value={text}
                onChange={(e) => onChange(e)}
                style={{ height: '500px' }}
                className="text-break"
                required
              />
            </Form.Group>
          </Col>
          <Col style={{ width: '50%' }}>
            <label class="h5">Preview</label>
            <div
              dangerouslySetInnerHTML={{ __html: marked(text) }}
              className="border overflow-auto bg-transparent text-break"
              style={{ height: '500px' }}
            />
          </Col>
        </Row>
        <Button
          variant="secondary"
          type="submit"
          className="mx-auto d-block mt-2 mb-4"
          size="lg"
        >
          Submit
        </Button>
      </Form>
    </Fragment>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  getCommunities: PropTypes.func.isRequired,
  community: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  community: state.community,
  auth: state.auth,
});

export default connect(mapStateToProps, { addPost, getCommunities })(PostForm);
