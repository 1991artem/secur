/* eslint-disable react/react-in-jsx-scope */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import UserInfo from '../screens/info/UserInfo';
import ReaderScreen from '../screens/reader/ReaderScreen';
import BarcodeScanner from '../screens/scaner/BarcodeScanner';
import {NavigationRoutes} from '../types/routes';

const Stack = createNativeStackNavigator();

function HomeNavigation() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name={NavigationRoutes.HOME_SCREEN}
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationRoutes.SCANER}
        component={BarcodeScanner}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationRoutes.INFO}
        component={UserInfo}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={NavigationRoutes.READER}
        component={ReaderScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default HomeNavigation;
