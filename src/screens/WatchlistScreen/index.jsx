import React, { useEffect, useState } from "react";
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
    fetchWatchlistedCoins();
  }, [watchlistCoinIds]);

  return (
    <FlatList
      data={coins}
      renderItem={({ item }) => <CoinItem marketcoin={item} />}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          tintColor="white"
          onRefresh={fetchWatchlistedCoins}
        />
      }
    />
  );
};
export default WatchedlistScreen;
