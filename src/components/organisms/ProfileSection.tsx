import React from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {movieSelector} from '../../redux/movie/MovieSlice';
import Container from '../atoms/Container';
import DiscoveryContentBox from '../molecules/DiscoveryContentBox';
import ProfileHeader from '../molecules/ProfileHeader';

const ProfileSection = () => {
  const {movies} = useSelector(movieSelector);
  const {t} = useTranslation();
  return (
    <Container>
      <ProfileHeader />
      <DiscoveryContentBox title={t('movies:liked')} data={movies} />
      <DiscoveryContentBox title={t('movies:watched')} data={movies} />
      <DiscoveryContentBox title={t('movies:toWatch')} data={movies} />
    </Container>
  );
};

export default ProfileSection;
