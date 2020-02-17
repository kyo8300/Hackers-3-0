import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Row, Col } from 'react-bootstrap';

import Loading from '../layouts/Loading';
import { getCommunity } from '../../actions/community';

import CommunityPosts from './CommunityPosts';

const Community = ({
  getCommunity,
  community: { community, loading },
  match
}) => {
  useEffect(() => {
    getCommunity(match.params.id);
  }, [getCommunity]);

  return loading || community === null ? (
    <Loading />
  ) : (
    <Row>
      <Col lg={2}>
        <Card border="primary">Space</Card>
      </Col>
      <Col lg={6}>
        <CommunityPosts posts={community.posts} />
      </Col>
      <Col lg={4}>
        <Card border="primary">Tag</Card>
      </Col>
    </Row>
  );
};

Community.propTypes = {
  getCommunity: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  community: state.community
});

export default connect(mapStateToProps, {
  getCommunity
})(Community);
