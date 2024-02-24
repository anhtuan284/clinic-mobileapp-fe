import { View, Text, Animated, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { style } from "./StyleNavigation";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import { tabs } from "./screenData";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from '@expo/vector-icons';


const TabButton = ({ item, accessibilityState, onPress }) => {
  const animatedValue = {
    translate: useRef(new Animated.Value(0)).current,
    scale: useRef(new Animated.Value(0)).current,
  };
  const { translate, scale } = animatedValue;

  useEffect(() => {
    handleAnimated();
  }, [accessibilityState.selected]);

  const handleAnimated = () => {
    Animated.parallel([
      Animated.timing(translate, {
        toValue: accessibilityState.selected ? 1 : 0,
        duration: 400,
        useNativeDriver: false,
      }),
      Animated.timing(scale, {
        toValue: accessibilityState.selected ? 1 : 0,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const translateStyles = {
    transform: [
      {
        translateY: translate.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -30],
          extrapolate: "clamp",
        }),
      },
    ],
  };

  const scaleStyles = {
    opacity: scale.interpolate({
      inputRange: [0.5, 1],
      outputRange: [0.5, 1],
      extrapolate: "clamp",
    }),
    transform: [
      {
        scale: scale,
      },
    ],
  };

  const isProfileTab = item.id === 4;
  const isBellTab = item.id === 2;

  return (
    <TouchableOpacity style={style.container} onPress={onPress}>
      <Animated.View style={[style.btn, translateStyles]}>
        <Animated.View
          style={[
            {
              width: 50,
              height: 50,
              position: "absolute",
              borderRadius: 16,
              backgroundColor: accessibilityState.selected
                ? "#697689"
                : "#697689",
            },
            scaleStyles,
          ]}
        />
         {isProfileTab ? (
          <AntDesign
            name={item.icon}
            size={24}
            color={accessibilityState.selected ? "#fff" : "#697689"}
          />
        ) : (
          isBellTab ? (
            // Use a different icon for the "bell" tab
            <Fontisto
              name={item.icon}
              color={accessibilityState.selected ? "#fff" : "#697689"}
              size={22}
            />
          ) : (
            <Material
              name={item.icon}
              color={accessibilityState.selected ? "#fff" : "#697689"}
              size={22}
            />
          )
        )}
      </Animated.View>
      <Animated.Text style={[style.title, { opacity: scale }]}>
        {item.title}
      </Animated.Text>
    </TouchableOpacity>
  );
};

export default TabButton;