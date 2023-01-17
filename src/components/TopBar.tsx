/* eslint-disable react/react-in-jsx-scope */
import {Appbar} from 'react-native-paper';
import {navigate} from '../navigation/navigate';
import {NavigationRoutes} from '../types/routes';

interface ITopBar {
  title: string;
  back: NavigationRoutes | null;
}

function TopBar({title, back}: ITopBar) {
  const goToHome = () => {
    navigate(NavigationRoutes.HOME_SCREEN);
  }
  return (
    <Appbar.Header>
      {back && <Appbar.BackAction onPress={() => navigate(back)} />}
      <Appbar.Content title={title} />
      {back && <Appbar.Action icon="home" onPress={goToHome} />}
      <Appbar.Action icon="dots-vertical" onPress={() => {}} />
    </Appbar.Header>
  );
}

export default TopBar;
