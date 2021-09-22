import {API_IMAGES} from '@env';
import React, {useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  Avatar,
  Container,
  ErrorWrapper,
  HeaderBar,
} from 'src/components/common';
import {
  ActorScreenNavigationProp,
  ActorScreenRouteProp,
  IconTypes,
} from 'src/constants';
import {getActor} from 'src/redux/actor/ActorAction';
import {actorSelector} from 'src/redux/actor/ActorSlice';
import palette from 'src/styles/palette';

interface Props {
  route: ActorScreenRouteProp;
  navigation: ActorScreenNavigationProp;
}

const ActorScreen: React.FC<Props> = React.memo(({navigation, route}) => {
  const {id} = route.params;
  const dispatch = useDispatch();

  const {actor, loading, error} = useSelector(actorSelector);

  const leftIcon = {
    type: IconTypes.IONICON,
    name: 'ios-arrow-back',
    onPressFunction: () => navigation.goBack(),
  };

  useEffect(() => {
    dispatch(getActor(id));
  }, [dispatch, id]);

  return (
    <Container flexStart>
      <ErrorWrapper error={error} loading={loading}>
        <HeaderBar leftIcon={leftIcon} title={'Actor'} />
        <Avatar
          source={`${API_IMAGES}${actor.profilePath}`}
          onPress={() => {}}
        />
        <Text style={styles.text}>Actor: {id}</Text>
        <Text style={styles.text}>Birthday: {actor.birthday}</Text>
        <Text style={styles.text}>Deathday: {actor.deathday}</Text>
        <Text style={styles.text}>{actor.biography}</Text>
      </ErrorWrapper>
    </Container>
  );
});

export default ActorScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    color: palette.white,
  },
});
