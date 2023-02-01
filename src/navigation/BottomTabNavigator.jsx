import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { Entypo, AntDesign, Foundation } from "@expo/vector-icons";
import WatchedlistScreen from "../screens/WatchlistScreen";
import PortfolioScreen from "../screens/PortfolioScreen";

const Tab = createBottomTabNavigator();
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#C0C0C0",
        tabBarStyle: {
          backgroundColor: "#181818",
        },
      }}
    >
      <Tab.Screen
        name={"Home"}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Entypo name="home" size={focused ? 30 : 25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={"Portfolio"}
        component={PortfolioScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Foundation
              name="graph-pie"
              size={focused ? 35 : 25}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name={"Watchlist"}
        component={WatchedlistScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <AntDesign name="star" size={focused ? 30 : 25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomTabNavigator;
