/* eslint-disable react/react-in-jsx-scope */
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity, Text, View, ActivityIndicator} from 'react-native';
import {useDispatch} from 'react-redux';
import {login} from '../../redux/app/slice';
import {IUser} from '../../types/user/userType';
import {useEffect, useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import useAxios from '../../lib/hooks/useAxios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const {response, loading, error, resetError, fetchData} = useAxios({
    method: 'post',
    url: 'auth/login',
    body: {
      email,
      password,
    },
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (response) {
      setToken(response.token);
      dispatch(login(user));
      setPassword('');
      setEmail('');
    }
  }, [response]);

  const user: IUser = {
    email,
    token,
  };

  const emailHandler = (value: string) => {
    setEmail(value);
  };

  const passwordHandler = (value: string) => {
    setPassword(value);
  };

  const bthHandler = async () => {
    fetchData();
  };

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
    <SafeAreaView style={{height: '100%', alignItems: 'center', justifyContent: 'center'}}>
      <View style={{width: '80%'}}>
        <TextInput
          label="Email"
          style={{marginBottom: 20}}
          onChangeText={emailHandler}
        />
        <TextInput
          label="Password"
          style={{marginBottom: 20}}
          secureTextEntry
          onChangeText={passwordHandler}
        />
        <Button mode="contained" onPress={bthHandler}>
          Login
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default Login;
