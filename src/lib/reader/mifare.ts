import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';

export async function readMifare(): Promise<string[]> {
  let mifarePages: any[] = [];
  console.log('--------------', NfcManager);
  try {
    const first = await NfcManager.requestTechnology(NfcTech.MifareUltralight);
    console.log('--------------', first);

    const readLength = 60;
    await Promise.all(
      [...Array(readLength).keys()].map(async (_, i) => {
        const pages =
          await NfcManager.mifareUltralightHandlerAndroid.mifareUltralightReadPages(
            i * 4,
          );
        console.log(pages);
        mifarePages.push(pages);
      }),
    );
  } catch (ex) {
    console.warn(ex);
  } finally {
    NfcManager.cancelTechnologyRequest();
  }

  return mifarePages;
}

export async function writeNdef(code: string) {
  // const supported = await NfcManager.isSupported();

  let result = false;

  try {
    console.log('--------------', NfcManager._subscriptions);
    await NfcManager.requestTechnology(NfcTech.Ndef);
    console.log('--------------', code);

    const bytes = Ndef.encodeMessage([Ndef.textRecord(code)]);

    if (bytes) {
      await NfcManager.ndefHandler // STEP 2
        .writeNdefMessage(bytes); // STEP 3
      result = true;
    }
  } catch (ex) {
    console.warn(ex.message);
  } finally {
    // STEP 4
    // NfcManager.cancelTechnologyRequest();
  }

  return result;
}
