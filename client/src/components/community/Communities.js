import React, { useEffect, Fragment } from 'react';
import Loading from '../layouts/Loading';
import { Card, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setAlert } from '../../actions/alert';
import {
  getCommunities,
  joinCommunity,
  leaveCommunity
} from '../../actions/community';

const Communities = ({
  getCommunities,
  joinCommunity,
  leaveCommunity,
  setAlert,
  community: { communities, loading },
  auth: { user, isAuthenticated }
}) => {
  useEffect(() => {
    getCommunities();
  }, [getCommunities]);

  const authCheck1 = id => {
    if (!isAuthenticated) {
      setAlert('Please Login first.', 'danger');
    } else {
      joinCommunity(id);
    }
  };

  const authCheck2 = id => {
    if (!isAuthenticated) {
      setAlert('Please Login first.', 'danger');
    } else {
      leaveCommunity(id);
    }
  };

  return loading || communities === null ? (
    <Loading />
  ) : (
    <Fragment>
      {communities.map(community => (
        <Card className="community-card">
          <Card.Body>
            <img
              src={`data:image/png;base64,${Buffer.from(
                community.avatar.data
              ).toString('base64')}`}
              className="community-img d-inline"
              width="50px"
              height="50px"
              fluid
            />
            <div className="d-inline-block mr-2">
              <Card.Title className=" ml-3 mb-1">{community.name}</Card.Title>
              <Card.Text className="ml-3">
                {community.followers.length} members 0 posts
              </Card.Text>
            </div>
            {/*  Check user is null or not first, if not, check that user followed a community or not */}
            {user === null ? (
              <Button
                variant="secondary"
                className="px-4 float-right d-inline mt-3 py-1"
                onClick={() => authCheck1(community._id)}
              >
                Join
              </Button>
            ) : community.followers.filter(
                follower => follower.user.toString() === user._id
              ).length > 0 ? (
              <Button
                variant="outline-light"
                className="px-4 float-right d-inline mt-3 py-1 leave-hover"
                onClick={() => authCheck2(community._id)}
              ></Button>
            ) : (
              <Button
                variant="secondary"
                className="px-4 float-right d-inline mt-3 py-1"
                onClick={() => authCheck1(community._id)}
              >
                Join
              </Button>
            )}
          </Card.Body>
        </Card>
      ))}
    </Fragment>
  );
};

Communities.propTypes = {
  getCommunities: PropTypes.func.isRequired,
  joinCommunity: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  leaveCommunity: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  community: state.community,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getCommunities,
  leaveCommunity,
  joinCommunity,
  setAlert
})(Communities);
