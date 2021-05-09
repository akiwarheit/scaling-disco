import * as React from 'react';
import { storiesOf } from '@storybook/react-native';

import CenterView from '../../../../storybook/stories/CenterView';
import RoundedImage from './index';
import { number, text } from '@storybook/addon-knobs';

storiesOf('Molecules', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('RoundedImage', () => (
    <RoundedImage
      radius={10}
      duration={300}
      thumbnailUrl={text(
        'thumbnailUrl',
        'https://via.placeholder.com/150/92c952',
      )}
      style={{
        width: number('width', 100),
        height: number('height', 80),
      }}
    />
  ));
