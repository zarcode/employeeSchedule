import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import ShiftTable from './ShiftTable';

const Layout = () => (
  <Router>
    <div className="layout">
      {/* <Redirect from="/" to="/overview" /> */}
      <Route path="/overview/:date?" component={ShiftTable} />
    </div>
  </Router>
);

export default Layout;
