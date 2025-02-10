import { lightTheme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
import { Animated } from "react-native";

const RotateArrow = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const startRotation = () => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  };

  // Stop the rotation animation
  const stopRotation = () => {
    rotateAnim.setValue(0);
    Animated.timing(rotateAnim, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }).stop();
  };

  const rotateInterpolation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      style={{
        transform: [{ rotate: rotateInterpolation }],
      }}
    >
      <Ionicons name="arrow-down" size={24} color={lightTheme.primary} />
    </Animated.View>
  );
};

export default RotateArrow;
