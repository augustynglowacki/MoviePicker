import React from 'react';
import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Avatar, Icon} from 'src/components/common';
import {IconTypes} from 'src/constants';
import palette from 'src/styles/palette';

interface Props {
  source: string;
  name: string;
  mail: string;
  linkedin: string;
  github: string;
}

const AuthorBox: React.FC<Props> = ({source, name, mail, linkedin, github}) => {
  return (
    <View style={styles.wrapper}>
      <Avatar
        source={source}
        onPress={() => Linking.openURL(`mailto:${mail}`)}
      />
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.text}>{mail}</Text>
      <View style={styles.iconsBox}>
        <TouchableOpacity onPress={() => Linking.openURL(`mailto:${mail}`)}>
          <Icon
            type={IconTypes.MATERIAL_COMMUNITY}
            name="gmail"
            size={27}
            color={palette.white}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(linkedin)}>
          <Icon
            type={IconTypes.IONICON}
            name="logo-linkedin"
            size={27}
            color={palette.white}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL(github)}>
          <Icon
            type={IconTypes.IONICON}
            name="logo-github"
            size={27}
            color={palette.white}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AuthorBox;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  iconsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 3,
  },
  title: {
    color: palette.white,
    fontWeight: 'bold',
  },
  text: {
    color: palette.lightWhite,
    fontSize: 12,
  },
  icon: {
    margin: 3,
  },
});
