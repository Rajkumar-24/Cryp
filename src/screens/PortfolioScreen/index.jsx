import React, { Suspense } from "react";
import { View, Text } from "react-native";
import PortfolioAssetsList from "./components/PortfolioAssetsList";

const PortfolioScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Suspense
        fallback={
          <View
            style={{
              flex: 1,
              alignItems: "center",
              padding: 20,
              marginTop: 50,
              margin: 20,
            }}
          >
            <Text style={{ color: "#696666", fontSize: 25 }}>
              Loading Please Wait!
            </Text>
          </View>
        }
      >
        <PortfolioAssetsList />
      </Suspense>
    </View>
  );
};

export default PortfolioScreen;
