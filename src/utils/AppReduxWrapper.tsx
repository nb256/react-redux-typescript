import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from '../store';

const AppReduxWrapper = ({ children }: { children: ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default AppReduxWrapper;
