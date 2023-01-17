/* eslint-disable react/react-in-jsx-scope */
import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {MD3LightTheme as DefaultTheme, Button} from 'react-native-paper';
import {navigate} from '../navigation/navigate';
import {NavigationRoutes} from '../types/routes';

interface IBottomTab {
  route: NavigationRoutes;
  icon: string;
  title: string;
}

function BottomBar() {
  const [screen, setScreen] = useState(0);

  const pressHandler = (route: NavigationRoutes) => {
    navigate(route);
  };

  const routes: IBottomTab[] = [
    {route: NavigationRoutes.HOME_SCREEN, icon: 'home', title: 'Home'},
    {route: NavigationRoutes.INFO, icon: 'book', title: 'Info'},
    {route: NavigationRoutes.SCANER, icon: 'qrcode-scan', title: 'Scaner'},
    {route: NavigationRoutes.READER, icon: 'cellphone-nfc', title: 'Reader'},
  ];

  return (
    <View style={styles.container}>
      {routes.map(({route, title, icon}: IBottomTab, idx: number) => (
        <Button
          key={idx}
          icon={icon}
          style={styles.button}
          buttonColor="grey"
          onPress={() => pressHandler(route)}>
          {title}
        </Button>
      ))}
    </View>
  );
}

export default BottomBar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  button: {
    borderWidth: 1,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderColor: 'white',
  },
});
