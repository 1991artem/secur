import {SafeAreaView, View, Text, Button} from 'react-native';

interface IErrorPage {
  message: string;
  resetError: () => void;
}

function Error({message, resetError}: IErrorPage) {
  return (
    <SafeAreaView style={{alignItems: 'center', top: '50%'}}>
      <View style={{width: '80%', height: '50%'}}>
        <Text style={{marginBottom: 20}}>{message}</Text>
        <Button mode="contained" title="Try again" onPress={resetError}>
          Try again
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default Error;
