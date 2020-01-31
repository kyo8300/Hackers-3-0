import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const CommentItem = ({
  postId,
  comment: { _id, text, name, user, date },
  auth
}) => {
  return (
    <div className="my-4 ml-3">
      <div className="user-profile">
        {name} ・ <Moment format="YYYY/MM/DD HH:mm">{date}</Moment>
      </div>
      <div className="text">{text}</div>
    </div>
  );
};
CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(CommentItem);
