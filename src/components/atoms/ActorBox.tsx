import {API_IMAGES} from '@env';
import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';

interface ActorBoxProps {
  poster_path: string;
}

const ActorBox = ({poster_path}: ActorBoxProps) => {
  return (
    <>
      {!!poster_path && (
        <View style={styles.actorBox}>
          <ImageBackground
            source={{uri: `${API_IMAGES}${poster_path}`}}
            style={styles.actorImage}
          />
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
    backgroundColor: 'gray',
    margin: 5,
  },
  actorImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
});

export default ActorBox;
