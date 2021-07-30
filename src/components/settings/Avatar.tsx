import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

interface AvatarProps {
  uri: string;
  editable?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({editable, uri}) => {
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
        .ref('users/' + auth().currentUser?.uid + '/profile.jpg')
        .putFile(newRes);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.avatarBox}>
      <Image
        source={{
          uri,
        }}
        style={styles.avatar}
      />

      {!!editable && (
        <TouchableOpacity onPress={saveToFirestore} style={styles.icon}>
          <Icon name="pluscircle" size={20} color="white" />
        </TouchableOpacity> // new component
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatarBox: {},
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  icon: {
    alignSelf: 'center',
    position: 'absolute',
    top: 0,
    right: 150,
  },
});

export default Avatar;
