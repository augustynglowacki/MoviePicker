import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View, FlatList, Text, ListRenderItem} from 'react-native';
import palette from 'src/styles/palette';
import {Popular} from 'src/models';
import PopularItem from './PopularItem';
import {BOTTOM_TABS_HEIGHT, WINDOW_HEIGHT} from 'src/constants';
import {SafeAreaView} from 'react-native-safe-area-context';

interface Props {
  data: Popular[];
}

const PopularList: React.FC<Props> = ({data}) => {
  const {t} = useTranslation('movies');
  const renderItem: ListRenderItem<Popular> = ({item}) => {
    return <PopularItem movie={item} />;
  };

  const keyExtractor = (item: Popular) => item.id.toString();

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <SafeAreaView>
          <Text style={styles.headingText}>{t('popular')}</Text>
        </SafeAreaView>
      </View>
      <FlatList<Popular>
        data={data}
        renderItem={renderItem}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={WINDOW_HEIGHT - BOTTOM_TABS_HEIGHT}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        initialNumToRender={7}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.strongBlack,
  },
  heading: {
    alignSelf: 'center',
    top: 15,
    position: 'absolute',
    zIndex: 10,
  },
  headingText: {
    color: palette.white,
    fontWeight: 'bold',
    fontSize: 17,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default PopularList;
