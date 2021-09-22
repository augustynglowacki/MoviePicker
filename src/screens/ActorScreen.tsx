import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Container, HeaderBar} from 'src/components/common';
import {
  ActorScreenNavigationProp,
  ActorScreenRouteProp,
  IconTypes,
} from 'src/constants';
import palette from 'src/styles/palette';

interface Props {
  route: ActorScreenRouteProp;
  navigation: ActorScreenNavigationProp;
}

const ActorScreen: React.FC<Props> = ({navigation, route}) => {
  const {id} = route.params;

  const leftIcon = {
    type: IconTypes.IONICON,
    name: 'ios-arrow-back',
    onPressFunction: () => navigation.goBack(),
  };

  return (
    <Container flexStart>
      <HeaderBar leftIcon={leftIcon} title={'Actor:'} />
      <Text style={styles.text}>Actor: {id}</Text>
    </Container>
  );
};

export default ActorScreen;

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    color: palette.white,
  },
});
