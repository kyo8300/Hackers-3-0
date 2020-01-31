import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { addComment } from '../../actions/post';
import TextareaAutosize from 'react-textarea-autosize';
import { setAlert } from '../../actions/alert';

const CommentForm = ({
  postId,
  addComment,
  auth: { isAuthenticated },
  setAlert
}) => {
  const [text, setText] = useState('');

  const authCheckatComment = (id, { text }) => {
    if (!isAuthenticated) {
      setAlert('Please Login first.', 'danger');
    } else {
      addComment(id, { text });
    }
  };

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        authCheckatComment(postId, { text });
        setText('');
      }}
      className="pad"
    >
      <Form.Group
        controlId="CommentForm.ControlTextarea2"
        style={{ width: '60%' }}
        className="mx-auto mt-4"
      >
        <Form.Label>Comment</Form.Label>
        <TextareaAutosize
          name="text"
          minRows={2}
          as="textarea"
          placeholder="Write your thought..."
          value={text}
          onChange={e => setText(e.target.value)}
          className="commment-layout form-control"
        />
        <Button
          variant="secondary"
          size="sm"
          type="submit"
          value="Submit"
          className="float-right mt-2 mr-1"
        >
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addComment, setAlert })(CommentForm);
