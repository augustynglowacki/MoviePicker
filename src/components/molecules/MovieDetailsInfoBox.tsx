import {format, parseISO} from 'date-fns';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../../assets/theme/colors';
import {convertToHours} from '../../helpers/convertToHours';
import {MovieDetails} from '../../models/MovieDetails';

interface MovieDetailsInfoBoxProps {
  movie: MovieDetails;
}

const MovieDetailsInfoBox = ({
  movie: {release_date, runtime, genres},
}: MovieDetailsInfoBoxProps) => {
  const genresArray = genres.map(genre => genre.name);
  const firstGenre = genresArray[0];
  const SecondGenre = genresArray[1];
  const date = format(parseISO(release_date), 'yyyy');

  return (
    <View style={styles.movieInfoWrapper}>
      <Text style={styles.movieInfoItem}>{date}</Text>
      <Entypo name="dot-single" size={32} color={colors.lightGrey} />
      <Text style={styles.genreText}>{`${firstGenre}, `}</Text>
      <Text style={styles.genreText}>{SecondGenre}</Text>
      <Entypo name="dot-single" size={32} color={colors.lightGrey} />
      <Text style={styles.movieInfoItem}>{convertToHours(runtime)}</Text>
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
  },
  movieInfoItem: {
    color: colors.lightGrey,
    fontSize: 14,
    fontWeight: '600',
  },
  genreText: {
    color: colors.lightGrey,
    fontSize: 16,
    fontWeight: '600',
  },
});
