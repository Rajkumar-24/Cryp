import { atom, selector } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getWatchlistedCoins } from "../services/request";

export const allPortfolioBoughtAssets = selector({
  key: "allPortfolioBoughtAssets",
  get: async () => {
    const jsonValue = await AsyncStorage.getItem("@portfolio_coins");
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  },
});

export const allPortfolioBoughtAssetsFromAPI = selector({
  key: "allPortfolioBoughtAssetsFromAPI",
  get: async ({ get }) => {
    const boughtPortfolioAssets = get(allPortfolioBoughtAssetsInStorage);
    const portfolioAssetsMarketData = await getWatchlistedCoins(
      1,
      boughtPortfolioAssets
        .map((portfolioAssets) => portfolioAssets.id)
        .join(",")
    );

    const boughtAssets = boughtPortfolioAssets.map((boughtAssets) => {
      const portfolioAsset = portfolioAssetsMarketData.filter(
        (item) => boughtAssets.id === item.id
      )[0];
      return {
        ...boughtAssets,
        currentPrice: portfolioAsset.current_price,
        priceChangePercentage: portfolioAsset.price_change_percentage_24,
      };
    });
    return boughtAssets.sort(
      (item1, item2) =>
        item1.quantityBought * item1.currentPrice <
        item2.quantityBought * item2.currentPrice
    );
  },
});
export const allPortfoiloAssets = atom({
  key: "allPortfolioAssets",
  default: allPortfolioBoughtAssetsFromAPI,
});

export const allPortfolioBoughtAssetsInStorage = atom({
  key: "allPortfolioBoughtAssetsInStorage",
  default: allPortfolioBoughtAssets,
});
