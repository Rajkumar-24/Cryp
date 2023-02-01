import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import Coin from "../../../assets/data/crypto.json";
import styles from "./styles";
import CoinDetailHeader from "./components/CoinDetailHeader";
import { AntDesign } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import { LineChart, LineChartPath } from "react-native-wagmi-charts";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import {
  getDetailedCoinData,
  getCoinMarketChart,
} from "../../services/request";
import { ActivityIndicator } from "react-native";

const CoinDetailsScreen = () => {
  // state
  const [coin, setCoin] = useState(null);
  const [coinMarketData, setCoinMarketData] = useState(null);
  const route = useRoute();
  const {
    params: { coinId },
  } = route;
  const [loading, setLoading] = useState(false);
  const [coinValue, setCoinValue] = useState("0");
  const [usdValue, setUsdValue] = useState("00.00");

  const fetchCoinData = async () => {
    setLoading(true);
    const fetchedCoinData = await getDetailedCoinData(coinId);
    const fetchedCoinMarketData = await getCoinMarketChart(coinId);
    setCoin(fetchedCoinData);
    setCoinMarketData(fetchedCoinMarketData);
    setUsdValue("");
    setLoading(false);
  };
  useEffect(() => {
    fetchCoinData();
  }, []);

  if (loading || !coin || !coinMarketData) {
    return <ActivityIndicator size="large" />;
  }
  const {
    id,
    image: { small },
    name,
    symbol,

    market_data: {
      price_change_percentage_24h,
      market_cap_rank,
      current_price,
    },
  } = coin;
  const { prices } = coinMarketData;
  const percentageColor =
    price_change_percentage_24h < 0 ? "#ea3943" : "#16c784" || "white";

  const chartColor = current_price.inr > prices[0][1] ? "#16c784" : "#ea3943";
  const chartColorGradient =
    current_price.inr > prices[0][1] ? "#16c784" : "#ff2400";
  const screenWidth = Dimensions.get("window").width;

  const formatCurrency = ({ value }) => {
    "worklet";
    if (value === "") {
      if (current_price.inr < 1) {
        return `₹${current_price.inr}`;
      }
      return `₹${current_price.inr.toFixed(2)}`;
    }
    if (current_price.inr < 1) {
      return `₹${parseFloat(value)}`;
    }
    return `₹${parseFloat(value).toFixed(2)}`;
  };
  const changeCoinValue = (value) => {
    setCoinValue(value);
    const floatValue = parseFloat(value) || 0;
    setUsdValue((floatValue * current_price.inr).toString());
  };
  const changeUsdValue = (value) => {
    setUsdValue(value);
    const floatValue = parseFloat(value) || 0;
    setCoinValue((floatValue / current_price.inr).toString());
  };

  return (
    <>
      <View style={{ paddingHorizontal: 10 }}>
        <LineChart.Provider
          data={prices.map(([timestamp, value]) => ({ timestamp, value }))}
        >
          <CoinDetailHeader
            coinId={id}
            image={small}
            symbol={symbol}
            marketCapRank={market_cap_rank}
          />
          <View style={styles.priceContainer}>
            <View>
              <Text style={styles.name}>{name} </Text>
              <LineChart.PriceText
                format={formatCurrency}
                style={styles.currentPrice}
              />
            </View>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: percentageColor,
                  paddingHorizontal: 5,
                  borderRadius: 5,
                  marginTop: 5,
                  alignSelf: "center",
                }}
              >
                <AntDesign
                  name={
                    price_change_percentage_24h > 0 ? "caretup" : "caretdown"
                  }
                  size={12}
                  color={"white"}
                  style={{ alignSelf: "center", marginRight: 5 }}
                />
                <View
                  style={{
                    backgroundColor: percentageColor,
                    padding: 3,
                    borderRadius: 5,
                  }}
                >
                  <Text style={styles.priceChange}>
                    {price_change_percentage_24h?.toFixed(2)}%
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <GestureHandlerRootView>
            {/*  chart  */}
            <LineChart height={screenWidth / 2} width={screenWidth}>
              <LineChart.Path color={chartColor}>
                <LineChart.Gradient color={chartColorGradient} />
              </LineChart.Path>
              <LineChart.CursorCrosshair color={chartColor}>
                <LineChart.Tooltip
                  textStyle={{
                    color: "white",
                    fontSize: 18,
                    padding: 4,
                  }}
                />
              </LineChart.CursorCrosshair>
            </LineChart>
          </GestureHandlerRootView>
          <View style={{ flexDirection: "row" }}>
            {/* bitcoin */}
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                borderRadius: 22,
                borderColor: "white",
                borderWidth: 1,
                paddingLeft: 5,
                marginRight: 5,
                marginTop: 5,
              }}
            >
              <Text
                style={{ color: "white", alignSelf: "center", fontSize: 16 }}
              >
                {symbol.toUpperCase()}
              </Text>

              <TextInput
                style={styles.input}
                value={coinValue}
                keyboardType="numeric"
                onChangeText={changeCoinValue}
              />
            </View>
            {/* ind/  / usd */}
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                borderRadius: 22,
                borderColor: "white",
                borderWidth: 1,
                paddingLeft: 5,
                marginLeft: 5,
                marginTop: 5,
              }}
            >
              <Text
                style={{ color: "white", alignSelf: "center", fontSize: 16 }}
              >
                IND
              </Text>
              <TextInput
                style={styles.input}
                value={usdValue}
                keyboardType="numeric"
                onChangeText={changeUsdValue}
              />
            </View>
          </View>
        </LineChart.Provider>
      </View>
    </>
  );
};
export default CoinDetailsScreen;
