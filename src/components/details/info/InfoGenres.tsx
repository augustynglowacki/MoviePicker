import * as React from 'react';
import {StyleSheet, Text} from 'react-native';
import palette from 'src/styles/palette';
import InfoDotIcon from './InfoDotIcon';

interface Props {
  genres: string[];
}

const InfoGenres: React.FC<Props> = ({genres}) => {
  if (!genres.length) {
    return <InfoDotIcon />;
  }
  return (
    <>
      <InfoDotIcon />
      <Text style={styles.text}>{`${genres[0]}`}</Text>
      {genres.length > 1 && <Text style={styles.text}>{`, ${genres[1]}`}</Text>}
      <InfoDotIcon />
    </>
  );
};

export default InfoGenres;

const styles = StyleSheet.create({
  text: {
    color: palette.lightGrey,
    fontSize: 15,
    fontWeight: '600',
  },
});
