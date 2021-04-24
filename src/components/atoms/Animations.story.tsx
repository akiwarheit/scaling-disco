import * as React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Text, View } from 'react-native';
import { Animations } from './Animations';
import { text, number } from '@storybook/addon-knobs';

import CenterView from '../../../storybook/stories/CenterView';

const ViewStyle = { backgroundColor: '#006610', padding: 10 };
const TextStyle = { color: 'white' };

storiesOf('Atoms', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('Animations.Slide', () => (
    <Animations.Slide offset={number('Offset', -100)}>
      <View style={ViewStyle}>
        <Text style={TextStyle}>{text('Button text', 'Hello Button')}</Text>
      </View>
    </Animations.Slide>
  ))
  .add('Animations.Fade', () => (
    <Animations.Fade duration={number('Duration', 1000)}>
      <View style={ViewStyle}>
        <Text style={TextStyle}>{text('Button text', 'Hello Button')}</Text>
      </View>
    </Animations.Fade>
  ));
