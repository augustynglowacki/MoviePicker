import {format, parseISO} from 'date-fns';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {convertToHours} from 'src/helpers/convertToHours';
import {MovieDetails, TvSeriesDetails} from 'src/models';
import palette from 'src/styles/palette';

type MovieAndShows = MovieDetails & TvSeriesDetails;
interface Props {
  data: MovieAndShows;
  isMovie: boolean;
}

const DetailsInfoBox: React.FC<Props> = ({data, isMovie}) => {
  const {release_date, runtime, genres, number_of_seasons, number_of_episodes} =
    data;
  const genresArray = genres.map(genre => genre.name);
  const getDuration = () => {
    if (isMovie && runtime) {
      return (
        <>
          <Entypo name="dot-single" size={32} color={palette.lightGrey} />
          <Text style={styles.text}>{convertToHours(runtime)}</Text>
        </>
      );
    }
    if (!isMovie && number_of_seasons) {
      return (
        <>
          <Entypo name="dot-single" size={32} color={palette.lightGrey} />
          <Text style={styles.text}>{`${number_of_seasons} seasons`}</Text>
        </>
      );
    }
  };
  const getDate = () => {
    if (isMovie && release_date) {
      return (
        <>
          <Text style={styles.text}>
            {format(parseISO(release_date), 'yyyy')}
          </Text>
          <Entypo name="dot-single" size={32} color={palette.lightGrey} />
        </>
      );
    }
    if (!isMovie && number_of_seasons) {
      return (
        <>
          <Text style={styles.text}>{`${number_of_episodes} episodes`}</Text>
          <Entypo name="dot-single" size={32} color={palette.lightGrey} />
        </>
      );
    }
  };

  return (
    <View style={styles.movieInfoWrapper}>
      {getDate()}
      <Text style={styles.text}>
        {`${genresArray[0]}`}
        {genresArray.length > 1 && <Text style={styles.text}>{', '}</Text>}
      </Text>
      {genresArray.length > 1 && (
        <Text style={styles.text}>{`${genresArray[1]}`}</Text>
      )}
      {getDuration()}
    </View>
  );
};

export default DetailsInfoBox;

const styles = StyleSheet.create({
  movieInfoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    marginTop: 24,
    flexWrap: 'wrap',
  },
  text: {
    color: palette.lightGrey,
    fontSize: 15,
    fontWeight: '600',
  },
});
