import React from "react";
import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
const CoinItem = ({ marketcoin }) => {
  const {
    id,
    name,
    current_price,
    market_cap_rank,
    market_cap,
    price_change_percentage_24h,
    symbol,
    image,
  } = marketcoin;
  const navigation = useNavigation();

  const percentageColor =
    price_change_percentage_24h < 0 ? "#ea3943" : "#16c784" || "white";

  const normalizeMarketCap = (marketCap) => {
    if (marketCap > 1e12) {
      return `${Math.floor(marketCap / 1e12)} T `;
    }
    if (marketCap > 1e9) {
      return `${Math.floor(marketCap / 1e9)} B `;
    }
    if (marketCap > 1e6) {
      return `${Math.floor(marketCap / 1e6)} M `;
    }
    if (marketCap > 1e3) {
      return `${Math.floor(marketCap / 1e3)} K `;
    }
    return marketCap;
  };
  return (
    <Pressable
      style={({ pressed }) => [
        styles.coinContainer,
        pressed ? styles.coinPressed : null,
      ]}
      onPress={() => navigation.navigate("CoinDetailsScreen", { coinId: id })}
    >
      <Image
        source={{ uri: image }}
        style={{
          height: 30,
          width: 30,
          marginRight: 10,
          alignSelf: "center",
        }}
      />
      <View>
        <Text style={styles.titile}>{name} </Text>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.rankContainer}>
            <Text style={styles.rank}>{market_cap_rank}</Text>
          </View>
          <Text style={styles.text}>{symbol.toUpperCase()}</Text>
          <AntDesign
            name={price_change_percentage_24h > 0 ? "caretup" : "caretdown"}
            size={12}
            color={percentageColor}
            style={{ alignSelf: "center", marginRight: 5 }}
          />
          <Text style={{ color: percentageColor }}>
            {price_change_percentage_24h?.toFixed(2)}%{" "}
          </Text>
        </View>
      </View>
      <View style={{ marginLeft: "auto", alignItems: "flex-end" }}>
        <Text style={styles.titile}>{current_price}</Text>
        <Text style={{ color: "white" }}>
          MCap {normalizeMarketCap(market_cap)}
        </Text>
      </View>
    </Pressable>
  );
};
export default CoinItem;