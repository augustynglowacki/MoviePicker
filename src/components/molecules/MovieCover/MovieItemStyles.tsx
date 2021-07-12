import {StyleSheet, Dimensions} from 'react-native';

export const styles = StyleSheet.create({
  movieContainer: {
    width: '100%',
    height: Dimensions.get('window').height,
    position: 'relative',
  },
  contentContainer: {
    justifyContent: 'space-between',
    width: '100%',
    height: ' 100%',
    paddingVertical: 50,
    marginTop: '120%',
  },
  titles: {
    marginBottom: 120,
    padding: 20,
  },
  title: {
    fontWeight: '800',
    fontSize: 36,
    marginBottom: 15,
    color: '#ffff',
  },
  subtitle: {
    maxWidth: 300,
    fontSize: 14,
    letterSpacing: 0.76,
    lineHeight: 21,
    color: '#ffff',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  linearGradient: {
    height: 500,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
