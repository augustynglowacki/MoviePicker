import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import SettingOptionBox from './SettingOptionBox';

const ChangeBackground: React.FC = () => {
  const handlePicMovie = async () => {
    const res = await ImagePicker.openPicker({multiple: false});
    return res.path;
  };

  const saveToFirestore = async () => {
    const newRes = await handlePicMovie();
    try {
      console.log('try');
      await storage()
        .ref('users/' + auth().currentUser?.uid + '/background.jpg')
        .putFile(newRes);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SettingOptionBox text="Change Background" navigateTo={saveToFirestore} />
  );
};

export default ChangeBackground;
