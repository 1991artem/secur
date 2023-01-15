/* eslint-disable react/react-in-jsx-scope */
import {View, Text} from 'react-native';
import {Avatar, Button} from 'react-native-paper';
import {useSelector} from 'react-redux';
import TopBar from '../../components/TopBar';
import {navigate} from '../../navigation/navigate';
import {RootState} from '../../redux/app/store';
import {NavigationRoutes} from '../../types/routes';
import {IUser} from '../../types/user/userType';

function HomeScreen() {
  const user: IUser | null = useSelector((state: RootState) => state.app.user);

  const email: string = user?.email || 'error@example.com';

  return (
    <>
      <TopBar />
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Avatar.Text size={50} label={email.slice(0, 2)} />
        <Text style={{marginVertical: 20}}>{email}</Text>
        <Button
          mode="contained"
          onPress={() => navigate(NavigationRoutes.SCANER)}>
          Scaner
        </Button>
      </View>
    </>
  );
}

export default HomeScreen;
