import {SafeAreaView, ActivityIndicator, StyleSheet} from 'react-native';

function Loader() {
  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" color="#00ff00" />
    </SafeAreaView>
  );
}

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
