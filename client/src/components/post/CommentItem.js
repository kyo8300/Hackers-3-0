import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { addLikeComment, removeLikeComment } from '../../actions/post';
import { showModal } from '../../actions/modal';

const CommentItem = ({
  addLikeComment,
  removeLikeComment,
  showModal,
  postId,
  comment: { _id, text, name, user, date, commentlikes },
  auth
}) => {
  const authCheck1 = (postId, commentId) => {
    if (!auth.isAuthenticated) {
      showModal();
    } else {
      addLikeComment(postId, commentId);
    }
  };

  const authCheck2 = (postId, commentId) => {
    if (!auth.isAuthenticated) {
      showModal();
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
  showModal: PropTypes.func.isRequired,
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
  showModal
})(CommentItem);
