import {useNavigation} from '@react-navigation/native';
import {Avatar} from 'native-base';
import React from 'react';
import {ImageBackground} from 'react-native';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MovieBox from '../components/atoms/MovieBox';
import {SETTINGS} from '../models/constants/routeNames';
const Account = () => {
  const {navigate} = useNavigation();

  const navigateTo = () => {
    navigate(SETTINGS);
  };
  return (
    <SafeAreaView style={styles.wrapper}>
      <ImageBackground
        source={require('../assets/images/coverPhoto.jpg')}
        style={styles.coverPhoto}>
        <LinearGradient
          colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0)']}
          start={{x: 0, y: 1}}
          end={{x: 0, y: 0}}
          style={styles.linearGradient}>
          <View style={styles.titleBar}>
            <MaterialIcon color="white" name="notifications-none" size={26} />
            <TouchableOpacity onPress={navigateTo}>
              <MaterialIcon color="white" name="more-vert" size={26} />
            </TouchableOpacity>
          </View>
          <Avatar
            source={{
              uri: 'https://media-exp1.licdn.com/dms/image/C560BAQEM0HmBESd-ng/company-logo_200_200/0/1551168627756?e=2159024400&v=beta&t=g2YbHUitdxt0u-VFoZnVgo7QR926BqR8aFwPFfG6gus',
            }}
            style={styles.avatar}
            size="xl">
            M
            <Avatar.Badge bg={'#FFA31A'} size="xl" />
          </Avatar>
          <View style={styles.infoContainer}>
            <Text style={[styles.text, styles.titleText]}>Mdevelopers</Text>
            <Text style={[styles.text, styles.subText]}>Premium</Text>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statsBox}>
              <Text style={[styles.text, styles.numberText]}>50</Text>
              <Text style={[styles.text, styles.subText]}>Liked</Text>
            </View>
            <View style={[styles.statsBox, styles.statsBoxBorder]}>
              <Text style={[styles.text, styles.numberText]}>112</Text>
              <Text style={[styles.text, styles.subText]}>Watched</Text>
            </View>
            <View style={styles.statsBox}>
              <Text style={[styles.text, styles.numberText]}>20</Text>
              <Text style={[styles.text, styles.subText]}>To Watch</Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
      <MovieBox />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#1b1b1b',
  },
  coverPhoto: {
    backgroundColor: 'red',
  },
  linearGradient: {
    paddingBottom: 50,
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginHorizontal: 16,
    color: 'white',
  },
  avatar: {
    alignSelf: 'center',
  },
  infoContainer: {
    alignItems: 'center',
  },

  text: {
    fontFamily: '',
    color: '#fff',
  },
  titleText: {
    fontSize: 30,
  },
  numberText: {
    fontSize: 24,
  },

  subText: {
    fontSize: 12,
    color: '#FFA31A',
  },
  statsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 32,
  },
  statsBox: {
    alignItems: 'center',
    flex: 1,
  },
  statsBoxBorder: {
    borderColor: '#808080',
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
});
export default Account;
