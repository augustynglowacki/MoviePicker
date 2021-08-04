import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Animated, {AnimatedLayout, FlipInXDown} from 'react-native-reanimated';
import {Actor, MovieDetails, TvSeriesDetails} from 'src/models';
import palette from 'src/styles/palette';
import ActorList from '../actors/ActorList';
import InfoBox from './InfoBox';
import RatingBox from './RatingBox';

interface Props {
  active: MovieDetails | TvSeriesDetails;
  isMovie: boolean;
  movie: MovieDetails;
  show: TvSeriesDetails;
  actors: Actor[];
}

const InfoWrapper: React.FC<Props> = ({
  isMovie,
  active,
  actors,
  movie,
  show,
}) => {
  return (
    <View style={styles.bottomWrapper}>
      <AnimatedLayout>
        <Animated.View entering={FlipInXDown.springify().delay(300)}>
          <Text style={styles.title}>{!!active?.title && active.title}</Text>
        </Animated.View>
      </AnimatedLayout>
      <InfoBox isMovie={isMovie} data={isMovie ? movie : show} />
      {!!active?.vote_average && (
        <RatingBox voteAverage={active?.vote_average} />
      )}
      <View style={styles.descriptionWrapper}>
        <Text style={styles.descriptionText}>
          {!!active?.overview && active.overview}
        </Text>
      </View>
      <ActorList data={actors} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: palette.white,
    fontSize: 34,
    textAlign: 'center',
  },
  descriptionWrapper: {
    marginTop: 40,
    paddingHorizontal: 14,
    alignSelf: 'center',
  },
  descriptionText: {
    color: palette.white,
    fontSize: 16,
    fontWeight: '600',
  },
  bottomWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    marginTop: -40,
  },
});

export default InfoWrapper;
