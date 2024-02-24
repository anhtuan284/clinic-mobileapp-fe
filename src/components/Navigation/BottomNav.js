import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { tabs } from "./screenData";
import { style } from "./StyleNavigation";
import TabButton from "./TabButton.js";
const Tab = createBottomTabNavigator();
const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarStyle: style.styleNavigation }}
      initialRouteName="HomeScreen"
    >
      {tabs.map((tab) => (
      <Tab.Screen 
          key={tab.id}
          name={tab.screen}
          component={tab.Component}
          options={{
            tabBarShowLabel: false,
            tabBarButton: (props) => <TabButton item={tab} {...props} />,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomNavigation;