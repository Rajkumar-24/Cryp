import React from "react";
import { FlatList } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styles from "./styles";
import { Pressable } from "react-native";
import PortfolioAssetItem from "../PortfolioAssetItem/index.";
import { useNavigation } from "@react-navigation/native";
import { useRecoilState, useRecoilValue } from "recoil";
import { allPortfoiloAssets } from "../../../../atoms/PortfoiloAssets";

const PortfolioAssetsList = () => {
  const navigation = useNavigation();
  const assets = useRecoilState(allPortfoiloAssets);
  console.log(assets);
  return (
    <View>
      <FlatList
        data={assets}
        renderItem={({ item }) => <PortfolioAssetItem assetItem={item} />}
        ListHeaderComponent={
          <>
            <View style={styles.balanceContainer}>
              <View>
                <Text style={styles.currentBalance}>Current Balance</Text>
                <Text style={styles.currentBalanceValue}>$20000</Text>
                <Text style={styles.valueChange}>$100</Text>
              </View>
              <View style={styles.priceChangePercentageContainer}>
                <AntDesign
                  name={"caretdown"}
                  size={12}
                  color={"white"}
                  style={{ alignSelf: "center", marginRight: 5 }}
                />
                <Text style={styles.percentageChange}>1.2%</Text>
              </View>
            </View>

            <Text style={styles.assetsLabel}>Your Assets </Text>
          </>
        }
        ListFooterComponent={
          <Pressable
            style={({ pressed }) => [
              styles.butoonContainer,
              pressed ? styles.coinPressed : null,
            ]}
            onPress={() => navigation.navigate("AddNewAssetScreen")}
          >
            <Text style={styles.buttonText}>Add new Assets</Text>
          </Pressable>
        }
      />
    </View>
  );
};
export default PortfolioAssetsList;
