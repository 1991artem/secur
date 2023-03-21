/* eslint-disable react/react-in-jsx-scope */
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
      const deviceIsSupported = await NfcManager.isSupported();
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
  //   // await NfcManager.registerTagEvent();
  //   const result = await readMifare();
  //   setCode(result.toString());
  // };

  // const readMifare = async () => {
  //   let mifarePages = [];
  //   try {
  //     // STEP 1
  //     let reqMifare = await NfcManager.requestTechnology(
  //       NfcTech.MifareUltralight,
  //     );
  //     const readLength = 60;
  //     const mifarePagesRead = await Promise.all(
  //       [...Array(readLength).keys()].map(async (_, i) => {
  //         const pages = await NfcManager.mifareUltralightHandlerAndroid // STEP 2
  //           .mifareUltralightReadPages(i * 4); // STEP 3
  //         mifarePages.push(pages);
  //       }),
  //     );
  //   } catch (ex) {
  //     console.warn(ex);
  //   } finally {
  //     // STEP 4
  //     NfcManager.cancelTechnologyRequest();
  //   }
  //   return mifarePages.join('');
  // };

  const writeNFC = async () => {
    let result = false;

    try {
      await NfcManager.requestTechnology(NfcTech.MifareClassic);

      const bytes = Ndef.encodeMessage([Ndef.textRecord('3756353702')]);

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
        <Text style={styles.text}>{code}</Text>
        <Button style={styles.button} mode="contained" onPress={writeNFC}>
          Read
        </Button>
        {/* <Button style={styles.button} mode="contained" onPress={readTag}>
          Read card
        </Button> */}
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
  button: {
    marginVertical: 2,
  },
  text: {
    marginVertical: 5,
  },
});
