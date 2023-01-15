// import React in our code
import React, {useEffect, useState} from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  View,
  PermissionsAndroid,
  Platform,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

// import CameraScreen
import {CameraScreen} from 'react-native-camera-kit';
import {Avatar, Button} from 'react-native-paper';
import ModalWindow from '../../components/ModalWindow';
import TopBar from '../../components/TopBar';
import useAxios from '../../lib/hooks/useAxios';
import {IUser} from '../../types/user/userType';

function BarcodeScanner() {
  const [qrvalue, setQrvalue] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);
  const [data, setData] = useState({} as IUser);
  const {response, loading, fetchData} = useAxios({
    method: 'post',
    url: 'users/email',
    body: {
      email: qrvalue,
    },
  });

  useEffect(() => {
    onOpenScanner();
  });

  useEffect(() => {
    fetchData();
  }, [qrvalue]);

  useEffect(() => {
    if (response) {
      setData(response);
      setIsShowModal(true);
      console.log(isShowModal);
    }
  }, [response]);

  // useEffect(() => {
  //   onOpenlink();
  // }, [qrvalue]);

  // const onOpenlink = () => {
  //   Linking.openURL(qrvalue);
  // };

  const onBarcodeScan = (value: string) => {
    setQrvalue(value);
  };

  const onOpenScanner = () => {
    // To Start Scanning
    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // If CAMERA Permission is granted
            setQrvalue('');
          } else {
            alert('CAMERA permission denied');
          }
        } catch (err) {
          alert('Camera permission err', err);
          console.warn(err);
        }
      }
      // Calling the camera permission function
      requestCameraPermission();
    } else {
      setQrvalue('');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      {!isShowModal ? (
        <View style={{flex: 1}}>
          <CameraScreen
            showFrame={false}
            // Show/hide scan frame
            scanBarcode={true}
            // Can restrict for the QR Code only
            laserColor={'blue'}
            // Color can be of your choice
            frameColor={'yellow'}
            // Scanner Frame color
            onReadCode={event =>
              onBarcodeScan(event.nativeEvent.codeStringValue)
            }
          />
        </View>
      ) : (
        <View style={styles.container}>
          <Avatar.Text size={50} label={data.name.slice(0, 2)} />
          <Text style={{marginVertical: 20}}>Name: {data.name}</Text>
          <Text style={{marginVertical: 2}}>Email: {data.email}</Text>
          <Text style={{marginVertical: 2}}>Role: {data.role}</Text>
          <Text style={{marginVertical: 2}}>Code: {data.code}</Text>
          <Button mode="contained" onPress={() => setIsShowModal(false)}>
            OK
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
}

export default BarcodeScanner;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
