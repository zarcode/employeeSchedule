/* @flow */

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';
import ShiftsOverview from '../ShiftsOverview';

import styles from './Layout.css';

const Layout = () => (
  <Router>
    <div>
      <LoadingBar
        updateTime={300}
        className={styles.loadingBar}
      />
      <div className={styles.layout}>
        <Route path="/overview/:date?" component={ShiftsOverview} />
      </div>
    </div>
  </Router>
);

export default Layout;
