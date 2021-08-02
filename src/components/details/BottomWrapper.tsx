import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Actor, MovieDetails, TvSeriesDetails} from 'src/models';
import palette from 'src/styles/palette';
import ActorList from '../actors/ActorList';
import MovieDetailsInfoBox from './DetailsInfoBox';
import RatingBox from './RatingBox';

interface Props {
  isMovie: boolean;
  active: MovieDetails | TvSeriesDetails | undefined;
  actors: Actor[];
  data: MovieDetails | TvSeriesDetails;
}

const BottomWrapper: React.FC<Props> = ({isMovie, active, actors, data}) => {
  return (
    <View style={styles.bottomWrapper}>
      <Text style={styles.title}>{!!active?.title && active?.title}</Text>
      <MovieDetailsInfoBox isMovie={isMovie} data={data} />
      {!!active?.vote_average && (
        <RatingBox voteAverage={active?.vote_average} />
      )}
      <View style={styles.descriptionWrapper}>
        <Text style={styles.descriptionText}>{active?.overview}</Text>
      </View>
      <ActorList data={actors} />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomWrapper: {
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingHorizontal: 16,
    marginTop: -40,
  },
  title: {
    color: palette.white,
    fontSize: 40,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 15,
  },
  descriptionWrapper: {
    marginTop: 20,
    marginBottom: 30,
    paddingHorizontal: 14,
    alignSelf: 'center',
  },
  descriptionText: {
    color: palette.white,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'justify',
  },
});

export default BottomWrapper;
