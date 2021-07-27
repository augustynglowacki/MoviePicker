import {format, parseISO} from 'date-fns';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../../assets/theme/colors';
import {convertToHours} from '../../helpers/convertToHours';
import {MovieDetails} from '../../models/MovieDetails';
import {TvShowsDetails} from '../../models/TvShowsDetails';

interface MovieAndShows extends MovieDetails, TvShowsDetails {}
interface MovieDetailsInfoBoxProps {
  data: MovieAndShows;
  isMovie: boolean;
}

const MovieDetailsInfoBox = ({
  data: {
    release_date = '1990-12-12', //random inital nubmer
    runtime = 129, //random inital nubmer
    genres,
    number_of_seasons,
    number_of_episodes,
  },
  isMovie,
}: MovieDetailsInfoBoxProps) => {
  const genresArray = genres.map(genre => genre.name);
  const firstGenre = genresArray[0];
  const SecondGenre = genresArray[1];
  const date = format(parseISO(release_date), 'yyyy');

  return (
    <View style={styles.movieInfoWrapper}>
      <Text style={styles.movieInfoItem}>
        {isMovie ? date : `${number_of_episodes} episodes`}
      </Text>
      <Entypo name="dot-single" size={32} color={colors.lightGrey} />
      <Text style={styles.genreText}>{`${firstGenre}, `}</Text>
      <Text style={styles.genreText}>{SecondGenre}</Text>
      <Entypo name="dot-single" size={32} color={colors.lightGrey} />
      <Text style={styles.movieInfoItem}>
        {isMovie ? convertToHours(runtime) : `${number_of_seasons} seasons`}
      </Text>
    </View>
  );
};

export default MovieDetailsInfoBox;

const styles = StyleSheet.create({
  movieInfoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  movieInfoItem: {
    color: colors.lightGrey,
    fontSize: 15,
    fontWeight: '600',
  },
  genreText: {
    color: colors.lightGrey,
    fontSize: 15,
    fontWeight: '600',
  },
});
