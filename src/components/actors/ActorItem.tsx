import {API_IMAGES} from '@env';
import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import palette from 'src/styles/palette';

interface Props {
  profile_path: string;
  name: string;
}

const ActorItem: React.FC<Props> = ({profile_path, name}) => {
  if (!profile_path) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.ActorItem}>
        <ImageBackground
          source={{uri: `${API_IMAGES}${profile_path}`}}
          style={styles.actorImage}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.35)', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.1)']}
          start={{x: 0, y: 1}}
          end={{x: 0, y: 0}}
          style={styles.linearGradient}
        />
      </View>
      <View style={styles.actorNameWrapper}>
        <Text style={styles.actorName}>{name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  ActorItem: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: palette.grey,
    marginTop: 5,
    marginHorizontal: 7,
  },
  actorImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    overflow: 'hidden',
    resizeMode: 'cover',
  },
  linearGradient: {
    height: '100%',
    width: '100%',
    borderRadius: 50,
    position: 'absolute',
    bottom: 0,
  },
  actorName: {
    fontSize: 14,
    marginTop: 10,
    color: palette.white,
    textAlign: 'center',
    width: 100,
  },
  actorNameWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default ActorItem;
