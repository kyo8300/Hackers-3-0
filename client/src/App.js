import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Heading from "./components/layouts/Heading";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layouts/Alert";
import LoginNotification from "./components/layouts/LoginNotification";
import Posts from "./components/posts/Posts";
import PostForm from "./components/posts/PostForm";
import Post from "./components/post/Post";
import Communities from "./components/community/Communities";
import Community from "./components/community/Community";
import Profile from "./components/profile/Profile";
import UserComments from "./components/profile/UserComments";
import PostsSearch from "./components/posts/PostsSearch";
import FollowingPosts from "./components/posts/FollowingPosts";
import PostEditForm from "./components/posts/PostEditForm";
import "bootstrap/dist/css/bootstrap.min.css";

//Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "../src/utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Heading />
          <section className="container">
            <LoginNotification />
            <Alert />
            <Switch>
              <Route exact path="/communities" component={Communities} />
              <Route exact path="/profile/:id" component={Profile} />
              <Route
                exact
                path="/profile/comments/:id"
                component={UserComments}
              />
              <Route exact path="/community/:id" component={Community} />
              <Route exact path="/global" component={Posts} />
              <Route exact path="/" component={FollowingPosts} />
              <Route exact path="/new" component={PostForm} />
              <Route exact path="/edit/:id" component={PostEditForm} />
              <Route exact path="/search" component={PostsSearch} />
              <Route exact path="/posts/:id" component={Post} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
