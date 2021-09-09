import React from 'react';
import {useRef} from 'react';
import {View, Animated, StyleSheet} from 'react-native';
import {ActiveUser, CollectionContent} from 'src/models';
import palette from 'src/styles/palette';
import {Collection} from '../common';
import ProfileCardHeader from './ProfileCardHeader';
import ProfileStatsContainer from './stats/ProfileStatsContainer';
import ProfileTitleBar from './ProfileTitleBar';

interface Props {
  isExplore?: boolean;
  collectionContent: CollectionContent[];
  navigateToSettings: () => void;
  logOut: () => void;
  activeUser: ActiveUser;
}

const ProfileComponent: React.FC<Props> = ({
  isExplore,
  collectionContent,
  navigateToSettings,
  logOut,
  activeUser,
}) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.wrapper}>
      <Animated.FlatList
        scrollEnabled={!isExplore}
        data={collectionContent}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <ProfileCardHeader scrollY={scrollY} activeUser={activeUser} />
            <ProfileStatsContainer collectionContent={collectionContent} />
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
        userName={activeUser.userName}
        avatar={activeUser.avatar}
      />
    </View>
  );
};

export default ProfileComponent;

const styles = StyleSheet.create({
  wrapper: {backgroundColor: palette.strongBlack},
});
