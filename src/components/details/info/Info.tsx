import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, StyleSheet, Text, Alert} from 'react-native';
import Animated, {FlipInXDown} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import Actors from 'src/components/actors/Actors';
import {Action} from 'src/components/common';
import RatingBox from 'src/components/common/RatingBox';
import {DetailsScreenProp, Route} from 'src/constants';
import {Actor, ButtonsState, MovieDetails, TvSeriesDetails} from 'src/models';
import {
  setFavorite,
  setWatched,
  setWatchlist,
} from 'src/redux/collections/CollectionsActions';
import {userThunkSelector} from 'src/redux/user/UserSlice';
import palette from 'src/styles/palette';

import InfoBox from './InfoBox';

interface Props {
  data: MovieDetails | TvSeriesDetails;
  actors: Actor[];
  buttonsState: ButtonsState;
}

const Info: React.FC<Props> = ({data, actors, buttonsState}) => {
  const movie = {
    id: data.id,
    posterPath: data.posterPath,
    contentType: data.contentType,
  };
  const {t} = useTranslation('common');
  const dispatch = useDispatch();
  const [watchlistButton, setWatchlistButton] = useState(
    buttonsState.watchlist,
  );
  const [favoriteButton, setFavoriteButton] = useState(buttonsState.favorite);
  const [watchedButton, setWatchedButton] = useState(buttonsState.watched);
  const {
    user: {email},
  } = useSelector(userThunkSelector);
  const {navigate} = useNavigation<DetailsScreenProp>();

  const handleAddtoCollection = (
    action: 'favorite' | 'watchlist' | 'watched',
  ) => {
    if (!email) {
      Alert.alert(t('login'), t('loginSuggestion'), [
        {
          text: t('cancel'),
          onPress: () => {},
        },
        {
          text: t('ok'),
          onPress: () => navigate(Route.AUTH),
        },
      ]);
    }
    if (email) {
      if (action === 'favorite') {
        setFavoriteButton(prev => !prev);
        dispatch(setFavorite(movie));
      }
      if (action === 'watchlist') {
        setWatchlistButton(prev => !prev);
        dispatch(setWatchlist(movie));
      }
      if (action === 'watched') {
        setWatchedButton(prev => !prev);
        dispatch(setWatched(movie));
      }
    }
  };
  if (!data) {
    return null;
  }
  return (
    <View style={styles.bottomWrapper}>
      <Animated.View entering={FlipInXDown.springify().delay(300)}>
        <Text style={styles.title}>{data.title}</Text>
      </Animated.View>
      <InfoBox data={data} />
      {!!data.voteAverage && <RatingBox voteAverage={data.voteAverage} />}
      <View style={styles.actions}>
        <Action
          label={t('movies:favorite')}
          icon={'heart'}
          onPress={() => handleAddtoCollection('favorite')}
          isActive={favoriteButton}
        />
        <Action
          label={t('movies:watchlist')}
          icon={'tv'}
          onPress={() => handleAddtoCollection('watchlist')}
          isActive={watchlistButton}
        />
        <Action
          label={t('movies:watched')}
          icon={'checkmark'}
          onPress={() => handleAddtoCollection('watched')}
          isActive={watchedButton}
        />
      </View>
      <View style={styles.descriptionWrapper}>
        <Text style={styles.descriptionText}>{data.overview}</Text>
      </View>
      <Actors data={actors} />
    </View>
  );
};

const styles = StyleSheet.create({
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
  bottomWrapper: {
    paddingHorizontal: 6,
    paddingBottom: 16,
    marginTop: -40,
  },
  actions: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
});

export default Info;
