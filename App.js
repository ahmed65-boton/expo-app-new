import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Home from "./screens/screen1";
import Settings from "./screens/screen2";


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name={
                route.name === "Home"
                  ? "home-outline"
                  : route.name === "Settings"
                  ? "settings-outline"
                  : "help-outline" // fallback for any other route
              }
              size={size}
              color={color}
            />
          ),
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Settings" component={Settings} />
        
      </Tab.Navigator>
    </NavigationContainer>
  );
}
 //{/*: "chatbubble-outline" // for Chat"*/}