import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from 'src/components/common';
import {IconTypes} from 'src/constants';
import palette from 'src/styles/palette';

interface Props {
  isSmall?: boolean;
  source: string;
  editable?: boolean;
  onPress: () => void;
}

const Avatar: React.FC<Props> = ({isSmall, editable, source, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={{
          uri: source,
        }}
        style={isSmall ? [styles.avatar, styles.small] : styles.avatar}
      />
      {!!editable && (
        <TouchableOpacity onPress={onPress} style={styles.icon}>
          <Icon
            type={IconTypes.MATERIAL}
            name="edit"
            size={20}
            color={palette.strongBlack}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    resizeMode: 'cover',
  },
  small: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
  icon: {
    position: 'absolute',
    right: 0,
    width: 25,
    height: 25,
    backgroundColor: palette.primary,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Avatar;
