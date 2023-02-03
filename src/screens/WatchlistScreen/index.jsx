import React, { Suspense, useEffect, useState } from "react";
import { Text, View, FlatList, RefreshControl } from "react-native";
import { useWatchlist } from "../../Contexts/WatchlistContext";
import CoinItem from "../../components/CoinItem";
import { getWatchlistedCoins } from "../../services/request";
const WatchedlistScreen = () => {
  const { watchlistCoinIds } = useWatchlist();

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const transformCoinsIds = () => watchlistCoinIds.join("%2C");

  const fetchWatchlistedCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const watchlistedCoinsData =
      (await getWatchlistedCoins(1, transformCoinsIds())) || [];

    setCoins(watchlistedCoinsData);
    setLoading(false);
  };
  useEffect(() => {
    if (watchlistCoinIds.length > 0) {
      fetchWatchlistedCoins();
    }
  }, [watchlistCoinIds]);
  if (watchlistCoinIds.length === 0) {
    return (
      <View style={{ flex: 1, alignSelf: "center", justifyContent: "center" }}>
        <Text style={{ color: "grey", fontSize: 35 }}>Watchedlist Empty!!</Text>
      </View>
    );
  }

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
            <Text style={{ color: "#ffffff", fontSize: 25 }}>
              Loading Please Wait!
            </Text>
          </View>
        }
      >
        <FlatList
          data={coins}
          renderItem={({ item }) => <CoinItem marketcoin={item} />}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              tintColor="white"
              onRefresh={
                watchlistCoinIds.length > 0 ? fetchWatchlistedCoins : null
              }
            />
          }
        />
      </Suspense>
    </View>
  );
};
export default WatchedlistScreen;
