import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { addLikeComment, removeLikeComment } from '../../actions/post';
import { setAlert } from '../../actions/alert';

const CommentItem = ({
  addLikeComment,
  removeLikeComment,
  setAlert,
  postId,
  comment: { _id, text, name, user, date, commentlikes },
  auth
}) => {
  const authCheck1 = (postId, commentId) => {
    if (!auth.isAuthenticated) {
      setAlert('Please Login first.', 'danger');
    } else {
      addLikeComment(postId, commentId);
    }
  };

  const authCheck2 = (postId, commentId) => {
    if (!auth.isAuthenticated) {
      setAlert('Please Login first.', 'danger');
    } else {
      removeLikeComment(postId, commentId);
    }
  };

  return (
    <div className="my-4 ml-3">
      <div className="user-profile">
        {name} ・ <Moment format="YYYY/MM/DD HH:mm">{date}</Moment>
      </div>
      <div className="text">{text}</div>
      <div>
        <button
          class="like-comment-btn mt-1"
          onClick={() => authCheck1(postId, _id)}
        >
          <i class="fas fa-thumbs-up" />{' '}
        </button>
        <span>
          {commentlikes.length > 0 ? (
            <span class="comment-num">{commentlikes.length}</span>
          ) : (
            ' '
          )}
        </span>
        <button
          class="like-comment-btn mt-1"
          onClick={() => authCheck2(postId, _id)}
        >
          <i class="fas fa-thumbs-down" />{' '}
        </button>
      </div>
    </div>
  );
};
CommentItem.propTypes = {
  addLikeComment: PropTypes.func.isRequired,
  removeLikeComment: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  addLikeComment,
  removeLikeComment,
  setAlert
})(CommentItem);
