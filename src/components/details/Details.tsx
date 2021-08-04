import * as React from 'react';
import {Actor, MovieDetails, TvSeriesDetails} from 'src/models';
import {
  Dimensions,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {API_IMAGES} from '@env';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import palette from 'src/styles/palette';
import ActorList from 'src/components/actors/ActorList';
import RatingBox from 'src/components/details/RatingBox';
import DetailsInfoBox from 'src/components/details/DetailsInfoBox';
import {Container} from 'src/components/common';
import Animated, {AnimatedLayout, FlipInXDown} from 'react-native-reanimated';
import Loading from 'src/screens/Loading';

interface Props {
  active: MovieDetails | TvSeriesDetails;
  poster_path: string;
  isMovie: boolean;
  movie: MovieDetails;
  show: TvSeriesDetails;
  movieActors: Actor[];
  goBack: () => void;
}

const DetailsComponent: React.FC<Props> = ({
  poster_path,
  goBack,
  active,
  isMovie,
  movie,
  show,
  movieActors,
}) => {
  if (!show && !movie) {
    return <Loading />;
  }
  return (
    <Container disableSafeArea style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        source={{uri: `${API_IMAGES}${poster_path}`}}>
        <View style={styles.contentWrapper}>
          <View style={styles.headerWrapper}>
            <TouchableOpacity onPress={goBack}>
              <Entypo name="chevron-left" size={35} color={palette.white} />
            </TouchableOpacity>
          </View>
          <View style={styles.linearWrapper}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              colors={['transparent', '#000']}
              style={styles.linearGrandient}
            />
          </View>
        </View>
      </ImageBackground>
      <View style={styles.bottomWrapper}>
        <AnimatedLayout>
          <Animated.View entering={FlipInXDown.springify().delay(300)}>
            <Text style={styles.title}>{!!active?.title && active.title}</Text>
          </Animated.View>
        </AnimatedLayout>
        <DetailsInfoBox isMovie={isMovie} data={isMovie ? movie : show} />
        {!!active?.vote_average && (
          <RatingBox voteAverage={active?.vote_average} />
        )}
        <View style={styles.descriptionWrapper}>
          <Text style={styles.descriptionText}>
            {!!active?.overview && active.overview}
          </Text>
        </View>
        <ActorList data={movieActors} />
      </View>
    </Container>
  );
};

export default DetailsComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.strongBlack,
  },
  title: {
    color: palette.white,
    fontSize: 34,
    textAlign: 'center',
  },
  imageBackground: {
    width: '100%',
    height: Dimensions.get('window').height * 0.6,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? 40 : 30,
    marginHorizontal: 16,
  },
  contentWrapper: {
    flex: 1,
  },
  linearWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  linearGrandient: {
    width: '100%',
    height: 150,
    position: 'absolute',
  },
  descriptionWrapper: {
    marginTop: 40,
    paddingHorizontal: 14,
    alignSelf: 'center',
  },
  descriptionText: {
    color: palette.white,
    fontSize: 16,
    fontWeight: '500',
  },
  bottomWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    marginTop: -40,
  },
});
