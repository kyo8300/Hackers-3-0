import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row, Col, Image, Button } from "react-bootstrap";

import Loading from "../layouts/Loading";
import CommunityLanking from "./CommunityLanking";
import {
  getCommunity,
  initCommunity,
  joinCommunity,
  leaveCommunity,
} from "../../actions/community";
import { showModal } from "../../actions/modal";

import CommunityPosts from "./CommunityPosts";

const Community = ({
  getCommunity,
  initCommunity,
  joinCommunity,
  leaveCommunity,
  showModal,
  community: { community, loading, hasMore, skip, totalPosts },
  auth: { user, isAuthenticated },
  match,
}) => {
  useEffect(() => {
    initCommunity();
    getCommunity(match.params.id);
  }, [initCommunity, getCommunity, match.params.id]);

  const authCheck1 = (id) => {
    if (!isAuthenticated) {
      showModal();
    } else {
      joinCommunity(id);
    }
  };

  const authCheck2 = (id) => {
    if (!isAuthenticated) {
      showModal();
    } else {
      leaveCommunity(id);
    }
  };

  return loading || community.date === undefined ? (
    <Loading />
  ) : (
    <Fragment>
      <div className="community-header p-3">
        <Image
          src={`data:image/png;base64,${Buffer.from(
            community.avatar.data
          ).toString("base64")}`}
          className="d-inline community-header-img community-img"
          width="60px"
          height="60px"
          fluid
          thumbnail
        />
        <div className="d-inline-block ml-3 mr-3">
          <h3 className="font-weight-bolder">{community.name}</h3>
          <p className="mb-0">
            {community.followers.length} members ・ {totalPosts} posts
          </p>
        </div>
        {/*  Check user is null or not first, if not, check that user followed a community or not */}
        {user === null ? (
          <Button
            variant="secondary"
            className="px-4 float-right d-inline m-3 py-1 "
            onClick={() => authCheck1(community._id)}
          >
            Join
          </Button>
        ) : community.followers.filter(
            (follower) => follower.user.toString() === user._id
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
      </div>
      <Row>
        <Col lg={2}></Col>
        <Col lg={6}>
          <CommunityPosts
            posts={community.posts}
            skip={skip}
            hasMore={hasMore}
            communityid={match.params.id}
          />
        </Col>
        <Col lg={4} className="my-3">
          <CommunityLanking />
        </Col>
      </Row>
    </Fragment>
  );
};

Community.propTypes = {
  getCommunity: PropTypes.func.isRequired,
  initCommunity: PropTypes.func.isRequired,
  joinCommunity: PropTypes.func.isRequired,
  leaveCommunity: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  community: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  community: state.community,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getCommunity,
  initCommunity,
  joinCommunity,
  leaveCommunity,
  showModal,
})(Community);
