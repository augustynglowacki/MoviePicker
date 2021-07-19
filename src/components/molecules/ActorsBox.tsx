import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import colors from '../../assets/theme/colors';
import ActorBox from '../atoms/ActorBox';
import SectionHeader from '../atoms/SectionHeader';

const ActorsBox = () => {
  return (
    <View style={styles.actorsBox}>
      <SectionHeader text="Actors" color={colors.white} size={20} />
      <ScrollView horizontal={true}>
        <ActorBox />
        <ActorBox />
        <ActorBox />
        <ActorBox />
        <ActorBox />
        <ActorBox />
        <ActorBox />
        <ActorBox />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  actorsBox: {
    marginTop: 5,
    marginBottom: 15,
  },
});

export default ActorsBox;
