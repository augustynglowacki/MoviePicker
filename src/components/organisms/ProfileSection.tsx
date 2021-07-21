import React from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {movieSelector} from '../../redux/movie/MovieSlice';
import Container from '../atoms/Container';
import DiscoveryContentBox from '../molecules/DiscoveryContentBox';
import ProfileHeader from '../molecules/ProfileHeader';

const ProfileSection = () => {
  const {movies} = useSelector(movieSelector);
  const {i18n} = useTranslation();
  return (
    <Container>
      <ProfileHeader />
      <DiscoveryContentBox title={i18n.t('movies:liked')} data={movies} />
      <DiscoveryContentBox title={i18n.t('movies:watched')} data={movies} />
      <DiscoveryContentBox title={i18n.t('movies:toWatch')} data={movies} />
    </Container>
  );
};

export default ProfileSection;
