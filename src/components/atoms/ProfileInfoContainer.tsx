import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../../assets/theme/colors';
import {userSelector} from '../../redux/user/UserSlice';

const ProfileInfoContainer = () => {
  const {email, userName} = useSelector(userSelector);
  return (
    <View style={styles.infoContainer}>
      <Text style={[styles.text, styles.titleText]}>
        {email} {userName}
      </Text>
      <Text style={[styles.text, styles.subText]}>Premium</Text>
    </View>
  );
};

export default ProfileInfoContainer;
const styles = StyleSheet.create({
  infoContainer: {
    alignItems: 'center',
  },
  text: {
    //fontFamily: '',
    color: colors.white,
  },
  titleText: {
    fontSize: 30,
  },
  subText: {
    fontSize: 12,
    color: colors.primary,
  },
});
