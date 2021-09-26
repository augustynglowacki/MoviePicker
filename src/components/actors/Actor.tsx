import {API_IMAGES} from '@env';
import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {FlipInXDown} from 'react-native-reanimated';
import palette from 'src/styles/palette';
import Background from '../details/background/Background';
import InfoDotIcon from '../details/info/InfoDotIcon';

interface Props {
  name: string;
  placeOfBirth: string;
  homepage: string;
  birthday: string;
  biography: string;
  profilePath: string;
}

const Actor: React.FC<Props> = ({
  name,
  placeOfBirth,
  homepage,
  birthday,
  biography,
  profilePath,
}) => {
  const navigation = useNavigation();
  return (
    <>
      <Background
        goBack={() => navigation.goBack()}
        posterPath={`${API_IMAGES}${profilePath}`}
      />
      <View style={styles.bottomWrapper}>
        <Animated.View entering={FlipInXDown.springify().delay(300)}>
          <Text style={styles.title}>{name}</Text>
        </Animated.View>
        <View style={styles.movieInfo}>
          <Text style={styles.text}>{placeOfBirth}</Text>
          <InfoDotIcon />
          <Text style={styles.text}>{homepage}</Text>
          {!!birthday && (
            <>
              <InfoDotIcon />
              <Text style={styles.text}>{birthday}</Text>
            </>
          )}
        </View>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.descriptionText}>{biography}</Text>
        </View>
      </View>
    </>
  );
};

export default Actor;

const styles = StyleSheet.create({
  text: {
    color: palette.lightGrey,
    fontSize: 15,
    fontWeight: '600',
  },
  bottomWrapper: {
    paddingHorizontal: 6,
    paddingBottom: 16,
    marginTop: -40,
  },
  title: {
    color: palette.white,
    fontSize: 34,
    textAlign: 'center',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
  },
  descriptionWrapper: {
    paddingHorizontal: 14,
    alignSelf: 'center',
  },
  descriptionText: {
    color: palette.white,
    fontSize: 16,
    fontWeight: '600',
  },
  movieInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    marginTop: 15,
    flexWrap: 'wrap',
  },
});
