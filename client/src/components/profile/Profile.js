import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Nav } from 'react-bootstrap';
import Moment from 'react-moment';

import { getProfile, initProfile } from '../../actions/profile';
import Loading from '../layouts/Loading';
import UserPosts from './UserPosts';

const Profile = ({
  getProfile,
  initProfile,
  profile: { profile, loading, hasMore, skip, sort },
  match,
}) => {
  useEffect(() => {
    initProfile();
    getProfile(match.params.id, 0, 1);
  }, [getProfile]);

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
        />
        {/* <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="justify-content-center profile-navs mt-4 mb-3"
        >
          <Tab eventKey="posts" title="POSTS">
            <UserPosts
              posts={profile.posts}
              userid={profile.user._id}
              hasMore={hasMore}
              skip={skip}
              sort={sort}
            />
          </Tab>
            <Tab eventKey="comments" title="COMMENTS">
              <p>AAA</p>
              <UserComments
              comments={profile.comments}
              userid2={profile.user._id}
              hasMore={hasMoreComments}
              skip={skip}
              sort={sort}
            />
            </Tab>
        </Tabs> */}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

Profile.propTypes = {
  getProfile: PropTypes.func.isRequired,
  initProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getProfile, initProfile })(Profile);
