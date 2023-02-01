import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Ionicons, EvilIcons, FontAwesome } from "@expo/vector-icons";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useWatchlist } from "../../../../Contexts/WatchlistContext";
const CoinDetailHeader = (props) => {
  const { coinId, image, symbol, marketCapRank } = props;
  const navigation = useNavigation();
  const { watchlistCoinIds, storeWatchlistCoinId, removeWatchlistCoinsId } =
    useWatchlist();

  const checkIfCoinIsWatchlisted = () => {
    return watchlistCoinIds.some((coinIdValue) => coinIdValue === coinId);
  };
  const handleWatchlistCoin = () => {
    if (checkIfCoinIsWatchlisted()) {
      return removeWatchlistCoinsId(coinId);
    }
    return storeWatchlistCoinId(coinId);
  };
  return (
    <View style={styles.headerContainer}>
      <Ionicons
        style={({ pressed }) => (pressed ? styles.iconPressed : null)}
        name="chevron-back-sharp"
        size={30}
        color="white"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.tickerContainer}>
        <Image style={{ width: 30, height: 30 }} source={{ uri: image }} />
        <Text style={styles.tickerTitle}> {symbol.toUpperCase()} </Text>
        <View style={styles.rankContianer}>
          <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>
            # {marketCapRank}{" "}
          </Text>
        </View>
      </View>
      <FontAwesome
        name={checkIfCoinIsWatchlisted() ? "star" : "star-o"}
        size={25}
        color={checkIfCoinIsWatchlisted() ? "#FFBF00" : "white"}
        onPress={handleWatchlistCoin}
      />
    </View>
  );
};
export default CoinDetailHeader;
