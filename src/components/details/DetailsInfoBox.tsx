import {format, parseISO} from 'date-fns';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View} from 'react-native';
import {IconTypes} from 'src/constants';
import {convertToHours} from 'src/helpers/convertToHours';
import {MovieDetails, TvSeriesDetails} from 'src/models';
import palette from 'src/styles/palette';
import {Icon} from '../common';

interface MovieAndShows extends MovieDetails, TvSeriesDetails {}
interface Props {
  data: MovieAndShows;
  isMovie: boolean;
}

const MovieDetailsInfoBox: React.FC<Props> = ({data, isMovie}) => {
  const {release_date, runtime, genres, number_of_seasons, number_of_episodes} =
    data;
  const {t} = useTranslation('movies');
  const genresArray = genres.map(genre => genre.name);
  const firstGenre = genresArray[0];
  const SecondGenre = genresArray[1];

  const getDuration = () => {
    if (isMovie && runtime) {
      return (
        <>
          <Icon
            type={IconTypes.ENTYPO}
            name="dot-single"
            size={32}
            color={palette.lightGrey}
          />
          <Text style={styles.movieInfoItem}>{convertToHours(runtime)}</Text>
        </>
      );
    }
    if (!isMovie && number_of_seasons) {
      return (
        <>
          <Icon
            type={IconTypes.ENTYPO}
            name="dot-single"
            size={32}
            color={palette.lightGrey}
          />
          <Text style={styles.movieInfoItem}>
            {t('seasons', {number: number_of_seasons})}
          </Text>
        </>
      );
    }
  };
  const getDate = () => {
    if (isMovie && release_date) {
      return (
        <>
          <Text style={styles.movieInfoItem}>
            {format(parseISO(release_date), 'yyyy')}
          </Text>
          <Icon
            type={IconTypes.ENTYPO}
            name="dot-single"
            size={32}
            color={palette.lightGrey}
          />
        </>
      );
    }
    if (!isMovie && number_of_seasons) {
      return (
        <>
          <Text style={styles.movieInfoItem}>
            {t('episodes', {number: number_of_episodes})}
          </Text>
          <Icon
            type={IconTypes.ENTYPO}
            name="dot-single"
            size={32}
            color={palette.lightGrey}
          />
        </>
      );
    }
  };
  return (
    <View style={styles.movieInfoWrapper}>
      {getDate()}
      <Text style={styles.genreText}>{`${firstGenre}, `}</Text>
      <Text style={styles.genreText}>{SecondGenre}</Text>
      {getDuration()}
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
    color: palette.lightGrey,
    fontSize: 15,
    fontWeight: '600',
  },
  genreText: {
    color: palette.lightGrey,
    fontSize: 15,
    fontWeight: '600',
  },
});
