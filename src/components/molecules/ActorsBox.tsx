import React from 'react';
import {FlatList, ListRenderItem, StyleSheet, View} from 'react-native';
import colors from '../../assets/theme/colors';
import {Actor} from '../../models';
import ActorBox from '../atoms/ActorBox';
import SectionHeader from '../atoms/SectionHeader';

interface ActorsBoxProps {
  data: Actor[];
}

const renderItem: ListRenderItem<Actor> = ({item}) => (
  <ActorBox name={item.name} profile_path={item.profile_path} />
);

const ActorsBox = ({data}: ActorsBoxProps) => {
  return (
    <View style={styles.actorsBox}>
      <SectionHeader text="Actors" color={colors.white} size={20} />
      <FlatList
        data={data}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
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
