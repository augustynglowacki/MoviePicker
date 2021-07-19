import React from 'react';
import {View, Text} from 'react-native';

const Details = ({route}: any) => {
  const {title} = route.params;

  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};

export default Details;
