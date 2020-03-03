import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tab, Tabs } from 'react-bootstrap';
import Moment from 'react-moment';

import { getProfile } from '../../actions/profile';
import Loading from '../layouts/Loading';
import UserPosts from './UserPosts';
import UserComments from './UserComments';

const Profile = ({
  getProfile,
  profile: { profile, loading },
  auth: { user, isAuthenticated },
  match
}) => {
  useEffect(() => {
    getProfile(match.params.id);
  }, [getProfile]);

  const [key, setKey] = useState('posts');

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
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          activeKey={key}
          onSelect={k => setKey(k)}
          className="justify-content-center profile-navs"
        >
          <Tab eventKey="posts" title="POSTS">
            <UserPosts posts={profile.posts} />
          </Tab>
          <Tab eventKey="comments" title="COMMENTS">
            <UserComments comments={profile.comments} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

Profile.propTypes = {
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { getProfile })(Profile);
