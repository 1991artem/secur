/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import BottomBar from '../../components/BottomBar';
import Loader from '../../components/Loader';
import TopBar from '../../components/TopBar';
import Error from '../../components/Error';
import useAxios from '../../lib/hooks/useAxios';
import {setUser} from '../../redux/app/slice';
import {RootState} from '../../redux/app/store';
import {IUser} from '../../types/user/userType';

function HomeScreen() {
  const owner = useSelector((state: RootState) => state.app.app);
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
    return <Loader />;
  }

  if (error) {
    return <Error message={error} resetError={resetError} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <TopBar title={'home'} back={null} />
      <View style={styles.info}>
        <Text>Hello</Text>
      </View>
      <BottomBar />
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  info: {
    flex: 1,
    width: '100%',
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoItem: {
    width: '80%',
  },
});
