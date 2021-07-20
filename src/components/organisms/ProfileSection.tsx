import React from 'react';
import {useSelector} from 'react-redux';
import {movieSelector} from '../../redux/movie/MovieSlice';
import Container from '../atoms/Container';
import DiscoveryContentBox from '../molecules/DiscoveryContentBox';
import ProfileHeader from '../molecules/ProfileHeader';

const ProfileSection = () => {
  const {movies} = useSelector(movieSelector);

  return (
    <Container>
      <ProfileHeader />
      <DiscoveryContentBox title="Liked" data={movies} />
      <DiscoveryContentBox title="Watched" data={movies} />
      <DiscoveryContentBox title="To watch" data={movies} />
    </Container>
  );
};

export default ProfileSection;
