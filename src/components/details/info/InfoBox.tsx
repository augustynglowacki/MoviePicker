import {format, parseISO} from 'date-fns';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, Text, View} from 'react-native';
import {convertToHours} from 'src/helpers/convertToHours';
import {MovieDetails, TvSeriesDetails} from 'src/models';
import palette from 'src/styles/palette';
import InfoGenres from './InfoGenres';
import InfoDotIcon from './InfoDotIcon';
interface Props {
  data: MovieDetails | TvSeriesDetails;
}
const StyledText: React.FC = ({children}) => (
  <Text style={styles.text}>{children}</Text>
);

const InfoBox: React.FC<Props> = ({data}) => {
  const {t} = useTranslation('movies');
  const movie = data as MovieDetails;
  const tvSeries = data as TvSeriesDetails;
  const genresArray = data.genres.map(genre => genre.name);

  const getDurationContent = () => {
    if (movie.runtime) {
      return convertToHours(movie.runtime);
    }
    if (tvSeries.seasonsCount) {
      return t('seasons', {
        number: tvSeries.seasonsCount,
      });
    }
  };
  const getDateContent = () => {
    if (movie.releaseDate) {
      return format(parseISO(movie?.releaseDate), 'yyyy');
    }
    if (tvSeries.seasonsCount) {
      return t('seasons', {
        number: tvSeries.episodesCount,
      });
    }
  };

  return (
    <View style={styles.movieInfo}>
      <StyledText>{getDateContent()}</StyledText>
      <InfoGenres genres={genresArray} />
      {(!!movie.runtime || !!tvSeries.seasonsCount) && (
        <>
          <InfoDotIcon />
          <StyledText>{getDurationContent()}</StyledText>
        </>
      )}
    </View>
  );
};

export default InfoBox;

const styles = StyleSheet.create({
  movieInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    marginTop: 15,
    flexWrap: 'wrap',
  },
  text: {
    color: palette.lightGrey,
    fontSize: 15,
    fontWeight: '600',
  },
});
