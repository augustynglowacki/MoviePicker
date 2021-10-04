import {API_IMAGES} from '@env';
import {useNavigation} from '@react-navigation/core';
import {format, parseISO} from 'date-fns';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Animated, {FlipInXDown} from 'react-native-reanimated';
import {IconTypes, Route, WebviewScreenProp} from 'src/constants';
import palette from 'src/styles/palette';
import {Icon} from '../common';
import Background from '../details/background/Background';
import InfoDotIcon from '../details/info/InfoDotIcon';

interface Props {
  name: string;
  placeOfBirth: string;
  deathday: string;
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
  deathday,
}) => {
  const navigation = useNavigation();
  const {navigate} = useNavigation<WebviewScreenProp>();

  const {t} = useTranslation('common');

  const convertData = (data: string) => {
    return format(parseISO(data), 'dd-MM-yyyy');
  };
  return (
    <>
      <Background
        goBack={() => navigation.goBack()}
        posterPath={`${API_IMAGES}${profilePath}`}
      />
      <View style={styles.bottomWrapper}>
        <Animated.Text entering={FlipInXDown.springify()} style={styles.title}>
          {name}
        </Animated.Text>
        <View style={styles.movieInfo}>
          {!!placeOfBirth && (
            <>
              <Text style={styles.text}>{placeOfBirth}</Text>
              <InfoDotIcon />
            </>
          )}
          {!!birthday && (
            <>
              <Text style={styles.text}>{convertData(birthday)}</Text>
              {!!deathday && (
                <Text style={styles.text}>
                  {t('date', {date: convertData(deathday)})}
                </Text>
              )}
            </>
          )}
        </View>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.descriptionText}>{biography}</Text>
          {!!homepage && (
            <TouchableOpacity
              style={styles.link}
              onPress={() => navigate(Route.WEBVIEW, {link: homepage})}>
              <Icon
                name={'globe-outline'}
                type={IconTypes.IONICON}
                color={palette.primary}
                size={20}
              />
              <Text style={[styles.text, styles.linkText]}>
                {t('visitPage')}
              </Text>
            </TouchableOpacity>
          )}
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
  link: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  linkText: {
    fontSize: 20,
    color: palette.primary,
    marginLeft: 5,
  },
});
