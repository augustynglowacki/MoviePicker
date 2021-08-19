import 'react-native';
import React from 'react';
import {shallow} from 'enzyme';
import {Container} from 'src/components/common';
import {findByID, Shallow} from '__utils__';
import {Text, View} from 'react-native';

let wrapper: Shallow;
const testContent = (
  <View>
    <Text testID="text">Testing</Text>
  </View>
);

describe('Container basic tests', () => {
  beforeEach(() => {
    wrapper = shallow(
      <Container disableSafeArea disableScroll>
        {testContent}
      </Container>,
    );
  });
  it('Renders children text correctly', () => {
    const text = findByID(wrapper, 'text');
    expect(text.props().children).toEqual('Testing');
  });

  it('KeyboardAvoidingView not rendering', () => {
    const kav = findByID(wrapper, 'keyboard');
    expect(kav).toHaveLength(0);
  });

  it('SafeAreaView not rendering', () => {
    const kav = findByID(wrapper, 'styledSafeArea');
    expect(kav).toHaveLength(0);
  });

  it('ScrollView not rendering', () => {
    const kav = findByID(wrapper, 'scroll');
    expect(kav).toHaveLength(0);
  });
});

describe('Container has KeyboardAvoidingView', () => {
  beforeEach(() => {
    wrapper = shallow(<Container withKeyboard>{testContent}</Container>);
  });

  it('KeyboardAvoidingView rendering properly', () => {
    const kav = findByID(wrapper, 'keyboard');
    expect(kav).toHaveLength(1);
  });
});

describe('Container has SafeAreaView', () => {
  beforeEach(() => {
    wrapper = shallow(<Container>{testContent}</Container>);
  });

  it('SafeAreaView rendering properly', () => {
    const kav = findByID(wrapper, 'styledSafeArea');
    expect(kav).toHaveLength(1);
  });
});

describe('Container has ScrollView', () => {
  beforeEach(() => {
    wrapper = shallow(<Container>{testContent}</Container>);
  });

  it('SafeAreaView rendering properly', () => {
    const item = findByID(wrapper, 'scroll');
    expect(item).toHaveLength(1);
  });
});

describe('Container backgroundColor testing', () => {
  it('Container has backgroundColor property set to the color passed as a prop', () => {
    wrapper = shallow(
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
    wrapper = shallow(<Container>{testContent}</Container>);
    const component = findByID(wrapper, 'padded');
    expect(component.props().style).toContainEqual({padding: 0});
  });
  it('Container has padding 6 when padding set to small ', () => {
    wrapper = shallow(<Container padding="small">{testContent}</Container>);
    const component = findByID(wrapper, 'padded');
    expect(component.props().style).toContainEqual({padding: 6});
  });
  it('Container has padding 16 when padding set to large', () => {
    wrapper = shallow(<Container padding="large">{testContent}</Container>);
    const component = findByID(wrapper, 'padded');
    expect(component.props().style).toContainEqual({padding: 16});
  });
});

describe('Container flexStart testing', () => {
  it('Content sticks to the top if specified', () => {
    wrapper = shallow(<Container flexStart>{testContent}</Container>);
    const component = findByID(wrapper, 'padded');
    expect(component.props().style).toContainEqual({
      justifyContent: 'flex-start',
    });
  });
});
