import React from "react";
import { FlatList } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import PortfolioAssetsList from "./components/PortfolioAssetsList";
import { Suspense } from "react";

const PortfolioScreen = () => {
  return (
    <View>
      <Suspense fallback={<Text style={{ color: "white" }}>Loading</Text>}>
        <PortfolioAssetsList />
      </Suspense>
    </View>
  );
};
export default PortfolioScreen;
