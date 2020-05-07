import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getProfile } from '../../actions/profile';
import { oldCommentsSort } from '../../actions/sort';

import { Card, DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap';

const UserComments = ({ comments, userid2, getProfile, oldCommentsSort }) => {
  return (
    <Fragment>
      <div className="mb-3">
        {' '}
        {[DropdownButton].map((DropdownType, idx) => (
          <>
            <DropdownType
              as={ButtonGroup}
              key={idx}
              id={`dropdown-button-drop-${idx}`}
              size="sm"
              variant="secondary"
              title="Sort comments"
            >
              <Dropdown.Item eventKey="1" onClick={() => getProfile(userid2)}>
                <i class="fas fa-sun" /> New{' '}
              </Dropdown.Item>{' '}
              <Dropdown.Item
                eventKey="2"
                onClick={() => oldCommentsSort(userid2)}
              >
                <i class="fas fa-sort-amount-down" /> Old{' '}
              </Dropdown.Item>{' '}
            </DropdownType>{' '}
          </>
        ))}{' '}
      </div>{' '}
      {comments.map((comment) => (
        <Card
          bg="dark"
          style={{ width: '80%' }}
          className="my-2 text-left mx-auto"
        >
          <Card.Header>
            <Link
              to={`/community/${comment.post.community._id}`}
              style={{
                textDecoration: 'none',
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
  comments: PropTypes.object.isRequired,
  userid2: PropTypes.number.isRequired,
  getProfile: PropTypes.func.isRequired,
  oldCommentsSort: PropTypes.func.isRequired,
};

export default connect(null, { getProfile, oldCommentsSort })(UserComments);
