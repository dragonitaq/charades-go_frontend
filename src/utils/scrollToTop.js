/*
This implementation is from official Redux Router.

This is HOC that makes site-wide page reset scrolling position to top after redirection.
Or just render it bare anywhere you want, but just one: <ScrollToTop/>
*/

import React from 'react';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
