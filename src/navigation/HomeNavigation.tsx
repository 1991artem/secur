import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import BarcodeScanner from '../screens/scaner/BarcodeScanner';
import {NavigationRoutes} from '../types/routes';

const Stack = createNativeStackNavigator();

function HomeNavigation() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name={NavigationRoutes.HOME_SCREEN}
        component={HomeScreen}
      />
      <Stack.Screen name={NavigationRoutes.SCANER} component={BarcodeScanner} />
    </Stack.Navigator>
  );
}

export default HomeNavigation;
