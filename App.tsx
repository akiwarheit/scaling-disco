import React from 'react';
import StorybookUIRoot from './storybook';
import './src/debug';
import Reactotron from 'reactotron-react-native';
import { View } from 'react-native';

const App = () => {
  return <View />;
};

export default Reactotron.storybookSwitcher(StorybookUIRoot)(App);
