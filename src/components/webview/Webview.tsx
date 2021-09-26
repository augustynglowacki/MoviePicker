import React from 'react';
import {Linking} from 'react-native';
import WebView from 'react-native-webview';
import {
  IconTypes,
  WebviewScreenNavigationProp,
  WebviewScreenRouteProp,
} from 'src/constants';
import {Container, HeaderBar} from '../common';

interface Props {
  route: WebviewScreenRouteProp;
  navigation: WebviewScreenNavigationProp;
}

const Webview: React.FC<Props> = ({navigation, route}) => {
  const {link} = route.params;

  const leftIcon = {
    type: IconTypes.IONICON,
    name: 'ios-arrow-back',
    onPressFunction: () => navigation.goBack(),
  };

  const rightIcon = {
    type: IconTypes.MATERIAL,
    name: 'open-in-browser',
    onPressFunction: () => Linking.openURL(link),
  };

  return (
    <Container>
      <HeaderBar leftIcon={leftIcon} title={link} rightIcon={rightIcon} />
      <WebView source={{uri: link}} />
    </Container>
  );
};

export default Webview;
