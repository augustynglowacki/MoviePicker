import React from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {movieSelector} from '../../redux/movie/MovieSlice';
import {CollectionContentBox, Container} from '../common';
import ProfileHeader from './ProfileHeader';

const ProfileComponent = () => {
  const {movies} = useSelector(movieSelector);
  const {t} = useTranslation();
  return (
    <Container>
      <ProfileHeader />
      <Container withPadding disableScroll disableSafeArea>
        <CollectionContentBox
          title={t('movies:liked')}
          data={movies}
          error=""
          loading={false}
        />
        <CollectionContentBox
          title={t('movies:watched')}
          data={movies}
          error=""
          loading={false}
        />
        <CollectionContentBox
          title={t('movies:toWatch')}
          data={movies}
          error=""
          loading={false}
        />
      </Container>
    </Container>
  );
};

export default ProfileComponent;
