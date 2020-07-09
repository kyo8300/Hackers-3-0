import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Nav } from "react-bootstrap";
import Moment from "react-moment";

import { getProfile, initProfile } from "../../actions/profile";
import Loading from "../layouts/Loading";
import UserPosts from "./UserPosts";

const Profile = ({
  getProfile,
  initProfile,
  profile: { profile, loading, hasMore, skip, sort },
  auth,
  match,
}) => {
  useEffect(() => {
    initProfile();
    getProfile(match.params.id, 0, 1);
  }, [initProfile, getProfile, match.params.id]);

  return loading || profile == null ? (
    <Loading />
  ) : (
    <div className="text-center">
      <div className="profile-header mt-3 my-4">
        <img
          src="../../../hackers.png"
          width="70"
          height="90"
          alt="Logo"
          className="img-fluid "
        />
        <div className="my-2 font-weight-bold profile-name">
          {profile.user.name}
        </div>
        <div className="profile-date">
          Joined <Moment format="YYYY/MM/DD">{profile.user.date}</Moment>
        </div>
      </div>

      <div>
        <Nav
          className="justify-content-center profile-navs mt-4 mb-3"
          variant="tabs"
          activeKey={`/profile/${match.params.id}`}
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
        <UserPosts
          posts={profile.posts}
          userid={profile.user._id}
          hasMore={hasMore}
          skip={skip}
          sort={sort}
          auth={auth}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

Profile.propTypes = {
  getProfile: PropTypes.func.isRequired,
  initProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getProfile, initProfile })(Profile);
