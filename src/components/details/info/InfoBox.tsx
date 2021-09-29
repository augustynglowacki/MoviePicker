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
  const {runtime, releaseDate} = data as MovieDetails;
  const {seasonsCount, episodesCount} = data as TvSeriesDetails;
  const genresArray = data.genres.map(genre => genre.name);

  const getDurationContent = () => {
    if (runtime) {
      return convertToHours(runtime);
    }
    if (seasonsCount === 1) {
      return t('season');
    }
    if (seasonsCount) {
      return t('seasons', {
        number: seasonsCount,
      });
    }
  };
  const getDateContent = () => {
    if (releaseDate) {
      return format(parseISO(releaseDate), 'yyyy');
    }
    if (episodesCount === 1) {
      return t('episode');
    }
    if (episodesCount) {
      return t('episodes', {
        number: episodesCount,
      });
    }
  };

  return (
    <View style={styles.movieInfo}>
      <StyledText>{getDateContent()}</StyledText>
      <InfoGenres genres={genresArray} />
      {(!!runtime || !!seasonsCount) && (
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
    marginBottom: 4,
    marginTop: 10,
    flexWrap: 'wrap',
  },
  text: {
    color: palette.lightGrey,
    fontSize: 15,
    fontWeight: '600',
  },
});
