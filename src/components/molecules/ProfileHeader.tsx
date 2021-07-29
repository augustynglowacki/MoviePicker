import React from 'react';
import {Image, StyleSheet} from 'react-native';
import ProfileCover from '../atoms/ProfileCover';
import ProfileTitleBar from '../atoms/ProfileTitleBar';
import ProfileInfoContainer from '../atoms/ProfileInfoContainer';
import ProfileStatsContainer from '../atoms/ProfileStatsContainer';
import auth from '@react-native-firebase/auth';

const ProfileHeader = () => {
  const photoURI = auth().currentUser?.photoURL;
  return (
    <ProfileCover img={require('../../assets/images/coverPhoto.jpg')}>
      <ProfileTitleBar />
      <Image
        source={{
          uri:
            photoURI ||
            'https://firebasestorage.googleapis.com/v0/b/moviepicker-2405b.appspot.com/o/users%2Fdefault%2FdefaultProfile.jpeg?alt=media&token=bc972054-6f70-4339-a72d-4a6c89be93a2',
        }}
        style={styles.avatar}
      />
      <ProfileInfoContainer />
      <ProfileStatsContainer />
    </ProfileCover>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    resizeMode: 'cover',
    alignSelf: 'center',
  },
});
export default ProfileHeader;
