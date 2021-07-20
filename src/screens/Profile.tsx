import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ProfileSection from '../components/organisms/ProfileSection';

const Profile = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <ProfileSection />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#1b1b1b',
  },
});
export default Profile;
