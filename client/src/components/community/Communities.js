import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../layouts/Loading";
import { Card, Button } from "react-bootstrap";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { showModal } from "../../actions/modal";
import {
  getCommunities,
  joinCommunity,
  leaveCommunity,
  getSuggestions,
} from "../../actions/community";

//Autosuggest
import Autosuggest from "react-autosuggest";

const Communities = ({
  getCommunities,
  getSuggestions,
  joinCommunity,
  leaveCommunity,
  showModal,
  community: { communities, autocomplete, loading },
  auth: { user, isAuthenticated },
}) => {
  useEffect(() => {
    getCommunities();
  }, [getCommunities]);

  //Auto suggestion
  const [value, setValue] = useState("");

  const [suggestions, setSuggestions] = useState([]);

  const onChange = (e, { newValue }) => setValue(newValue);

  const getSuggestionValue = (suggestion) => suggestion.name;

  // Use your imagination to render suggestions.
  const renderSuggestion = (suggestion) => (
    <Link
      to={`/community/${suggestion._id}`}
      className="form-group suggestion-input"
    >
      <img
        src={`data:image/png;base64,${Buffer.from(
          suggestion.avatar.data
        ).toString("base64")}`}
        className="community-img d-inline mr-2"
        width="20px"
        height="20px"
        alt="community-avatar"
        fluid="true"
      />
      <div className="d-inline text-white suggestion-name">
        {suggestion.name}
      </div>
    </Link>
  );

  // Autosuggest will call this function every time you need to update suggestions.
  const onSuggestionsFetchRequested = ({ value }) => {
    getSuggestions(value);
    setSuggestions(autocomplete);
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "Search community...",
    value,
    onChange: onChange,
    className: "form-group",
  };

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

  return loading || communities === null ? (
    <Loading />
  ) : (
    <div className="mb-4">
      <div className="community-title p-3 py-2 my-3">
        <h3 className="mb-1">Communities</h3>
        <p className="text-white-50 community-subtitle">
          What are your interests ? Find your favorite communities !!
        </p>
      </div>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
      {/* <Form className="search-community-bar float-right">
        <Form.Group>
          <Form.Control
            size="sm"
            type="text"
            placeholder="Search community..."
          />
        </Form.Group>
      </Form> */}
      <div className="mt-3">
        {communities.map((community) => (
          <Card className="community-card" key={community._id}>
            <Card.Body>
              <img
                src={`data:image/png;base64,${Buffer.from(
                  community.avatar.data
                ).toString("base64")}`}
                className="community-img d-inline"
                width="50px"
                height="50px"
                alt="community-avatar"
                fluid="true"
              />
              <div className="d-inline-block mr-2">
                <Link
                  to={`/community/${community._id}`}
                  style={{ textDecorationColor: "white" }}
                >
                  <Card.Title className=" ml-3 mb-1 text-white">
                    {community.name}
                  </Card.Title>
                </Link>
                <Card.Text className="ml-3">
                  {community.followers.length} members {"・"}{" "}
                  {community.posts.length} posts
                </Card.Text>
              </div>
              {/*  Check user is null or not first, if not, check that user followed a community or not */}
              {user === null ? (
                <Button
                  variant="secondary"
                  className="px-4 float-right d-inline mt-3 py-1"
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
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

Communities.propTypes = {
  getCommunities: PropTypes.func.isRequired,
  getSuggestions: PropTypes.func.isRequired,
  joinCommunity: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  leaveCommunity: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  community: state.community,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getCommunities,
  getSuggestions,
  leaveCommunity,
  joinCommunity,
  showModal,
})(Communities);
