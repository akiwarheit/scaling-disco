import React, { useCallback, useEffect } from 'react';
import { Animated, FlatList, FlatListProps, View } from 'react-native';
import {
  Directions,
  FlingGestureHandler,
  State,
} from 'react-native-gesture-handler';
import style from './StackFlatList.styles';

interface StackFlatList<T> extends FlatListProps<T> {
  itemWidth: number;
  visibleItems: number;
  translateXOutputs?: number[];
  scaleOutputs?: number[];
  opacityOutputs?: number[];
}

export default function StackFlatList<T>(props: StackFlatList<T>) {
  const [cIndex, setIndex] = React.useState(0);

  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
  const scrollXIndex = React.useRef(new Animated.Value(0)).current;

  const setActiveIndex = useCallback(
    activeIndex => {
      scrollXIndex.setValue(activeIndex);
      setIndex(activeIndex);
    },
    [scrollXIndex],
  );

  useCallback(
    activeIndex => {
      scrollXIndex.setValue(activeIndex);
    },
    [scrollXIndex],
  );

  const {
    itemWidth,
    visibleItems,
    renderItem,
    data,
    keyExtractor,
    translateXOutputs = [50, 0, -100],
    scaleOutputs = [0.8, 1, 1],
    opacityOutputs = [1 - 1 / visibleItems, 1, 0],
  } = props;

  useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  }, [scrollXAnimated, scrollXIndex]);

  return (
    <FlingGestureHandler
      key="left"
      direction={Directions.LEFT}
      onHandlerStateChange={(ev: any) => {
        if (ev.nativeEvent.state === State.END) {
          if (cIndex === data!.length - 1) {
            return;
          }
          setActiveIndex(cIndex + 1);
        }
      }}>
      <FlingGestureHandler
        key="right"
        direction={Directions.RIGHT}
        onHandlerStateChange={ev => {
          if (ev.nativeEvent.state === State.END) {
            if (cIndex === 0) {
              return;
            }
            setActiveIndex(cIndex - 1);
          }
        }}>
        <FlatList
          {...props}
          keyExtractor={keyExtractor}
          horizontal
          contentContainerStyle={style.list}
          scrollEnabled={false}
          removeClippedSubviews={false}
          CellRendererComponent={crc => {
            const { index, children } = crc;
            const newStyle = [crc.style, { zIndex: data!.length - index }];
            return (
              <View style={newStyle} index={index} {...crc.props}>
                {children}
              </View>
            );
          }}
          renderItem={g => {
            const { index } = g;
            const inputRange = [index - 1, index, index + 1];
            const translateX = scrollXAnimated.interpolate({
              inputRange,
              outputRange: translateXOutputs,
            });
            const scale = scrollXAnimated.interpolate({
              inputRange,
              outputRange: scaleOutputs,
            });
            const opacity = scrollXAnimated.interpolate({
              inputRange,
              outputRange: opacityOutputs,
            });

            return (
              <Animated.View
                style={[
                  style.item,
                  {
                    left: -itemWidth / 2,
                    opacity,
                    transform: [
                      {
                        translateX: translateX,
                      },
                      { scale },
                    ],
                  },
                ]}>
                {renderItem!(g)}
              </Animated.View>
            );
          }}
        />
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
}
