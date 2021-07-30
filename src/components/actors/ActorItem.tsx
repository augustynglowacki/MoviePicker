import {API_IMAGES} from '@env';
import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {Text} from 'react-native';
import colors from '../../assets/theme/colors';

interface Props {
  profile_path: string;
  name: string;
}

const ActorBox: React.FC<Props> = ({profile_path, name}) => {
  if (!profile_path) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.actorBox}>
        <ImageBackground
          source={{uri: `${API_IMAGES}${profile_path}`}}
          style={styles.actorImage}
        />
      </View>
      <View>
        <Text style={styles.actorName}>{name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  actorBox: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.grey,
    margin: 5,
  },
  actorImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    overflow: 'hidden',
    resizeMode: 'cover',
  },
  actorName: {
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
    width: 70,
  },
});

export default ActorBox;
