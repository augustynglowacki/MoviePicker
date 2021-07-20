import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {API_IMAGES} from '@env';
import {Platform} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../assets/theme/colors';

const HEIGHT = Dimensions.get('window').height;

const Details = ({route}: any) => {
  const {title, poster_path, overview, id} = route.params;

  console.log(id);

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        source={{uri: `${API_IMAGES}${poster_path}`}}>
        <View style={styles.contentWrapper}>
          <View style={styles.headerWrapper}>
            <TouchableOpacity>
              <Entypo name="chevron-left" size={35} color={colors.white} />
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
        <Text>Sesion 1</Text>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.descriptionText}>{overview}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  imageBackground: {
    width: '100%',
    height: HEIGHT * 0.7,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? 40 : 30,
    marginHorizontal: 20,
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
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  title: {
    color: colors.white,
    fontSize: 36,
    fontWeight: '800',
    textAlign: 'center',
  },
  descriptionWrapper: {
    marginTop: 70,
    marginBottom: 30,
  },
  descriptionText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'justify',
  },

  bottomWrapper: {
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingHorizontal: 30,
    marginTop: -40,
  },
});
