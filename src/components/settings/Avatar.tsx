import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import {Icon} from 'src/components/common';
import {IconTypes} from 'src/constants';
import palette from 'src/styles/palette';

interface Props {
  uri: string;
  editable?: boolean;
}

const Avatar: React.FC<Props> = ({editable, uri}) => {
  const handlePicMovie = async () => {
    const res = await ImagePicker.openPicker({multiple: false});
    return res.path;
  };

  const saveToFirestore = async () => {
    const newRes = await handlePicMovie();
    try {
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
          uri: uri,
        }}
        style={styles.avatar}
      />

      {!!editable && (
        <TouchableOpacity onPress={saveToFirestore} style={styles.icon}>
          <Icon
            type={IconTypes.ANT}
            name="pluscircle"
            size={20}
            color={palette.primary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatarBox: {
    marginVertical: 30,
  },
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
