import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../store';

const AppReduxWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Router>
      <Provider store={store}>{children}</Provider>
    </Router>
  );
};

export default AppReduxWrapper;
