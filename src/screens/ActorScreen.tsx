import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Actor from 'src/components/actors/Actor';
import {Container, ErrorWrapper} from 'src/components/common';
import {ActorScreenRouteProp} from 'src/constants';
import {getActor} from 'src/redux/actor/ActorAction';
import {actorSelector} from 'src/redux/actor/ActorSlice';

interface Props {
  route: ActorScreenRouteProp;
}

const ActorScreen: React.FC<Props> = React.memo(({route}) => {
  const {id} = route.params;
  const dispatch = useDispatch();

  const {
    actor: {name, placeOfBirth, homepage, birthday, biography, profilePath},
    loading,
    error,
  } = useSelector(actorSelector);

  useEffect(() => {
    dispatch(getActor(id));
  }, [dispatch, id]);

  return (
    <Container flexStart disableSafeArea>
      <ErrorWrapper error={error} loading={loading}>
        <Actor
          name={name}
          placeOfBirth={placeOfBirth}
          homepage={homepage}
          birthday={birthday}
          biography={biography}
          profilePath={profilePath}
        />
      </ErrorWrapper>
    </Container>
  );
});

export default ActorScreen;
