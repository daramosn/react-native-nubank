import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

type SkeletonItemProps = {
  style?: StyleProp<ViewStyle>;
};

export const SkeletonItem = ({style}: SkeletonItemProps) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!containerWidth) {
      return;
    }

    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [containerWidth, shimmerAnim]);

  const shimmerTranslate = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-containerWidth * 2, containerWidth * 2],
  });

  return (
    <View
      style={[styles.container, styles.default, style]}
      onLayout={event => {
        const measuredWidth = event.nativeEvent.layout.width;
        setContainerWidth(measuredWidth);
      }}>
      {containerWidth > 0 && (
        <Animated.View
          style={[
            styles.shimmer,
            styles.default,
            {
              transform: [{translateX: shimmerTranslate}],
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  default: {height: '100%'},
  container: {
    backgroundColor: '#e0e0e0',
    overflow: 'hidden',
    position: 'relative',
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    experimental_backgroundImage:
      'linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.4) 50%, transparent 80%)',
  },
});
