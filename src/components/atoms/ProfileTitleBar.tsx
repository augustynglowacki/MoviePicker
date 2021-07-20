import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../assets/theme/colors';
import {SETTINGS} from '../../models/constants/routeNames';

const ProfileTitleBar = () => {
  const {navigate} = useNavigation();

  const navigateTo = () => {
    navigate(SETTINGS);
  };
  return (
    <View style={styles.titleBar}>
      <MaterialIcon color={colors.white} name="notifications-none" size={26} />
      <TouchableOpacity onPress={navigateTo}>
        <MaterialIcon color={colors.white} name="more-vert" size={26} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginHorizontal: 16,
    color: 'white',
  },
});
export default ProfileTitleBar;
