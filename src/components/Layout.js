/* @flow */

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ShiftsOverview from './ShiftsOverview';

const Layout = () => (
  <Router>
    <div className="layout">
      <Route path="/overview/:date?" component={ShiftsOverview} />
    </div>
  </Router>
);

export default Layout;
