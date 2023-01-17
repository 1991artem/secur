/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import {SafeAreaView} from 'react-native-safe-area-context';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {login} from '../../redux/app/slice';
import {ILogin} from '../../types/user/userType';
import {useEffect, useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import useAxios from '../../lib/hooks/useAxios';
import Error from '../../components/Error';
import Loader from '../../components/Loader';

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

  const user: ILogin = {
    email,
    token,
  };

  useEffect(() => {
    if (response) {
      setToken(response.token);
    }
  }, [response]);

  useEffect(() => {
    dispatch(login(user));
    setPassword('');
    setEmail('');
  }, [token]);

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
    return <Loader />;
  }

  if (error) {
    return <Error message={error} resetError={resetError} />;
  }

  return (
    <SafeAreaView
      style={{height: '100%', alignItems: 'center', justifyContent: 'center'}}>
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
          right={<TextInput.Affix text="/100" />}
        />
        <Button mode="contained" onPress={bthHandler}>
          Login
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default Login;
