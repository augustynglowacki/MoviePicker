import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View, FlatList, Text, ListRenderItem} from 'react-native';
import palette from 'src/styles/palette';
import {Popular} from 'src/models';
import PopularItem from './PopularItem';
import {BOTTOM_TABS_HEIGHT} from 'src/constants';
import {
  SafeAreaView,
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Animated, {AnimatedLayout, FlipInXDown} from 'react-native-reanimated';

interface Props {
  data: Popular[];
  loggedIn: boolean;
}

const PopularList: React.FC<Props> = ({data, loggedIn}) => {
  const {t} = useTranslation('movies');
  const renderItem: ListRenderItem<Popular> = ({item}) => {
    return <PopularItem movie={item} loggedIn={loggedIn} />;
  };

  const keyExtractor = (item: Popular) => item.id.toString();
  //workaround for height on devices with notch
  const frame = useSafeAreaFrame();
  const {bottom} = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <SafeAreaView>
          <AnimatedLayout>
            <Animated.View entering={FlipInXDown.springify().delay(300)}>
              <Text style={styles.headingText}>{t('popular')}</Text>
            </Animated.View>
          </AnimatedLayout>
        </SafeAreaView>
      </View>
      <FlatList<Popular>
        data={data}
        renderItem={renderItem}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={frame.height - BOTTOM_TABS_HEIGHT - bottom}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        initialNumToRender={7}
        removeClippedSubviews={false}
        getItemLayout={(item, index) => ({
          length: frame.height - BOTTOM_TABS_HEIGHT - bottom,
          offset: frame.height - BOTTOM_TABS_HEIGHT - bottom * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  heading: {
    alignSelf: 'center',
    top: 10,
    position: 'absolute',
    zIndex: 10,
  },
  headingText: {
    color: palette.white,
    fontWeight: 'bold',
    fontSize: 17,
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default PopularList;
