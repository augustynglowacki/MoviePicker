import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import palette from 'src/styles/palette';
import {userThunkSelector} from 'src/redux/user/UserSlice';

const ProfileInfoContainer: React.FC = () => {
  const {
    user: {userName},
  } = useSelector(userThunkSelector);

  return (
    <View style={styles.infoContainer}>
      <Text style={[styles.text, styles.titleText]}>{userName}</Text>
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
    color: palette.white,
  },
  titleText: {
    fontSize: 30,
  },
  subText: {
    fontSize: 12,
    color: palette.primary,
  },
});
