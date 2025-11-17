import { StyleSheet, Animated, Easing } from 'react-native';
import React, { useEffect, useRef } from 'react';

export function HelloWave() {
  const spinValue = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    spinValue.setValue(0);
    Animated.loop( 
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  useEffect(() => {
    startAnimation();
  }, []);

  const rotateData = spinValue.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: ['0deg', '-15deg', '0deg', '15deg', '0deg'],
  });

  return (
    <Animated.Text style={[styles.text, { transform: [{ rotate: rotateData }] }]}>
      👋
    </Animated.Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6,
  },
});