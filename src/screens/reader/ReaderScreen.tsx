import {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import NfcManager, {Ndef, NfcEvents, NfcTech} from 'react-native-nfc-manager';
import {Button} from 'react-native-paper';
import BottomBar from '../../components/BottomBar';
import TopBar from '../../components/TopBar';
import {NavigationRoutes} from '../../types/routes';

function ReaderScreen() {
  const [hasNfc, setHasNFC] = useState<boolean | null>(null);
  const [code, setCode] = useState('');

  useEffect(() => {
    const checkIsSupported = async () => {
      const deviceIsSupported = await NfcManager.isSupported(
        NfcTech.Iso15693IOS,
      );
      console.log(deviceIsSupported);
      setHasNFC(deviceIsSupported);
      if (deviceIsSupported) {
        await NfcManager.start();
      }
    };

    checkIsSupported();
  }, []);

  // useEffect(() => {
  //   NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
  //     setCode(tag);
  //   });

  //   return () => {
  //     NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
  //   };
  // }, []);

  // const readTag = async () => {
  //   await NfcManager.registerTagEvent();
  // };

  const writeNFC = async () => {
    let result = false;

    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);

      const bytes = Ndef.encodeMessage([
        Ndef.uriRecord('https://blog.logrocket.com/'),
      ]);

      if (bytes) {
        await NfcManager.ndefHandler.writeNdefMessage(bytes);
        result = true;
      }
    } catch (ex) {
      console.warn(ex);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };

  if (hasNfc === null) {
    return null;
  }

  if (!hasNfc) {
    return (
      <SafeAreaView style={styles.container}>
        <TopBar title={'reader'} back={NavigationRoutes.HOME_SCREEN} />
        <View style={styles.screen}>
          <Text>NFC not supported</Text>
        </View>
        <BottomBar />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TopBar title={'reader'} back={NavigationRoutes.HOME_SCREEN} />
      <View style={styles.screen}>
        <Text>{code}</Text>
        <Button mode="contained" onPress={writeNFC}>
          Read
        </Button>
      </View>
      <BottomBar />
    </SafeAreaView>
  );
}

export default ReaderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
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
