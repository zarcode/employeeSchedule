import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import ShiftsOverview from './ShiftsOverview';

const Layout = () => (
  <Router>
    <div className="layout">
      {/* <Redirect from="/" to="/overview" /> */}
      <Route path="/overview/:date?" component={ShiftsOverview} />
    </div>
  </Router>
);

export default Layout;
