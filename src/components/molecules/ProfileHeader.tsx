import React from 'react';
import {Image, StyleSheet} from 'react-native';
import ProfileCover from '../atoms/ProfileCover';
import ProfileTitleBar from '../atoms/ProfileTitleBar';
import ProfileInfoContainer from '../atoms/ProfileInfoContainer';
import ProfileStatsContainer from '../atoms/ProfileStatsContainer';

const ProfileHeader = () => {
  return (
    <ProfileCover img={require('../../assets/images/coverPhoto.jpg')}>
      <ProfileTitleBar />
      <Image
        source={{
          uri: 'https://media-exp1.licdn.com/dms/image/C560BAQEM0HmBESd-ng/company-logo_200_200/0/1551168627756?e=2159024400&v=beta&t=g2YbHUitdxt0u-VFoZnVgo7QR926BqR8aFwPFfG6gus',
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
