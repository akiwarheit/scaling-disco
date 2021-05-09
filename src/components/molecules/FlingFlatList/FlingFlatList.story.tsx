import * as React from 'react';
import { storiesOf } from '@storybook/react-native';

import CenterView from '../../../../storybook/stories/CenterView';
import { JustRoundedImage } from '../RoundedImage';
import FlingFlatList from './index';
import { Dimensions, FlatList, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const itemWidth = Dimensions.get('window').width * 0.85;
const itemHeight = Dimensions.get('window').height * 0.3;
const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);

const DATA = Array.from(Array(50).keys()).map(() => ({
  url: `https://via.placeholder.com/300x300/${randomColor()}`,
}));

storiesOf('Molecules', module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('FlingFlatList#JustRoundedImage', () => (
    <FlingFlatList
      keyExtractor={(_, idx) => `${idx}`}
      itemWidth={itemWidth}
      visibleItems={3}
      data={DATA}
      renderItem={({ item }) => {
        return (
          <JustRoundedImage
            radius={10}
            thumbnailUrl={item.url}
            style={{
              width: itemWidth,
              height: itemHeight,
            }}
          />
        );
      }}
    />
  ))
  .add('FlingFlatList#View', () => (
    <FlingFlatList
      keyExtractor={(_, idx) => `${idx}`}
      itemWidth={itemWidth}
      visibleItems={3}
      data={DATA}
      renderItem={({ item }) => {
        return (
          <View
            style={{
              width: itemWidth,
              height: itemHeight,
              backgroundColor: `#${randomColor()}`,
            }}>
            <Text>{item.url}</Text>
          </View>
        );
      }}
    />
  ))
  .add('Multiple Flat List', () => {
    return (
      <ScrollView>
        <FlatList
          keyExtractor={(_, idx) => `${idx}`}
          horizontal
          data={DATA}
          renderItem={({ item }) => {
            return (
              <JustRoundedImage
                radius={10}
                thumbnailUrl={item.url}
                style={{
                  width: itemWidth,
                  height: itemHeight,
                }}
              />
            );
          }}
        />
        <View style={{ height: itemHeight }}>
          <FlingFlatList
            keyExtractor={(_, idx) => `${idx}`}
            itemWidth={itemWidth}
            visibleItems={3}
            data={DATA}
            renderItem={({ item }) => {
              return (
                <JustRoundedImage
                  radius={10}
                  thumbnailUrl={item.url}
                  style={{
                    width: itemWidth,
                    height: itemHeight,
                  }}
                />
              );
            }}
          />
        </View>
        <FlatList
          keyExtractor={(_, idx) => `${idx}`}
          horizontal
          data={DATA}
          renderItem={({ item }) => {
            return (
              <JustRoundedImage
                radius={10}
                thumbnailUrl={item.url}
                style={{
                  width: itemWidth,
                  height: itemHeight,
                }}
              />
            );
          }}
        />
        <FlatList
          keyExtractor={(_, idx) => `${idx}`}
          horizontal
          data={DATA}
          renderItem={({ item }) => {
            return (
              <JustRoundedImage
                radius={10}
                thumbnailUrl={item.url}
                style={{
                  width: itemWidth,
                  height: itemHeight,
                }}
              />
            );
          }}
        />
        <FlatList
          keyExtractor={(_, idx) => `${idx}`}
          horizontal
          data={DATA}
          renderItem={({ item }) => {
            return (
              <JustRoundedImage
                radius={10}
                thumbnailUrl={item.url}
                style={{
                  width: itemWidth,
                  height: itemHeight,
                }}
              />
            );
          }}
        />
      </ScrollView>
    );
  });
