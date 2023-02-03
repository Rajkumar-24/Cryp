import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import Coin from "../../../assets/data/crypto.json";
import styles from "./styles";
import CoinDetailHeader from "./components/CoinDetailHeader";
import { AntDesign } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import {
  LineChart,
  LineChartPath,
  CandlestickChart,
} from "react-native-wagmi-charts";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import {
  getDetailedCoinData,
  getCoinMarketChart,
  getCandelChartData,
} from "../../services/request";
import { ActivityIndicator } from "react-native";
import FilterComponent from "./components/FilterComponent";
import { MaterialIcons } from "@expo/vector-icons";

const filterDaysArray = [
  { filterDay: "1", filterText: "24h" },
  { filterDay: "7", filterText: "7d" },
  { filterDay: "30", filterText: "30d" },
  { filterDay: "365", filterText: "1y" },
  { filterDay: "max", filterText: "All" },
];

const CoinDetailsScreen = () => {
  // state
  const [coin, setCoin] = useState(null);
  const [coinMarketData, setCoinMarketData] = useState(null);
  const [coinCandleChartData, setCoinCandleChartData] = useState(null);
  const route = useRoute();
  const {
    params: { coinId },
  } = route;
  const [loading, setLoading] = useState(false);
  const [coinValue, setCoinValue] = useState("1");
  const [usdValue, setUsdValue] = useState("00.00");
  const [selectedRange, setSelectedRange] = useState("1");
  const [isCandleChartVisible, setIsCandleChartVisible] = useState(false);

  const fetchCoinData = async () => {
    setLoading(true);
    const fetchedCoinData = await getDetailedCoinData(coinId);
    setCoin(fetchedCoinData);
    setUsdValue(fetchedCoinData.market_data.current_price.inr.toString());
    setLoading(false);
  };
  const fetchMarketCoinData = async (selectedRangeValue) => {
    const fetchedCoinMarketData = await getCoinMarketChart(
      coinId,
      selectedRangeValue
    );
    setCoinMarketData(fetchedCoinMarketData);
  };
  const fetchCandelStickChartData = async (selectedRangeValue) => {
    const fetchedSelectedCandleChartData = await getCandelChartData(
      coinId,
      selectedRangeValue
    );
    setCoinCandleChartData(fetchedSelectedCandleChartData);
  };

  useEffect(() => {
    fetchCoinData();
    fetchMarketCoinData(1);
    fetchCandelStickChartData();
  }, []);
  const onSelectedRangeChange = (selectedRangeValue) => {
    setSelectedRange(selectedRangeValue);
    fetchMarketCoinData(selectedRangeValue);
    fetchCandelStickChartData(selectedRangeValue);
  };
  const memoONSelectedRangeChange = React.useCallback(
    (range) => onSelectedRangeChange(range),
    []
  );

  if (loading || !coin || !coinMarketData || !coinCandleChartData) {
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
      <View style={{ paddingHorizontal: 10, flex: 1 }}>
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
                  backgroundColor: percentageColor,
                  paddingHorizontal: 5,
                  borderRadius: 5,
                  marginTop: 5,
                  alignSelf: "center",
                  flexDirection: "row",
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
          <View style={styles.filterContainer}>
            {filterDaysArray.map((day) => (
              <FilterComponent
                filterDay={day.filterDay}
                filterText={day.filterText}
                selectedRange={selectedRange}
                setSelectedRange={memoONSelectedRangeChange}
                key={day.filterText}
              />
            ))}
            {isCandleChartVisible ? (
              <MaterialIcons
                name="show-chart"
                size={24}
                color="#16c784"
                onPress={() => setIsCandleChartVisible(false)}
              />
            ) : (
              <MaterialIcons
                name="waterfall-chart"
                size={24}
                color="#16c784"
                onPress={() => setIsCandleChartVisible(true)}
              />
            )}
          </View>
          <View>
            <GestureHandlerRootView>
              {/*  chart  */}
              {isCandleChartVisible ? (
                <CandlestickChart.Provider
                  data={coinCandleChartData.map(
                    ([timestamp, open, high, low, close]) => ({
                      timestamp,
                      open,
                      high,
                      low,
                      close,
                    })
                  )}
                >
                  <CandlestickChart
                    height={screenWidth / 2}
                    width={screenWidth}
                  >
                    <CandlestickChart.Candles />
                    <CandlestickChart.Crosshair>
                      <CandlestickChart.Tooltip
                        textStyle={{
                          color: "white",
                          fontSize: 18,
                          padding: 4,
                        }}
                      />
                    </CandlestickChart.Crosshair>
                  </CandlestickChart>
                  <View style={styles.candleStickDataContainer}>
                    <View>
                      <Text style={styles.candleStickTExtLabel}>Open</Text>
                      <CandlestickChart.PriceText
                        style={styles.candleStickText}
                        type="open"
                      />
                    </View>
                    <View>
                      <Text style={styles.candleStickTExtLabel}>High</Text>
                      <CandlestickChart.PriceText
                        style={[styles.candleStickText, { color: "#16c784" }]}
                        type="high"
                      />
                    </View>
                    <View>
                      <Text style={styles.candleStickTExtLabel}>Low</Text>
                      <CandlestickChart.PriceText
                        style={[styles.candleStickText, { color: "#ea3943" }]}
                        type="low"
                      />
                    </View>
                    <View>
                      <Text style={styles.candleStickTExtLabel}>Close</Text>
                      <CandlestickChart.PriceText
                        style={styles.candleStickText}
                        type="close"
                      />
                    </View>
                  </View>
                  <View>
                    <Text style={styles.candleStickTExtData}>Date/Time</Text>
                    <CandlestickChart.DatetimeText
                      style={{ color: "white", fontWeight: "700", margin: 10 }}
                    />
                  </View>
                </CandlestickChart.Provider>
              ) : (
                <LineChart
                  style={{ backgroundColor: "#121212" }}
                  height={screenWidth / 2}
                  width={screenWidth}
                >
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
                    <LineChart.Tooltip position="bottom">
                      <LineChart.DatetimeText
                        style={{ color: "white", fontSize: 15, padding: 4 }}
                      />
                    </LineChart.Tooltip>
                  </LineChart.CursorCrosshair>
                </LineChart>
              )}
            </GestureHandlerRootView>
          </View>
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
