import React, { useEffect, useRef } from 'react';
import { Animated, ViewProps } from 'react-native';

const Slide = (props: ViewProps & any) => {
  const { children, style, offset = -100 } = props;

  const slideAnim = useRef(new Animated.Value(offset)).current;

  useEffect(() => {
    const a = Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
    });
    a.start();
    return () => {
      a.stop();
    };
  }, [slideAnim]);

  return (
    <Animated.View
      style={[
        style,
        {
          transform: [
            {
              translateY: slideAnim.interpolate({
                inputRange: [offset, 0],
                outputRange: [offset, 0],
              }),
            },
          ],
        },
      ]}>
      {children}
    </Animated.View>
  );
};

export const Fade = (props: ViewProps & any) => {
  const { children, style, duration = 3000 } = props;

  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const a = Animated.timing(anim, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    });
    a.start();
    return () => {
      a.stop();
    };
  }, [anim, duration]);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        },
      ]}>
      {children}
    </Animated.View>
  );
};

export const Animations = {
  Slide,
  Fade,
};
