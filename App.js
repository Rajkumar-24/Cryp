import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/navigation";
import WatchlistProvider from "./src/Contexts/WatchlistContext";
import { RecoilRoot } from "recoil";

export default function App() {
  return (
    <NavigationContainer
      theme={{
        colors: {
          background: "#f7f5f5",
        },
      }}
    >
      <RecoilRoot>
        <WatchlistProvider>
          <View style={styles.container}>
            <Navigation />
            <StatusBar style="dark" />
          </View>
        </WatchlistProvider>
      </RecoilRoot>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 50,
  },
});
