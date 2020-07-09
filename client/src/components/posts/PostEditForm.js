import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col, Button, Form } from "react-bootstrap";
import Select from "react-select";
import { Redirect } from "react-router-dom";

import { getCommunities } from "../../actions/community";
import { updatePost, getPost } from "../../actions/post";
import Loading from "../layouts/Loading";

//Markdown
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/railscasts.css";

marked.setOptions({
  langPrefix: "hljs language-",
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  },
});

const PostEditForm = ({
  updatePost,
  getCommunities,
  getPost,
  community: { communities, loading },
  auth,
  post,
  match,
}) => {
  useEffect(() => {
    getCommunities();
    getPost(match.params.id);
  }, [getPost, getCommunities, match.params.id]);

  const [formData, setFormData] = useState({
    title: "",
    text: "",
    mycommunity: "",
  });

  const { title, text, mycommunity } = formData;

  useEffect(() => {
    setFormData({
      title: post.post !== null ? post.post.title : "",
      text: post.post !== null ? post.post.text : "",
      mycommunity: post.post !== null ? post.post.community._id : "",
    });
  }, [post]);

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
    updatePost(match.params.id, { title, text, mycommunity });
    setFormData({ title: "", text: "", mycommunity: "" });
  };

  if (!auth.isAuthenticated && !auth.loading) return <Redirect to="/" />;

  return loading || communities === null || post.loading ? (
    <Loading />
  ) : (
    <Fragment>
      <Form
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <Form.Group className="mt-4 h5">
          <Form.Label>Community</Form.Label>
          <Select
            options={options}
            name="mycommunity"
            onChange={(e) => onChangeSelect(e, "mycommunity")}
            defaultValue={{
              label: post.post.community.name,
              value: post.post.community._id,
            }}
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
          <Col style={{ width: "50%" }}>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label className="h5">Body</Form.Label>
              <Form.Control
                as="textarea"
                size="sm"
                name="text"
                value={text}
                onChange={(e) => onChange(e)}
                style={{ height: "500px" }}
                className="text-break"
                required
              />
            </Form.Group>
          </Col>
          <Col style={{ width: "50%" }}>
            <label className="h5">Preview</label>
            <div
              dangerouslySetInnerHTML={{ __html: marked(text) }}
              className="border p-2 overflow-auto bg-transparent text-break"
              style={{ height: "500px" }}
            />
          </Col>
        </Row>
        <Button
          variant="secondary"
          type="submit"
          className="mx-auto d-block mt-2 mb-4"
          size="lg"
        >
          Update
        </Button>
      </Form>
    </Fragment>
  );
};

PostEditForm.propTypes = {
  updatePost: PropTypes.func.isRequired,
  getCommunities: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  community: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  community: state.community,
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, {
  updatePost,
  getCommunities,
  getPost,
})(PostEditForm);
