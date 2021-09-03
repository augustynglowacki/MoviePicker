import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon} from 'src/components/common';
import {IconTypes} from 'src/constants';
import palette from 'src/styles/palette';

interface Props {
  uri: string;
  editable?: boolean;
  onPress: () => void;
}

const Avatar: React.FC<Props> = ({editable, uri, onPress}) => {
  return (
    <View style={styles.avatarBox}>
      <Image
        source={{
          uri: uri,
        }}
        style={styles.avatar}
      />

      {!!editable && (
        <TouchableOpacity onPress={onPress} style={styles.icon}>
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
