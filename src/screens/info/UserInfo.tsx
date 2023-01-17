import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Avatar, List} from 'react-native-paper';
import {useSelector} from 'react-redux';
import BottomBar from '../../components/BottomBar';
import TopBar from '../../components/TopBar';
import {RootState} from '../../redux/app/store';

function UserInfo() {
  const user = useSelector((state: RootState) => state.app.user);
  const avatar = user.avatar ? user.avatar : user.name;

  return (
    <SafeAreaView style={styles.container}>
      <TopBar title={'home'} back={null} />
      <View style={styles.info}>
        <Avatar.Text size={50} label={avatar.slice(0, 2)} />
        <List.Section style={styles.infoItem}>
          <List.Item
            title={user.name}
            left={() => <List.Icon icon="account-circle" />}
          />
          <List.Item
            title={user.email}
            left={() => <List.Icon icon="email" />}
          />
          <List.Item
            title={user.role}
            left={() => <List.Icon icon="account-tie-hat-outline" />}
          />
          <List.Item
            title={user.code}
            left={() => <List.Icon icon="phone" />}
          />
        </List.Section>
      </View>
      <BottomBar />
    </SafeAreaView>
  );
}

export default UserInfo;

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
