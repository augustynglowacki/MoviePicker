import React, {useEffect, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import ProfileCover from './ProfileCover';
import ProfileTitleBar from './ProfileTitleBar';
import ProfileInfoContainer from './ProfileInfoContainer';
import ProfileStatsContainer from './ProfileStatsContainer';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

const ProfileHeader = () => {
  const photoURI = auth().currentUser?.photoURL;
  const [profileURI, setProfileURI] = useState<string>(
    'https://st.depositphotos.com/1522993/4737/v/600/depositphotos_47372005-stock-illustration-orange-blue-background-with-triagles.jpg',
  );

  const fetchAvatar = async () => {
    try {
      const userId = auth().currentUser?.uid;
      const results = await storage()
        .ref(`/users/${userId}/profile.jpg`)
        .getDownloadURL();
      setProfileURI(results);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAvatar();
  }, []);

  return (
    <ProfileCover img={profileURI}>
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
