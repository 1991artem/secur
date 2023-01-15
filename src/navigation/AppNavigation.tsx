import React, {useMemo} from 'react';

import {RootState} from '../redux/app/store';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {ILogin} from '../types/user/userType';
import Login from '../screens/auth/Login';
import {navigationRef} from './navigate';
import HomeNavigation from './HomeNavigation';

function AppNavigation() {
  const app: ILogin = useSelector((state: RootState) => state.app.app);

  const AppStack = useMemo(() => {
    if (!app.token) {
      return <Login />;
    }
    return <HomeNavigation />;
  }, [app]);

  return (
    <NavigationContainer ref={navigationRef}>{AppStack}</NavigationContainer>
  );
}

export default AppNavigation;
