import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {IconTypes} from 'src/constants';
import palette from 'src/styles/palette';
import {Icon} from 'src/components/common';

interface Props {
  isModalVisible: boolean;
  toggleModal: () => void;
  onPressTop: () => void;
  onPressBottom: () => void;
}

const CustomModal: React.FC<Props> = ({
  isModalVisible,
  toggleModal,
  onPressTop,
  onPressBottom,
}) => {
  const {t} = useTranslation('modal');
  return (
    <Modal
      isVisible={isModalVisible}
      backdropColor={'transparent'}
      style={styles.modal}
      onBackButtonPress={toggleModal}
      onBackdropPress={toggleModal}>
      <View style={styles.view}>
        <View style={styles.box}>
          <TouchableOpacity style={styles.row} onPress={onPressTop}>
            <Text style={styles.text}>{t('camera')}</Text>
            <Icon
              type={IconTypes.IONICON}
              name="camera"
              color={palette.white}
              size={18}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.row} onPress={onPressBottom}>
            <Text style={styles.text}>{t('gallery')}</Text>
            <Icon
              type={IconTypes.IONICON}
              name="images"
              color={palette.white}
              size={18}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  text: {color: 'white', marginRight: 5},
  view: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: ' 50%',
  },
  box: {
    backgroundColor: palette.black,
    height: 150,
    width: '100%',
    borderColor: palette.primary,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
});
