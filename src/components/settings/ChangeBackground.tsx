import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import {CustomButton} from '../common';

const ChangeBackground = () => {
  //add try catch to every async

  //u added a new component for one use?

  const handlePicMovie = async () => {
    const res = await ImagePicker.openPicker({multiple: false});
    console.log(res.path);
    return res.path;
  };

  const saveToFirestore = async () => {
    try {
      const newRes = await handlePicMovie();
      console.log('newRes', newRes);
      console.log('try');
      await storage()
        .ref('users/' + auth().currentUser?.uid + '/background.jpg')
        .putFile(newRes);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CustomButton
      label="Change background photo"
      onPress={saveToFirestore}
      variant={'secondary'}
    />
  );
};

export default ChangeBackground;
