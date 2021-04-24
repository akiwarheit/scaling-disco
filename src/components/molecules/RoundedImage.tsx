import React from 'react';
import { Image, ImageProps } from 'react-native';
import { Animations } from '../atoms/Animations';

const FadeInAndSlide = ({
  children,
  duration,
}: React.PropsWithChildren<any> & { duration?: number }) => {
  return (
    <Animations.Fade duration={duration}>
      <Animations.Slide>{children}</Animations.Slide>
    </Animations.Fade>
  );
};

export default function RoundedImage(
  props: Partial<ImageProps> & {
    thumbnailUrl: string;
    radius?: number;
    duration?: number;
  },
) {
  const { thumbnailUrl, style, radius, duration } = props;

  return (
    <FadeInAndSlide duration={duration}>
      <Image
        style={[style, { borderRadius: radius }]}
        source={{
          uri: thumbnailUrl,
        }}
      />
    </FadeInAndSlide>
  );
}
