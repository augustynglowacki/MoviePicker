import {API_IMAGES} from '@env';
import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {Text} from 'react-native';
import palette from 'src/styles/palette';

interface ActorItemProps {
  profile_path: string;
  name: string;
}

const ActorItem = ({profile_path, name}: ActorItemProps) => {
  return (
    <>
      {!!profile_path && (
        <View style={styles.wrapper}>
          <View style={styles.ActorItem}>
            <ImageBackground
              source={{uri: `${API_IMAGES}${profile_path}`}}
              style={styles.actorImage}
            />
          </View>
          <View>
            <Text style={styles.actorName}>{name}</Text>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  ActorItem: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: palette.grey,
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
    color: palette.white,
    textAlign: 'center',
    width: 70,
  },
});

export default ActorItem;
