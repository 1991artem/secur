/* eslint-disable react/react-in-jsx-scope */
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {login} from '../../redux/app/slice';
import {IUser} from '../../types/user/userType';
import {useState} from 'react';
import {Button, TextInput} from 'react-native-paper';

function Login() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const user: IUser = {
    firstName,
    lastName,
    token: password,
  };

  const firstNameHandler = (value: string) => {
    setFirstName(value);
  };

  const lastNameHandler = (value: string) => {
    setLastName(value);
  };

  const passwordHandler = (value: string) => {
    setPassword(value);
  };

  return (
    <SafeAreaView style={{alignItems: 'center', top: '20%'}}>
      <View style={{width: '80%', heigth: '50%'}}>
        <TextInput style={{marginBottom: 20}} label="First Name" onChangeText={firstNameHandler} />
        <TextInput style={{marginBottom: 20}} label="Last Name" onChangeText={lastNameHandler} />
        <TextInput
          label="Password"
          style={{marginBottom: 20}}
          secureTextEntry
          onChangeText={passwordHandler}
        />
        <Button mode="contained" onPress={() => dispatch(login(user))}>
          Login
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default Login;
