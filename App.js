import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { StatusBar } from 'expo-status-bar';
import React, { useReducer, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import Login from "./src/components/User/Login";
import Register from "./src/components/User/Register";
import Home from "./src/components/Home/Home";
import MyUserReducer from "./src/reducers/MyUserReducer";
import MyContext from "./src/configs/MyContext";
import Logout from "./src/components/User/Logout";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoadingPage from "./src/components/LoadingPage/LoadingPage";
import ButtonSet from "./src/components/Inputs/ButtonSet";
import WelcomScreen from './src/screens/WelcomeScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from "./src/screens/ProfileScreen";
import ScheduledScreen from "./src/screens/ScheduledScreen";
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { SHADOWS } from "./src/constants";
import ServiceScreen from "./src/screens/ServiceScreen";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel:false,
  headerShown:true,
  tabBarStyle:{
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 80,
    background: "#fff",
    paddingTop: 10,

  }
}

const AuthStack = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator  
        screenOptions={{ headerShown: false }}
        initialRouteName="Home"
      >
        <Stack.Screen name="Welcome" component={WelcomScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer >
  );
};

const AppNav = () => {
  return (
    <NavigationContainer >
      <Tab.Navigator screenOptions={screenOptions}>
          <Tab.Screen 
          name="Home" 
          component={Home} 
          options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center", gap: 7}}> 
                  <Entypo name="home" size={24} color={focused ? "#16247d": "#838487"} />
                  <Text style={{fonSize: 12, color: "#838487"}}>Home</Text>
                </View>
              )
            }
          }}
          />
          <Tab.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center", gap: 7}}> 
                <Entypo name="heart" size={24} color={focused ? "#16247d": "#838487"} />
                  <Text style={{fonSize: 12, color: "#838487"}}>Doctors</Text>
            </View>
              )
            }
          }}
          />
          <Tab.Screen 
          name="Scheduled" 
          component={ScheduledScreen} 
          options={{
            tabBarIcon: ({focused})=>{
              return (
                <View
                style={[{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#16247d",
                  width: Platform.OS == "ios" ? 70 : 60,
                  height: Platform.OS == "ios" ? 60 : 60,
                  top: Platform.OS == "ios" ? -20 : -20,
                  borderRadius: Platform.OS == "ios" ? 25 : 30
                }, SHADOWS.medium]}
                >
                  <FontAwesome name="calendar" size={24} color="#fff" />
                </View>
              )
            }
          }}
          />
          <Tab.Screen
          name="Prices" 
          component={ServiceScreen}
          options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center", gap: 7}}> 
                    <MaterialIcons name="stacked-line-chart" size={24} color={focused ? "#16247d": "#838487"} />
                    <Text style={{fonSize: 12, color: "#16247d"}}>Prices</Text>
                </View>
              )
            }
          }}
          />
          <Tab.Screen 
          name="Setting" 
          component={ProfileScreen} 
          options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center", gap: 7}}>                   
                <Ionicons name="settings" size={24}  color={focused ? "#16247d": "#838487"} />

                {/* <Image
                  source={{
                    uri:
                      user?.avatar_user === null
                        ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU"
                        : user?.avatar_user,
                  }}
                  style={{width: 10,height: 10}}
                /> */}
                  <Text style={{fonSize: 12, color: "#16247d"}}>Profile</Text>
                </View>
              )
            }
          }}
          />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
export default function App() {
  const [user, dispatch] = useReducer(MyUserReducer, null);

  return (
    
    <MyContext.Provider value={[user, dispatch]}>
        {user===null? <AuthStack /> : <AppNav/>}
        {/* <Drawer.Navigator screenOptions={{headerRight: Logout}}>
          <Drawer.Screen name="Home" component={Home} options={{title: 'Home Page'}} />
          {user===null?<>
            <Drawer.Screen name="Login" component={Login} />
            <Drawer.Screen name="Register" component={Register} />
            <Drawer.Screen name="LoadingPage" component={LoadingPage} />
          </>:<>
            <Drawer.Screen name={user.username} component={Home} />
          </>}
        </Drawer.Navigator> */}
    </MyContext.Provider>
  );
}
