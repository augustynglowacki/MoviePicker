import React, {useRef} from 'react';
import {Text, View, ImageBackground, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {API_IMAGES} from '@env';
import {Movie} from '../../models';
import {StyleSheet, Dimensions} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {AUTH, DETAILS} from '../../models/constants/routeNames';
import colors from '../../assets/theme/colors';
import {useSelector} from 'react-redux';
import {genresSelector} from '../../redux/genres/GenresSlice';

const WINDOW_HEIGHT = Dimensions.get('window').height;

const MovieItem = ({
  id,
  poster_path,
  overview,
  title,
  mergeGenresWithMovies,
}: Movie) => {
  const {loading} = useSelector(genresSelector);
  const {navigate} = useNavigation();
  const doubleTapRef = useRef();
  const isLogIn = false; //temprary state

  const handleOnActivated = () => {
    if (isLogIn) {
      //  TODO:
      console.log('add function to like');
    }
    if (!isLogIn) {
      Alert.alert('Login ', 'Do you want to login to add to favorite?', [
        {
          text: 'Cancel',
          onPress: () => {},
        },
        {
          text: 'OK',
          onPress: () => navigate(AUTH),
        },
      ]);
    }
  };
  return (
    <TapGestureHandler
      waitFor={doubleTapRef}
      onActivated={() => {
        navigate(DETAILS, {
          poster_path,
          overview,
          title,
          id,
        });
      }}>
      <TapGestureHandler
        maxDelayMs={250}
        ref={doubleTapRef}
        numberOfTaps={2}
        onActivated={handleOnActivated}>
        <View style={styles.movieContainer}>
          <ImageBackground
            source={{uri: `${API_IMAGES}${poster_path}`}}
            style={styles.image}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.9)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.4)']}
            start={{x: 0, y: 1}}
            end={{x: 0, y: 0}}
            style={styles.linearGradient}
          />
          <View style={styles.contentContainer}>
            <View style={styles.titles}>
              <Text style={styles.title}>{title}</Text>

              <View style={styles.subtitle}>
                {loading ? (
                  <Text>Loading </Text>
                ) : (
                  mergeGenresWithMovies.map((genre: any) => (
                    <View key={genre.name} style={styles.categoryContainer}>
                      <Text style={styles.categoryItem}>{genre.name}</Text>
                    </View>
                  ))
                )}
              </View>
            </View>
          </View>
        </View>
      </TapGestureHandler>
    </TapGestureHandler>
  );
};

export default MovieItem;

export const styles = StyleSheet.create({
  movieContainer: {
    width: '100%',
    height: WINDOW_HEIGHT,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    height: WINDOW_HEIGHT * 0.9,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titles: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontWeight: '800',
    fontSize: 42,
    marginBottom: 15,
    color: colors.white,
    textAlign: 'center',
  },
  subtitle: {
    maxWidth: 350,
    fontSize: 14,
    letterSpacing: 0.76,
    lineHeight: 21,
    color: colors.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  categoryContainer: {
    marginRight: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 2,
    backgroundColor: colors.white,
    marginTop: 6,
  },
  categoryItem: {
    color: colors.black,
    fontWeight: '600',
    fontSize: 13,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  linearGradient: {
    height: '100%',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
