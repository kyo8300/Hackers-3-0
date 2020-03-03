import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Card } from 'react-bootstrap';

const UserComments = ({ comments }) => {
  return (
    <Fragment>
      {comments.map(comment => (
        <Card
          bg="dark"
          style={{ width: '80%' }}
          className="my-2 text-left mx-auto"
        >
          <Card.Header>
            <Link
              to={`/community/${comment.post.community._id}`}
              style={{
                textDecoration: 'none'
              }}
              className="text-white"
            >
              <img
                src={`data:image/png;base64,${Buffer.from(
                  comment.post.community.avatar.data
                ).toString('base64')}`}
                className="mr-1"
                width="20px"
                height="20px"
                fluid
              />{' '}
              {comment.post.community.name}
            </Link>
          </Card.Header>
          <Card.Body>
            <Card.Title className="text-white profile-title">
              <div className="profile-title">
                <i class="fas fa-comment" /> {comment.text}
              </div>
              <Link
                to={`/posts/${comment.post._id}`}
                style={{ textDecorationColor: 'white' }}
              >
                <div className="profile-comment-post-title mt-2">
                  {comment.post.title}
                </div>
              </Link>
            </Card.Title>
          </Card.Body>
        </Card>
      ))}
    </Fragment>
  );
};

UserComments.propTypes = {
  comments: PropTypes.object.isRequired
};

export default UserComments;
