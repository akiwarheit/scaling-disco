import React, { useRef } from 'react';
import { Animated, FlatListProps, Platform, View } from 'react-native';

interface CarouselProps<T> extends FlatListProps<T> {
  itemSize: number;
  spacing: number;
}

export default function Carousel<T>(props: CarouselProps<T>) {
  const scrollX = useRef(new Animated.Value(0)).current;

  const {
    data,
    keyExtractor,
    decelerationRate = Platform.OS === 'ios' ? 0 : 0.98,
    itemSize,
  } = props;
  return (
    <Animated.FlatList<T>
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={keyExtractor}
      horizontal
      bounces={false}
      decelerationRate={decelerationRate}
      renderToHardwareTextureAndroid
      contentContainerStyle={{ alignItems: 'center' }}
      snapToInterval={itemSize}
      snapToAlignment="start"
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false },
      )}
      scrollEventThrottle={16}
      renderItem={g => {
        const { item, index } = g;
        const inputRange = [
          (index - 2) * itemSize,
          (index - 1) * itemSize,
          index * itemSize,
        ];

        const translateY = scrollX.interpolate({
          inputRange,
          outputRange: [100, 50, 100],
          extrapolate: 'clamp',
        });

        return (
          <View style={{ width: itemSize }}>
            <Animated.View
              style={{
                marginHorizontal: SPACING,
                padding: SPACING * 2,
                alignItems: 'center',
                transform: [{ translateY }],
                backgroundColor: 'white',
                borderRadius: 34,
              }}></Animated.View>
          </View>
        );
      }}
    />
  );
}
