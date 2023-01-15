/* eslint-disable react/react-in-jsx-scope */
import {useEffect, useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {ActivityIndicator, Avatar, Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import useAxios from '../../lib/hooks/useAxios';
import {navigate} from '../../navigation/navigate';
import {setUser} from '../../redux/app/slice';
import {RootState} from '../../redux/app/store';
import {NavigationRoutes} from '../../types/routes';
import {IUser} from '../../types/user/userType';

function HomeScreen() {
  const owner = useSelector((state: RootState) => state.app.app);
  const user = useSelector((state: RootState) => state.app.user);
  const dispatch = useDispatch();
  const [data, setData] = useState({} as IUser);
  const email = owner?.email as string;
  const {response, loading, error, resetError, fetchData} = useAxios({
    method: 'post',
    url: 'users/email',
    body: {
      email,
    },
  });
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (response) {
      setData(response);
      dispatch(setUser({...data}));
    }
  }, [response, data]);

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  if (error) {
    return (
      <SafeAreaView style={{alignItems: 'center', top: '50%'}}>
        <View style={{width: '80%', height: '50%'}}>
          <Text style={{marginBottom: 20}}>{error}</Text>
          <Button mode="contained" onPress={resetError}>
            Try again
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Avatar.Text size={50} label={user.name.slice(0, 2)} />
        <Text style={{marginVertical: 20}}>Name: {user.name}</Text>
        <Text style={{marginVertical: 2}}>Email: {user.email}</Text>
        <Text style={{marginVertical: 2}}>Role: {user.role}</Text>
        <Text style={{marginVertical: 2}}>Code: {user.code}</Text>
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
