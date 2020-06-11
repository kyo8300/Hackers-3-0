import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getComments, initProfile } from '../../actions/profile';

import {
  Card,
  DropdownButton,
  ButtonGroup,
  Dropdown,
  Nav,
} from 'react-bootstrap';
import Moment from 'react-moment';
import Loading from '../layouts/Loading';

import BlackLoading from '../layouts/blackLoading';
//無限スクロール
import InfiniteScroll from 'react-infinite-scroll-component';

const UserComments = ({
  getComments,
  initProfile,
  profile: { profile, loading, hasMoreComments, skip, sort },
  match,
}) => {
  useEffect(() => {
    getComments(match.params.id, 0, 1);
  }, [getComments]);

  return loading || profile == null ? (
    <Loading />
  ) : (
    <div className="text-center">
      <div class="profile-header mt-3 my-4">
        <img
          src="../../../hackers.png"
          width="70"
          height="90"
          alt="Logo"
          class="img-fluid "
        />
        <div class="my-2 font-weight-bold profile-name">
          {profile.user.name}
        </div>
        <div class="profile-date">
          Joined <Moment format="YYYY/MM/DD">{profile.user.date}</Moment>
        </div>
      </div>

      <div>
        <Nav
          className="justify-content-center profile-navs mt-4 mb-3"
          variant="tabs"
          activeKey={`/profile/comments/${match.params.id}`}
        >
          <Nav.Item>
            <Nav.Link href={`/profile/${match.params.id}`} className="nav-item">
              POSTS
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href={`/profile/comments/${match.params.id}`}
              className="nav-item"
            >
              COMMENTS
            </Nav.Link>
          </Nav.Item>
        </Nav>
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
                <Dropdown.Item
                  eventKey="1"
                  onClick={() => {
                    initProfile();
                    getComments(match.params.id, 0, 1);
                  }}
                >
                  <i class="fas fa-sun" /> New{' '}
                </Dropdown.Item>{' '}
                <Dropdown.Item
                  eventKey="2"
                  onClick={() => {
                    initProfile();
                    getComments(match.params.id, 0, 2);
                  }}
                >
                  <i class="fas fa-sort-amount-down" /> Old{' '}
                </Dropdown.Item>{' '}
              </DropdownType>{' '}
            </>
          ))}{' '}
        </div>{' '}
        <InfiniteScroll
          dataLength={profile.comments.length}
          next={() => getComments(match.params.id, skip, sort)}
          hasMore={hasMoreComments}
          loader={<BlackLoading />}
          endMessage={<div>End!!</div>}
          className="mt-3"
        >
          {profile.comments.map((comment) => (
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
        </InfiniteScroll>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

UserComments.propTypes = {
  profile: PropTypes.object.isRequired,
  getComments: PropTypes.func.isRequired,
  initProfile: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getComments, initProfile })(
  UserComments
);
