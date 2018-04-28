/* @flow */

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ShiftsOverview from './ShiftsOverview';

import styles from './Layout.css';

const Layout = () => (
  <Router>
    <div className={styles.layout}>
      <Route path="/overview/:date?" component={ShiftsOverview} />
    </div>
  </Router>
);

export default Layout;
