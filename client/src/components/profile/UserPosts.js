import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { topUserSort } from '../../actions/sort';
import { getProfile } from '../../actions/profile';

import { Card, Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';

const UserPosts = ({ posts, userid, topUserSort, getProfile }) => {
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
              title="Sort posts"
            >
              <Dropdown.Item eventKey="2" onClick={() => topUserSort(userid)}>
                <i class="fab fa-hotjar" /> Top{' '}
              </Dropdown.Item>{' '}
              <Dropdown.Item eventKey="1" onClick={() => getProfile(userid)}>
                <i class="fas fa-sun" /> New{' '}
              </Dropdown.Item>{' '}
            </DropdownType>{' '}
          </>
        ))}{' '}
      </div>{' '}
      {posts.map((post) => (
        <Card
          bg="dark"
          style={{
            width: '80%',
          }}
          className="my-2 text-left mx-auto"
        >
          <Card.Header>
            <div className="d-inline">
              {' '}
              <Link
                to={`/community/${post.post.community._id}`}
                style={{
                  textDecoration: 'none',
                }}
                className="text-white"
              >
                <img
                  src={`data:image/png;base64,${Buffer.from(
                    post.post.community.avatar.data
                  ).toString('base64')}`}
                  className="mr-1"
                  width="20px"
                  height="20px"
                  fluid
                />{' '}
                {post.post.community.name}{' '}
              </Link>{' '}
            </div>{' '}
            <div className="d-inline float-right">
              <i class="fas fa-thumbs-up" /> {post.post.likes.length}{' '}
            </div>{' '}
          </Card.Header>{' '}
          <Card.Body>
            <Card.Title>
              <Link
                to={`/posts/${post.post._id}`}
                style={{
                  textDecorationColor: 'white',
                }}
                className="text-white profile-title"
              >
                {post.post.title}{' '}
              </Link>{' '}
            </Card.Title>{' '}
          </Card.Body>{' '}
        </Card>
      ))}{' '}
    </Fragment>
  );
};

UserPosts.propTypes = {
  posts: PropTypes.object.isRequired,
  userid: PropTypes.number.isRequired,
  topUserSort: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
};

export default connect(null, { topUserSort, getProfile })(UserPosts);
