import {useState} from 'react';
import {Button, Modal} from 'react-native-paper';
import {StyleSheet} from 'react-native';

function ModalWindow(props: any) {
  const [visible, setVisible] = useState(props.isShowModal);
  return (
    <Modal
      visible={visible}
      onDismiss={props.hideModal}
      contentContainerStyle={styles.container}>
      {props.children && props.children.map((child: JSX.Element) => child)}
      <Button mode="contained" onPress={() => setVisible(false)}>
        OK
      </Button>
    </Modal>
  );
}

export default ModalWindow;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
