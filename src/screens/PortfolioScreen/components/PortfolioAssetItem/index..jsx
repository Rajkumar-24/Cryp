import React from "react";
import { Image } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";

const PortfolioAssetItem = () => {
  return (
    <View style={styles.coincontainer}>
      <Image
        source={require("../../../../../assets/icon.png")}
        style={{ height: 30, width: 30 }}
      />
      <View>
        <Text style={styles.title}>bit</Text>
        <Text style={styles.ticker}>BTC</Text>
      </View>
      <View style={{ marginLeft: "auto" }}>
        <Text style={styles.title}>4000</Text>
        <View style={{ flexDirection: "row" }}>
          <AntDesign
            name={"caretup"}
            size={12}
            color={"#16c784"}
            style={{ alignSelf: "center", marginRight: 5 }}
          />
          <Text style={{ color: "#16c784", fontWeight: "700" }}>1.2%</Text>
        </View>
      </View>
      <View style={styles.QauntContainer}>
        <Text style={styles.title}>$8000</Text>
        <Text style={styles.ticker}>2 BTC</Text>
      </View>
    </View>
  );
};
export default PortfolioAssetItem;
