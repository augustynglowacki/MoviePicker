import 'react-native';
import React from 'react';
import {shallow} from 'enzyme';
import {Container} from 'src/components/common';
import {findByID} from '__utils__';
import {Text, View} from 'react-native';

const testContent = (
  <View>
    <Text testID="text">Testing</Text>
  </View>
);

describe('Container basic tests', () => {
  const wrapper = shallow(
    <Container disableSafeArea disableScroll>
      {testContent}
    </Container>,
  );
  it('Renders children text correctly', () => {
    const text = findByID(wrapper, 'text');
    expect(text.props().children).toEqual('Testing');
  });

  it('KeyboardAvoidingView not rendering', () => {
    const container = findByID(wrapper, 'keyboard');
    expect(container).toHaveLength(0);
  });

  it('SafeAreaView not rendering', () => {
    const container = findByID(wrapper, 'styledSafeArea');
    expect(container).toHaveLength(0);
  });

  it('ScrollView not rendering', () => {
    const container = findByID(wrapper, 'scroll');
    expect(container).toHaveLength(0);
  });
});

describe('Container has KeyboardAvoidingView', () => {
  const wrapper = shallow(<Container withKeyboard>{testContent}</Container>);
  it('KeyboardAvoidingView rendering properly', () => {
    const container = findByID(wrapper, 'keyboard');
    expect(container).toHaveLength(1);
  });
});

describe('Container has SafeAreaView', () => {
  const wrapper = shallow(<Container>{testContent}</Container>);

  it('SafeAreaView rendering properly', () => {
    const container = findByID(wrapper, 'styledSafeArea');
    expect(container).toHaveLength(1);
  });
});

describe('Container has ScrollView', () => {
  const wrapper = shallow(<Container>{testContent}</Container>);

  it('SafeAreaView rendering properly', () => {
    const container = findByID(wrapper, 'scroll');
    expect(container).toHaveLength(1);
  });
});

describe('Container backgroundColor testing', () => {
  it('Container has backgroundColor property set to the color passed as a prop', () => {
    const wrapper = shallow(
      <Container style={{backgroundColor: 'red'}} padding="small">
        {testContent}
      </Container>,
    );
    const component = findByID(wrapper, 'styledSafeArea');
    expect(component.props().style).toContainEqual({backgroundColor: 'red'});
  });
});

describe('Container padding testing', () => {
  it('Container has padding 0 when padding if not specified ', () => {
    const wrapper = shallow(<Container>{testContent}</Container>);
    const component = findByID(wrapper, 'padded');
    expect(component.props().style).toContainEqual({padding: 0});
  });
  it('Container has padding 6 when padding set to small ', () => {
    const wrapper = shallow(
      <Container padding="small">{testContent}</Container>,
    );
    const component = findByID(wrapper, 'padded');
    expect(component.props().style).toContainEqual({padding: 6});
  });
  it('Container has padding 16 when padding set to large', () => {
    const wrapper = shallow(
      <Container padding="large">{testContent}</Container>,
    );
    const component = findByID(wrapper, 'padded');
    expect(component.props().style).toContainEqual({padding: 16});
  });
});

describe('Container flexStart testing', () => {
  it('Content sticks to the top if specified', () => {
    const wrapper = shallow(<Container flexStart>{testContent}</Container>);
    const component = findByID(wrapper, 'padded');
    expect(component.props().style).toContainEqual({
      justifyContent: 'flex-start',
    });
  });
});
