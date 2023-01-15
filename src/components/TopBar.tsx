import {Appbar} from 'react-native-paper';
import {navigate} from '../navigation/navigate';
import {NavigationRoutes} from '../types/routes';

function TopBar() {
  return (
    <Appbar.Header>
      <Appbar.BackAction
        onPress={() => navigate(NavigationRoutes.HOME_SCREEN)}
      />
    </Appbar.Header>
  );
}

export default TopBar;
