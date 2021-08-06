import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Animated, {AnimatedLayout, FlipInXDown} from 'react-native-reanimated';
import ActorList from 'src/components/actors/ActorList';
import RatingBox from 'src/components/common/RatingBox';
import {Actor, MovieDetails, TvSeriesDetails} from 'src/models';
import palette from 'src/styles/palette';

import InfoBox from './InfoBox';

interface Props {
  data: MovieDetails | TvSeriesDetails;
  actors: Actor[];
}

const Info: React.FC<Props> = ({data, actors}) => {
  if (!data) {
    return null;
  }
  return (
    <View style={styles.bottomWrapper}>
      <AnimatedLayout>
        <Animated.View entering={FlipInXDown.springify().delay(300)}>
          <Text style={styles.title}>{data.title}</Text>
        </Animated.View>
      </AnimatedLayout>
      <InfoBox data={data} />
      <RatingBox voteAverage={data.voteAverage} />
      <View style={styles.descriptionWrapper}>
        <Text style={styles.descriptionText}>{data.overview}</Text>
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

export default Info;
