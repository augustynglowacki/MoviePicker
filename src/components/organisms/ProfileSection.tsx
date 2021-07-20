import React from 'react';
import {ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {movieSelector} from '../../redux/movie/MovieSlice';
import DiscoveryContentBox from '../molecules/DiscoveryContentBox';
import ProfileHeader from '../molecules/ProfileHeader';

const ProfileSection = () => {
  const {movies} = useSelector(movieSelector);

  return (
    <ScrollView>
      <ProfileHeader />
      <DiscoveryContentBox title="Liked" data={movies} />
      <DiscoveryContentBox title="Watched" data={movies} />
      <DiscoveryContentBox title="To watch" data={movies} />
    </ScrollView>
  );
};

export default ProfileSection;
