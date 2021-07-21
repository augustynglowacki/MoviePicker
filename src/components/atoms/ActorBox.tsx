import {API_IMAGES} from '@env';
import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {Text} from 'react-native';
import colors from '../../assets/theme/colors';

interface ActorBoxProps {
  profile_path: string;
  name: string;
}

const ActorBox = ({profile_path, name}: ActorBoxProps) => {
  return (
    <>
      {!!profile_path && (
        <View style={styles.actorBox}>
          <ImageBackground
            source={{uri: `${API_IMAGES}${profile_path}`}}
            style={styles.actorImage}
          />
          <Text style={styles.actorName}>{name}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  actorBox: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.grey,
    margin: 5,
    justifyContent: 'flex-end',
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
    position: 'absolute',
    color: colors.white,
  },
});

export default ActorBox;
