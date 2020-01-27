import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { addPost } from '../../actions/post';

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

const PostForm = ({ addPost }) => {
  const [formData, setFormData] = useState({
    title: '',
    text: ''
  });

  const { title, text } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    addPost({ title, text });
    setFormData({ title: '', text: '' });
  };

  return (
    <Fragment>
      <Form onSubmit={e => onSubmit(e)}>
        <Form.Group className="mt-4 h5">
          <Form.Label>Title</Form.Label>
          <Form.Control
            size="lg"
            type="text"
            placeholder="Title"
            name="title"
            value={title}
            onChange={e => onChange(e)}
            required
          />
        </Form.Group>
        <Row>
          <Col>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label className="h5">Body</Form.Label>
              <Form.Control
                as="textarea"
                size="sm"
                name="text"
                value={text}
                onChange={e => onChange(e)}
                style={{ height: '500px' }}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <label class="h5">Preview</label>
            <div
              dangerouslySetInnerHTML={{ __html: marked(text) }}
              className="border overflow-auto bg-transparent"
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
  addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(PostForm);
