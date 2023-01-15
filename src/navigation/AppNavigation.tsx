import React from 'react';
import {SafeAreaView} from 'react-native';

import {RootState} from '../redux/app/store';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {IUser} from '../types/user/userType';
import Login from '../screens/auth/Login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';

const App = createNativeStackNavigator();

function AppNavigation() {
  const user: IUser | null = useSelector((state: RootState) => state.app.user);

  if (user) {
    return (
      <NavigationContainer>
        <App.Navigator>
          <App.Screen name="Home" component={HomeScreen} />
        </App.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <SafeAreaView>
      <Login />
    </SafeAreaView>
  );
}

export default AppNavigation;
