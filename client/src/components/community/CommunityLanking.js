import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getCommunityLanking } from "../../actions/community";
import BlackLoading from "../layouts/blackLoading";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const CommunityLanking = ({
  getCommunityLanking,
  community: { communities, loading },
}) => {
  useEffect(() => {
    getCommunityLanking();
  }, [getCommunityLanking]);

  let rank = 1;

  return loading || communities === null ? (
    <BlackLoading />
  ) : (
    <Fragment>
      <h5 className="text-center mb-3">Most popular communities</h5>
      <ListGroup>
        {communities.map((community) => (
          <ListGroup.Item
            variant="dark"
            className="community-lank"
            key={community._id}
          >
            <h5 className="d-inline font-weight-bold mr-3">{rank++}</h5>
            <Link className="d-inline" to={`/community/${community._id}`}>
              {" "}
              <img
                src={`data:image/png;base64,${Buffer.from(
                  community.avatar.data
                ).toString("base64")}`}
                className="community-img align-bottom mr-1"
                width="20px"
                height="20px"
                alt="community-avatar"
                fluid="true"
              />{" "}
              {community.name}
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Fragment>
  );
};

CommunityLanking.propTypes = {
  getCommunityLanking: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  community: state.community,
});

export default connect(mapStateToProps, { getCommunityLanking })(
  CommunityLanking
);
