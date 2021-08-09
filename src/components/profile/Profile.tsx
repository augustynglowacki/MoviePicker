import React from 'react';
import {useRef} from 'react';
import {View, Animated, StyleSheet} from 'react-native';
import {Movie} from 'src/models';
import palette from 'src/styles/palette';
import {Collection} from '../common';
import ProfileCardHeader from './ProfileCardHeader';
import ProfileStatsContainer from './stats/ProfileStatsContainer';
import ProfileTitleBar from './ProfileTitleBar';
interface Props {
  isExplore?: boolean;
  collectionContent: {
    id: number;
    title: string;
    collection: Movie[];
  }[];
  navigateToSettings: () => void;
  logOut: () => void;
}

const ProfileComponent: React.FC<Props> = ({
  isExplore,
  collectionContent,
  navigateToSettings,
  logOut,
}) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.wrapper}>
      <Animated.FlatList
        scrollEnabled={isExplore ? false : true}
        data={collectionContent}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <ProfileCardHeader scrollY={scrollY} />
            <ProfileStatsContainer />
          </>
        }
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
        renderItem={({item: {title, collection}}) => (
          <Collection
            isExplore={isExplore}
            title={title}
            data={collection}
            loading={false}
          />
        )}
      />
      <ProfileTitleBar
        scrollY={scrollY}
        navigateToSettings={navigateToSettings}
        logOut={logOut}
      />
    </View>
  );
};

export default ProfileComponent;

const styles = StyleSheet.create({
  padded: {
    paddingHorizontal: 6,
  },
  wrapper: {backgroundColor: palette.strongBlack},
});
