import Reactotron from 'reactotron-react-native';

Reactotron.configure();

// @ts-ignore tron types suck balls
// eslint-disable-next-line react-hooks/rules-of-hooks
Reactotron.useReactNative();

// if we're running in DEV mode, then let's connect!
if (__DEV__) {
  Reactotron.connect();
  // @ts-ignore
  Reactotron.clear();
}

Reactotron.onCustomCommand('test', () =>
  // @ts-ignore
  console.tron.log('This is an example'),
);

// @ts-ignore
console.tron = Reactotron;
