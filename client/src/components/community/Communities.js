import React, { useEffect, Fragment } from 'react';
import Loading from '../layouts/Loading';
import { setAlert } from '../../actions/alert';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getCommunities } from '../../actions/community';

const Communities = ({
  getCommunities,
  community: { communities, loading },
  auth: { user, isAuthenticated }
}) => {
  useEffect(() => {
    getCommunities();
  }, [getCommunities]);

  return loading || communities === null ? (
    <Loading />
  ) : (
    <div>
      {communities.map(community => (
        <div>
          <img
            src={`data:image/png;base64,${Buffer.from(
              community.avatar.data
            ).toString('base64')}`}
          />
        </div>
      ))}
    </div>
  );
};

Communities.propTypes = {
  getCommunities: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  community: state.community,
  auth: state.auth
});

export default connect(mapStateToProps, {
  getCommunities
})(Communities);
