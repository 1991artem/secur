import React, {useMemo} from 'react';

import {RootState} from '../redux/app/store';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {IUser} from '../types/user/userType';
import Login from '../screens/auth/Login';
import {navigationRef} from './navigate';
import HomeNavigation from './HomeNavigation';

function AppNavigation() {
  const user: IUser | null = useSelector((state: RootState) => state.app.user);

  const AppStack = useMemo(() => {
    if (!user) {
      return <Login />;
    }
    return <HomeNavigation />;
  }, [user]);

  return (
    <NavigationContainer ref={navigationRef}>{AppStack}</NavigationContainer>
  );
}

export default AppNavigation;
