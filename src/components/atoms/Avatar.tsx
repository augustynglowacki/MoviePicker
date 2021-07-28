import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';

interface AvatarProps {
  uri: string;
  editable?: boolean;
  setPhoto?: (photo: string) => void; // ?????
}

const Avatar: React.FC<AvatarProps> = ({editable, uri, setPhoto}) => {
  const [userImage, setUserImage] = useState(uri);

  return (
    <View style={styles.avatarBox}>
      <Image
        source={{
          uri: userImage,
        }}
        style={styles.avatar}
      />

      {editable ? (
        <TouchableOpacity
          onPress={() => {
            ImagePicker.openPicker({multiple: false}).then(photo => {
              setUserImage(photo.path);
              setPhoto ? setPhoto(photo.path) : '';
            });
          }}
          style={styles.icon}>
          <Icon name="pluscircle" size={20} color="white" />
        </TouchableOpacity>
      ) : null}
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
