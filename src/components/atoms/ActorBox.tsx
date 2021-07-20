import {API_IMAGES} from '@env';
import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';

interface ActorBoxProps {
  profile_path: string;
}

const ActorBox = ({profile_path}: ActorBoxProps) => {
  return (
    <>
      {!!profile_path && (
        <View style={styles.actorBox}>
          <ImageBackground
            source={{uri: `${API_IMAGES}${profile_path}`}}
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
    borderRadius: 50,
    overflow: 'hidden',
    resizeMode: 'cover',
  },
});

export default ActorBox;
